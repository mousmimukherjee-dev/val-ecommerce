import { NextRequest, NextResponse } from "next/server";
import { productsData } from "@/data/data";

const MODEL = "gemini-3.5-flash-lite";
const MAX_ATTEMPTS = 2;

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const cleanTextPreference = (value: unknown): string | null => {
  if (typeof value !== "string") return null;

  const cleanedValue = value.trim();

  if (!cleanedValue || cleanedValue.length > 60) return null;

  return cleanedValue;
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Please provide a conversation." },
        { status: 400 },
      );
    }

    const validMessages = messages
      .slice(-12)
      .filter(
        (message) =>
          ["user", "assistant"].includes(message.role) &&
          typeof message.content === "string" &&
          message.content.trim().length > 0 &&
          message.content.length <= 1000,
      );

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages were provided." },
        { status: 400 },
      );
    }

    const catalogue = productsData.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      materials: product.materials ?? [],
    }));

    const allowedCategories = [
      ...new Set(productsData.map((product) => product.category)),
    ];

    const allowedMaterials = [
      ...new Set(productsData.flatMap((product) => product.materials ?? [])),
    ];

    const systemInstruction = `
You are VAL's friendly AI shopping assistant.

Your job is to understand the customer's shopping preferences
and help them discover products from the VAL catalogue.

PRODUCT CATALOGUE:
${JSON.stringify(catalogue)}

AVAILABLE CATEGORIES:
${JSON.stringify(allowedCategories)}

VERIFIED MATERIALS:
${JSON.stringify(allowedMaterials)}

PREFERENCE EXTRACTION RULES:

1. Extract the customer's maximum budget in SEK.
2. Extract the category only when the customer specifies one.
3. Extract materials only when the customer requests them.
4. Extract style and occasion only when the customer mentions them.
5. Use null when a preference has not been provided.
6. Use an empty array when no materials have been requested.
7. Do not invent or assume customer preferences.
8. Understand the full conversation, including earlier messages.
9. Preserve earlier preferences unless the customer changes them.
10. If the customer changes a preference, use the latest instruction.
11. All budget values must be numbers in SEK.
12. Category must match one of the available categories exactly.
13. Materials must match the verified materials exactly.
14. Style and occasion are customer preferences, not verified product attributes.

PRODUCT RECOMMENDATION RULES:

1. Recommend only products that exist in the catalogue.
2. Never invent product names, prices, descriptions or availability.
3. Never claim a product has features not stated in its description.
4. Be concise, helpful and natural.
5. Return an empty productIds array when no product recommendation is appropriate.

RESPONSE FORMAT:

Return valid JSON only, using this exact structure:

{
  "reply": "Your conversational response",
  "preferences": {
    "budget": null,
    "category": null,
    "materials": [],
    "style": null,
    "occasion": null
  },
  "productIds": []
}

productIds must contain only real product IDs from the catalogue.
`;

    const requestBody = {
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: validMessages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 600,
      },
    };

    let geminiResponse: Response | null = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(12000),
          },
        );

        if (geminiResponse.ok) {
          break;
        }

        const shouldRetry = [429, 500, 502, 503, 504].includes(
          geminiResponse.status,
        );

        if (!shouldRetry || attempt === MAX_ATTEMPTS) {
          const errorDetails = await geminiResponse.text();
          console.error("Gemini API error:", errorDetails);

          return NextResponse.json(
            {
              error:
                geminiResponse.status === 503 || geminiResponse.status === 429
                  ? "VAL Assistant is temporarily busy. Please try again shortly."
                  : "Gemini could not process your request. Please try again.",
            },
            { status: 502 },
          );
        }

        await wait(attempt * 1500);
      } catch (error) {
        if (attempt === MAX_ATTEMPTS) {
          console.error("Gemini connection error:", error);

          return NextResponse.json(
            {
              error:
                "VAL Assistant is temporarily unavailable. Please try again.",
            },
            { status: 502 },
          );
        }

        await wait(attempt * 1500);
      }
    }

    if (!geminiResponse?.ok) {
      return NextResponse.json(
        { error: "VAL Assistant is temporarily unavailable." },
        { status: 502 },
      );
    }

    const data = await geminiResponse.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json(
        { error: "Gemini returned an empty response." },
        { status: 502 },
      );
    }

    let parsedResponse: Record<string, unknown>;

    try {
      const parsed: unknown = JSON.parse(responseText);

      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("Invalid response structure.");
      }

      parsedResponse = parsed as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: "VAL Assistant returned an invalid response." },
        { status: 502 },
      );
    }

    const rawPreferences =
      typeof parsedResponse.preferences === "object" &&
      parsedResponse.preferences !== null
        ? (parsedResponse.preferences as Record<string, unknown>)
        : {};

    const budget =
      typeof rawPreferences.budget === "number" &&
      Number.isFinite(rawPreferences.budget) &&
      rawPreferences.budget >= 0
        ? rawPreferences.budget
        : null;

    const requestedCategory = cleanTextPreference(rawPreferences.category);

    const category = allowedCategories.includes(requestedCategory ?? "")
      ? requestedCategory
      : null;

    const materials = Array.isArray(rawPreferences.materials)
      ? rawPreferences.materials
          .filter(
            (material): material is string =>
              typeof material === "string" &&
              allowedMaterials.some(
                (allowed) => allowed.toLowerCase() === material.toLowerCase(),
              ),
          )
          .map(
            (material) =>
              allowedMaterials.find(
                (allowed) => allowed.toLowerCase() === material.toLowerCase(),
              )!,
          )
      : [];

    const preferences = {
      budget,
      category,
      materials: [...new Set(materials)],
      style: cleanTextPreference(rawPreferences.style),
      occasion: cleanTextPreference(rawPreferences.occasion),
    };

    const validProductIds = productsData
      .filter(
        (product) =>
          Array.isArray(parsedResponse.productIds) &&
          parsedResponse.productIds.includes(product.id),
      )
      .map((product) => product.id);

    return NextResponse.json({
      reply:
        typeof parsedResponse.reply === "string"
          ? parsedResponse.reply
          : "I can help you find something from the VAL collection.",
      preferences,
      productIds: validProductIds,
    });
  } catch (error) {
    console.error("Shopping assistant error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
