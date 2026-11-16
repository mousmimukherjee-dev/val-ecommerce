
"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { ProductProps } from "@/types/types";
import { useApiCall } from "@/context/ApiCallContext";

const Category = ({ params }: { params: Promise<{ category: string }> }) => {
  const { products } = useApiCall();
  const { category } = use(params);
  const { setCart } = useCart();

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

  const productsCategory = products.filter(
    (product) => product.category === category,
  );

  return (
    <main className="font-body bg-[#faf9f6] min-h-screen">
      <section className="max-w-7xl mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#dedbd4] pb-8">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#a49b8d] mb-3">
              Explore VAL
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-[#252521] capitalize">
              {category}
            </h1>
          </div>

          <p className="text-sm text-[#77736c]">
            {productsCategory.length} {productsCategory.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </section>

      {productsCategory.length > 0 ? (
        <section className="max-w-7xl mx-auto px-5 md:px-10 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-7 gap-y-10 md:gap-y-14">
            {productsCategory.map((item) => (
              <Link
                href={`/productpage/${item.id}/${item.category}`}
                key={item.id}
                className="group min-w-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f0eee9]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-contain p-3 md:p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  <button
                    onClick={(e) => addToCart(e, item)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 w-[calc(100%-24px)] md:w-[calc(100%-32px)] bg-[#faf9f6] text-[#252521] py-3 text-xs md:text-sm tracking-wide opacity-100 md:opacity-0 translate-y-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:bg-[#252521] hover:text-white"
                  >
                    <ShoppingBag size={15} strokeWidth={1.5} />
                    Add to Bag
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="pt-4 flex flex-col gap-1">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.16em] text-[#a49b8d]">
                    {item.category}
                  </p>
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-sm md:text-base text-[#252521] group-hover:text-[#8b7965] transition-colors duration-200">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-[#55514b] whitespace-nowrap">
                      {Math.floor(item.price)} SEK
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section className="min-h-[40vh] flex flex-col items-center justify-center text-center px-5">
          <h2 className="font-heading text-2xl md:text-3xl text-[#252521] mb-3">
            Nothing here just yet
          </h2>
          <p className="text-sm text-[#77736c] mb-6">
            Explore the full collection to discover more.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#252521] text-white px-6 py-3 text-sm hover:bg-[#514c43] transition-colors"
          >
            Explore Collection
            <ArrowUpRight size={16} />
          </Link>
        </section>
      )}
    </main>
  );
};

export default Category;
