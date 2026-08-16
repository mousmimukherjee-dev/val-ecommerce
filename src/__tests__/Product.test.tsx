import { Header } from "@/components/Header/Header";
import Product from "@/components/Product/Product";
import CartContextProvider from "@/context/CartContextProvider";
import { productsData } from "@/data/data";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";

describe("should render individual product information", () => {
  test("product image should render", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Product params={Promise.resolve({ id: "1", category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const productImage = screen.getByRole("img", { name: /product-img/i });

    expect(productImage).toHaveAttribute(
      "src",
      expect.stringContaining("linen-shirt.jpg"),
    );
  });

  test("Add to Bag button should render", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Product params={Promise.resolve({ id: "1", category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const button = screen.getByRole("button", { name: /Add to Bag/i });

    expect(button).toBeInTheDocument();
  });

  test("if click Add to Bag button bag quantity should increase", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Header />
          <Product params={Promise.resolve({ id: "1", category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const button = screen.getByRole("button", { name: /Add to Bag/i });
    fireEvent.click(button);
    const bagCount = screen.getByTestId("bag-count");

    expect(bagCount).toHaveTextContent("1");
  });

  test("should render product category , name , price , description", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Product params={Promise.resolve({ id: "1", category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const category = screen.getByTestId("product-category");
    const name = screen.getByTestId("product-name");
    const price = screen.getByTestId("product-price");
    const description = screen.getByTestId("product-description");

    expect(category).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
