import Cart from "@/components/Cart/Cart";
import Nav from "@/components/Nav/Nav";
import ProductsPage from "@/components/ProducstPage/ProductsPage";
import Product from "@/components/Product/Product";
import CartContextProvider from "@/context/CartContextProvider";
import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: () => "/cartpage",
}));
describe("should render cart", () => {
  test("should hide navbar in cartpage", () => {
    render(
      <CartContextProvider>
        <Cart />
        <Nav />
      </CartContextProvider>,
    );

    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
  });

  test("if click remove button quantity should reduced", () => {
    render(
      <CartContextProvider>
        <Cart />
        <Nav />
        <ProductsPage />
      </CartContextProvider>,
    );

    const addButton = screen.getAllByRole("button", { name: /Add to Bag/i })[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const productQuantity = screen.getByTestId("product-quantity");
    expect(productQuantity).toHaveTextContent("2");

    const button = screen.getAllByRole("button", { name: /Remove/i })[0];

    fireEvent.click(button);

    expect(productQuantity).toHaveTextContent("1");
  });

  test("Removing a product decreases its quantity, and removes it entirely once quantity reaches zero, with the order summary updating accordingly and appear text YOUR BASKET IS EMPTY", () => {
    render(
      <CartContextProvider>
        <Cart />
        <Nav />
        <ProductsPage />
      </CartContextProvider>,
    );

    const addButton = screen.getAllByRole("button", { name: /Add to Bag/i })[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const productQuantity = screen.getByTestId("product-quantity");
    expect(productQuantity).toHaveTextContent("2");

    const button = screen.getAllByRole("button", { name: /Remove/i })[0];

    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.queryAllByTestId("product-cart")[0]).not.toBeInTheDocument;
  });

  test("Removing a product decreases its quantity, and removes it entirely once quantity reaches zero, with the order summary updating accordingly and appear text YOUR BASKET IS EMPTY", () => {
    render(
      <CartContextProvider>
        <Cart />
        <Nav />
        <ProductsPage />
      </CartContextProvider>,
    );

    const addButton = screen.getAllByRole("button", { name: /Add to Bag/i })[0];
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const productQuantity = screen.getByTestId("product-quantity");
    expect(productQuantity).toHaveTextContent("2");

    const button = screen.getAllByRole("button", { name: /Remove/i })[0];

    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.queryAllByTestId("product-cart")[0]).not.toBeInTheDocument;
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });
});
