import Cart from "@/components/Cart/Cart";
import Category from "@/components/Category/Category";
import Product from "@/components/Product/Product";
import CartContextProvider from "@/context/CartContextProvider";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";

describe("if click on any category product should appear category wise", () => {
  test("if click on Women category , women category related product should appear", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    expect(screen.getByText("Oversized Linen Shirt")).toBeInTheDocument();
  });

  test("if click on Men category , Men category related product should appear", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Men" })} />
        </CartContextProvider>,
      ),
    );

    expect(screen.getByText("Trench Coat")).toBeInTheDocument();
  });

  test("if click on Kids category , Kids category related product should appear", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Kids" })} />
        </CartContextProvider>,
      ),
    );

    expect(screen.getByText("Striped Cotton Tee")).toBeInTheDocument();
  });

  test("Add to Bag button exist in the dom for each product", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const button = screen.getAllByRole("button", { name: /Add to Bag/i })[0];

    expect(button).toBeInTheDocument();
  });

  test("if click Add to Bag button bag quantity should be increased", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Women" })} />
          <Cart />
        </CartContextProvider>,
      ),
    );

    const button = screen.getAllByRole("button", { name: /Add to Bag/i })[0];
    

    fireEvent.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

 
  test("if click on any product it should go to productpage ", async () => {
    await act(async () =>
      render(
        <CartContextProvider>
          <Category params={Promise.resolve({ category: "Women" })} />
        </CartContextProvider>,
      ),
    );

    const link = screen.getAllByRole("link")[0];

    expect(link).toHaveAttribute("href", "/productpage/1/Women");
  });
});
