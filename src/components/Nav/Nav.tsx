"use client";
import Link from "next/link";
import { usePathname, useRouter} from "next/navigation";
import { useState } from "react";
import { useApiCall } from "@/context/ApiCallContext";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { products } = useApiCall();
  const [activeCategory, setActiveCategory] = useState("");
  

  const handleLowPrice = () => {
    router.push("/products?sort=low");
  };

  const handleHighPrice = () => {
    router.push("/products?sort=high");
  };

  if (pathname === "/cartpage") {
    return null;
  }

  if (pathname === "/") {
    return null;
  }

  if (pathname === "/signin") {
    return null;
  }

  const handelActiveCategory = (category: string) => {
    setActiveCategory(category);
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  return (
    <div
      data-testid="navbar"
      className="flex font-body justify-between p-6 border-b border-gray-light text-gray-dark"
    >
      <div className="">
        <ul className="flex justify-start items-center">
          {categories.map((category) => {
            const href =
              category === "All" ? "/products" : `/products/${category}`;
            return (
              <li key={category} className="px-4">
                <Link
                  href={href}
                  onClick={() => handelActiveCategory(category)}
                  className={
                    activeCategory === category
                      ? "capitalize border-b-2 pb-6.5 border-b-black "
                      : "capitalize"
                  }
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="md:flex items-center hidden ">
        <p className="px-3">Sort:</p>
        <p className="px-3 cursor-pointer" onClick={handleLowPrice}>
          Price Low
        </p>
        <p className="px-3 cursor-pointer" onClick={handleHighPrice}>
          Price High
        </p>
      </div>
    </div>
  );
};

export default Nav;
