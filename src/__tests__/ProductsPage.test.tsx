import Cart from "@/components/Cart/Cart";
import ProductsPage from "@/components/ProducstPage/ProductsPage";
import CartContextProvider from "@/context/CartContextProvider";
import { fireEvent, render, screen } from "@testing-library/react";

describe("should render all product categrory", () => {
  test("should render products image", () => {
    render(
      <CartContextProvider>
        <ProductsPage />
      </CartContextProvider>,
    );

    const image = screen.getAllByRole("img")[0];

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("linen-shirt.jpg"),
    );
  });

  test("if hover on any product Add to Bag button should appear", () => {
    render(
      <CartContextProvider>
        <ProductsPage />
      </CartContextProvider>,
    );

    const productCard = screen.getAllByRole("link")[0];
    fireEvent.mouseEnter(productCard);

    const button = screen.getAllByRole("button")[0];

    expect(button).toBeInTheDocument();
  });

  test("should update cart if i click add to cart button", () => {
    render(
      <CartContextProvider>
        <ProductsPage />
        <Cart />
      </CartContextProvider>,
    );

    const button = screen.getAllByRole("button", { name: /Add to Bag/i })[0];

    fireEvent.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("should render product name and price", () => {
    render(
      <CartContextProvider>
        <ProductsPage />
      </CartContextProvider>,
    );

    const productName = screen.getAllByTestId("product-name")[0];
    const productPrice = screen.getAllByTestId("product-price")[0];

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  test("if click on any product it should go to product page", () => {
    render(
      <CartContextProvider>
        <ProductsPage />
        <Cart />
      </CartContextProvider>,
    );

    const link = screen.getAllByRole("link")[0];

    expect(link).toHaveAttribute("href", "/productpage/1/Women");
  });
});
