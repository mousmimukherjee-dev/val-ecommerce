import Cart from "@/components/Cart/Cart";
import { Header } from "@/components/Header/Header";
import ProductsPage from "@/components/ProducstPage/ProductsPage";
import CartContextProvider from "@/context/CartContextProvider";
import { fireEvent, render, screen } from "@testing-library/react";

describe("should render header", () => {
  test("should render heading", () => {
    render(
      <CartContextProvider>
        <Header />
      </CartContextProvider>,
    );

    const headerText = screen.getByText("VAL");

    expect(headerText).toBeInTheDocument();
  });

  test("bag quantity should increase when click add to bag", () => {
    render(
      <CartContextProvider>
        <Header />
        <ProductsPage />
      </CartContextProvider>,
    );

    const button = screen.getAllByText("Add to bag")[0];

    fireEvent.click(button);

    const bagCount = screen.getByTestId("bag-count");

    expect(bagCount).toHaveTextContent("1");
  });

  test("should render homepage and cartpage link", () => {
    render(
      <CartContextProvider>
        <Header />
        <Cart />
      </CartContextProvider>,
    );

    const headingTextLink = screen.getByText("VAL");
    const bagLink = screen.getByText("Bag");

    expect(headingTextLink).toBeInTheDocument();
    expect(headingTextLink).toHaveAttribute("href", "/");
    expect(bagLink).toBeInTheDocument();
    expect(bagLink).toHaveAttribute("href", "/cartpage");
  });
});
