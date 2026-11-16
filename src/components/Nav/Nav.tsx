
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useApiCall } from "@/context/ApiCallContext";
import { useUser } from "@/context/UserContext";
import { ArrowDownUp } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products } = useApiCall();
  const { user } = useUser();

  if (
    pathname === "/cartpage" ||
    pathname === "/" ||
    pathname === "/signin"
  ) {
    return null;
  }

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const activeCategory =
    pathname === "/products"
      ? "All"
      : decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "");

  const currentSort = searchParams.get("sort");

  const handleSort = (sort: string) => {
    router.push(`/products?sort=${sort}`);
  };

  if (!user) return null;

  return (
    <nav
      data-testid="navbar"
      className="w-full bg-[#faf9f6] border-b border-[#dedbd4] font-body"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-5">
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="flex items-center gap-7 md:gap-9 min-w-max">
              {categories.map((category) => {
                const href =
                  category === "All"
                    ? "/products"
                    : `/products/${category}`;

                const isActive =
                  activeCategory.toLowerCase() === category.toLowerCase();

                return (
                  <li key={category}>
                    <Link
                      href={href}
                      className={`relative inline-block pb-2 text-base md:text-lg capitalize font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[#252521]"
                          : "text-[#8c877f] hover:text-[#252521]"
                      }`}
                    >
                      {category}
                      {isActive && (
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#252521]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm md:text-base text-[#77736c]">
            <span className="flex items-center gap-2 uppercase tracking-[0.12em] text-xs md:text-sm">
              <ArrowDownUp size={16} />
              Sort by
            </span>

            <button
              onClick={() => handleSort("low")}
              className={`cursor-pointer transition-colors ${
                currentSort === "low"
                  ? "text-[#252521] font-medium underline underline-offset-4"
                  : "hover:text-[#252521]"
              }`}
            >
              Price: Low to High
            </button>

            <button
              onClick={() => handleSort("high")}
              className={`cursor-pointer transition-colors ${
                currentSort === "high"
                  ? "text-[#252521] font-medium underline underline-offset-4"
                  : "hover:text-[#252521]"
              }`}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
