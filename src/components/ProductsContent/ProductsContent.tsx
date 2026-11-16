
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import type { ProductProps } from "@/types/types";
import { useCart } from "@/context/CartContext";
import { useApiCall } from "@/context/ApiCallContext";
import { useSearchParams } from "next/navigation";

const ProductsContent = () => {
  const { setCart } = useCart();
  const { products } = useApiCall();
  const searchParams = useSearchParams();

  const sortedProducts = [...products];
  const sort = searchParams.get("sort");

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const addToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductProps,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] font-body">
      <section className="mx-auto max-w-[1440px] px-5 pb-10 pt-12 md:px-10 md:pb-16 md:pt-20">
        <div className="flex flex-col justify-between gap-6 border-b border-[#dedbd4] pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Discover the VAL collection
            </p>

            <h1 className="mt-4 font-heading text-5xl tracking-tight text-[#252521] md:text-7xl">
              The Collection<span className="text-[#a49b8d]">.</span>
            </h1>
          </div>

          <p className="max-w-xs text-sm leading-7 text-gray-500 md:text-right">
            Thoughtful pieces for everyday living. Explore the collection
            and find something that feels like you.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            The VAL edit
          </p>

          <p className="text-xs text-gray-500">
            {sortedProducts.length} pieces
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
        {sortedProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="font-heading text-2xl text-[#252521]">
              No products available
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-7 md:gap-y-14 lg:grid-cols-4">
            {sortedProducts.map((item, index) => {
              const href =
                item.category === "All"
                  ? "/products"
                  : `/productpage/${item.id}/${item.category}`;

              return (
                <Link
                  href={href}
                  key={item.id}
                  className="group min-w-0"
                >
                  <div className="relative overflow-hidden bg-[#f0eee9]">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        priority={index < 4}
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => addToCart(e, item)}
                      aria-label={`Add ${item.name} to bag`}
                      className="absolute bottom-3 left-1/2 flex w-[92%] -translate-x-1/2 items-center justify-between bg-white px-3 py-3 text-[9px] uppercase tracking-[0.13em] text-[#252521] shadow-sm transition-all duration-300 hover:bg-[#252521] hover:text-white md:bottom-5 md:w-[85%] md:px-5 md:py-4 md:text-[10px] md:opacity-0 md:group-hover:opacity-100"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag size={14} />
                        Add to bag
                      </span>

                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-start justify-between gap-2 pt-4">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.16em] text-gray-400">
                        {item.category}
                      </p>

                      <p
                        data-testid="product-name"
                        className="mt-2 font-heading text-sm leading-snug text-[#252521] transition-colors group-hover:text-gray-500 md:text-base"
                      >
                        {item.name}
                      </p>
                    </div>

                    <p
                      data-testid="product-price"
                      className="shrink-0 pt-5 text-xs text-[#252521] md:text-sm"
                    >
                      {Math.floor(item.price)} SEK
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-t border-[#dedbd4] bg-[#f0eee9] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Find your everyday favourite
            </p>

            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-tight text-[#252521] md:text-6xl">
              Less searching.
              <br />
              More finding.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-gray-500">
            Explore the VAL collection at your own pace and discover pieces
            that fit your style and everyday life.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductsContent;
