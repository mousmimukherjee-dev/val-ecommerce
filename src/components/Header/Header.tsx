"use client";

import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export const Header = () => {
  const pathname = usePathname();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`${
        pathname === "/signin" ? "hidden" : ""
      } w-full font-body bg-[#faf9f6] border-b border-[#dedbd4]`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-20 md:h-24 relative flex justify-center items-center">
        <Link
          href="/"
          className="text-[#252521] text-3xl md:text-5xl font-heading font-bold tracking-[0.12em] transition-opacity hover:opacity-70"
        >
          VAL
        </Link>

        <Link
          href="/cartpage"
          aria-label={`Shopping bag with ${totalItems} items`}
          className={`${
            pathname === "/" || pathname === "/signin" ? "hidden" : ""
          } absolute right-5 md:right-10 flex items-center gap-2 text-[#252521] hover:text-[#8b7965] transition-colors`}
        >
          <ShoppingBag size={20} strokeWidth={1.5} />

          <span className="text-sm tracking-wide">Bag</span>

          <span
            data-testid="bag-count"
            className="flex items-center justify-center min-w-5 h-5 rounded-full bg-[#252521] text-white text-[10px] px-1"
          >
            {totalItems}
          </span>
        </Link>
      </div>
    </header>
  );
};
