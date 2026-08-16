import Nav from "@/components/Nav/Nav";
import { productsData } from "@/data/data";
import { ProductProps } from "@/types/types";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: () => "/product",
}));

describe("should render navbar", () => {
  test("should render ALL category correctly", () => {
    render(<Nav />);

    const allCategory = screen.getByRole("link", { name: /All/i });

    expect(allCategory).toBeInTheDocument();
  });

  test("should render correct number of links", () => {
    render(<Nav />);

    const categoryQuantity = new Set(productsData.map((item) => item.category));
    const expectedQuantity = categoryQuantity.size + 1;

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(expectedQuantity);
  });
});
