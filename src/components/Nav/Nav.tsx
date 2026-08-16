"use client";
import { productsData } from "@/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  if (pathname === "/cartpage") {
    return null;
  }

  const categories = [
    "All",
    ...new Set(productsData.map((product) => product.category)),
  ];
  return (
    <div data-testid="navbar" className="flex font-body justify-between p-6 border-b border-gray-light text-gray-dark">
      <div className="">
        <ul className="flex justify-start">
          {categories.map((category) => {
            const href =
              category === "All" ? "/products" : `/products/${category}`;
            return (
              <li key={category} className="px-4">
                <Link href={href}>{category}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center ">
        <p className="px-3">Sort:</p>
        <p className="px-3">Price Low</p>
        <p className="px-3">Price High</p>
      </div>
    </div>
  );
};

export default Nav;
