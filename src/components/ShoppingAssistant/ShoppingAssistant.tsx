
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Send,
  Trash2,
  ShoppingBag,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import { productsData } from "@/data/data";
import { useCart } from "@/context/CartContext";
import type { ProductProps } from "@/types/types";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  productIds?: number[];
}

const STORAGE_KEY = "val-shopping-assistant-messages";

export default function ShoppingAssistant() {
  const { setCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Restore previous chat after the component mounts.
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);

      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setIsLoaded(true);
  }, []);

  // Save conversation in the browser.
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  // Keep the latest message visible.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  // Clear notification timer when component unmounts.
  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  // Display a temporary notification.
  const showNotification = (text: string) => {
    setNotification(text);

    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    notificationTimerRef.current = setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/shopping-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        productIds: Array.isArray(data.productIds) ? data.productIds : [],
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Add one product to the existing cart.
  const addToBag = (product: ProductProps) => {
    setCart((previous) => {
      const existingProduct = previous.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    showNotification("Product has been added to your bag.");
  };

  // Remove only this recommendation card and remove its product from the cart.
  const removeProductCard = (messageId: string, productId: number) => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === messageId
          ? {
              ...message,
              productIds: message.productIds?.filter(
                (id) => id !== productId,
              ),
            }
          : message,
      ),
    );

    setCart((previous) =>
      previous.filter((item) => item.id !== productId),
    );

    showNotification("Product removed from your bag and chat.");
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* Floating assistant button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-black px-5 py-4 text-white shadow-xl transition hover:bg-gray-800"
          aria-label="Open VAL Stylist"
        >
          <MessageCircle size={20} />
          <span className="font-body text-sm tracking-wide">
            Ask VAL Stylist
          </span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <section className="fixed bottom-5 right-5 z-50 flex h-[min(680px,calc(100vh-40px))] w-[min(400px,calc(100vw-40px))] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-black px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Sparkles size={18} />
              </div>

              <div>
                <h2 className="font-heading text-xl">VAL Stylist</h2>
                <p className="font-body text-xs text-gray-300">
                  Your personal shopping assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="text-gray-300 transition hover:text-white"
              >
                <Trash2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="text-gray-300 transition hover:text-white"
              >
                <X size={21} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto bg-[#fafafa] px-4 py-5">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="max-w-[90%] rounded-xl bg-white p-4 shadow-sm">
                  <p className="font-heading text-lg">
                    Hello, I&apos;m your stylist.
                  </p>

                  <p className="mt-2 font-body text-sm leading-relaxed text-gray-600">
                    Ask me for product recommendations, help finding
                    something within your budget, or assistance with
                    your shopping bag. I&apos;ll help you discover pieces
                    from the VAL collection.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="px-1 font-body text-xs text-gray-500">
                    Try asking:
                  </p>

                  {[
                    "Show me something under 50 SEK",
                    "I need a relaxed outfit",
                    "What do you have for home?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="block rounded-full border border-gray-200 bg-white px-4 py-2 text-left font-body text-xs text-gray-700 transition hover:border-black"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const recommendedProducts = productsData.filter((product) =>
                message.productIds?.includes(product.id),
              );

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] space-y-3 ${
                      message.role === "user"
                        ? "rounded-xl bg-black px-4 py-3 text-white"
                        : "w-full"
                    }`}
                  >
                    <div
                      className={`rounded-xl px-4 py-3 font-body text-sm leading-relaxed ${
                        message.role === "assistant"
                          ? "bg-white text-gray-800 shadow-sm"
                          : ""
                      }`}
                    >
                      {message.content}
                    </div>

                    {recommendedProducts.map((product) => (
                      <div
                        key={`${message.id}-${product.id}`}
                        className="relative flex gap-3 rounded-xl border border-gray-200 bg-white p-3"
                      >
                        {/* Remove individual product card */}
                        <button
                          type="button"
                          onClick={() =>
                            removeProductCard(message.id, product.id)
                          }
                          title="Remove product"
                          aria-label={`Remove ${product.name} from chat and cart`}
                          className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-black hover:text-white"
                        >
                          <X size={13} />
                        </button>

                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between pr-5">
                          <div>
                            <p className="font-heading text-base">
                              {product.name}
                            </p>

                            <p className="mt-1 font-body text-xs text-gray-500">
                              {product.category}
                            </p>

                            <p className="mt-1 font-body text-sm font-medium">
                              {product.price} SEK
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => addToBag(product)}
                            className="mt-2 flex items-center gap-2 self-start font-body text-xs font-medium uppercase tracking-wide transition hover:text-gray-500"
                          >
                            <ShoppingBag size={14} />
                            Add to bag
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-white px-4 py-3 font-body text-sm text-gray-500 shadow-sm">
                  VAL Stylist is thinking...
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 font-body text-xs text-red-700">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-gray-200 bg-white p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask your stylist..."
              maxLength={1000}
              disabled={isLoading}
              className="min-w-0 flex-1 rounded-full border border-gray-200 px-4 py-3 font-body text-sm outline-none transition placeholder:text-gray-400 focus:border-black disabled:bg-gray-100"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      {/* Add to bag / remove notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 right-6 z-[60] flex max-w-[calc(100vw-48px)] items-center gap-2 rounded-lg bg-black px-4 py-3 text-white shadow-xl"
        >
          <CheckCircle size={17} className="shrink-0" />
          <span className="font-body text-sm">{notification}</span>
        </div>
      )}
    </>
  );
}
