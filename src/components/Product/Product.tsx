"use client";

import { useApiCall } from "@/context/ApiCallContext";
import { useCart } from "@/context/CartContext";
import type { ProductProps } from "@/types/types";
import Image from "next/image";
import { use } from "react";
import { ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";

const Product = ({
  params,
}: {
  params: Promise<{ id: string; category: string }>;
}) => {
  const { id } = use(params);
  const { products } = useApiCall();
  const { setCart } = useCart();

  const productsInfo = products.filter((product) => product.id === Number(id));

  const addToCart = (product: ProductProps) => {
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

  if (productsInfo.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-gray-400">
          VAL Collection
        </p>
        <h1 className="mt-4 font-heading text-3xl text-black">
          Product not found
        </h1>
        <p className="mt-3 max-w-sm font-body text-sm text-gray-500">
          We could not find this product in our collection.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-[#faf9f6] min-h-screen pb-20">
      {productsInfo.map((item) => (
        <div key={item.id}>
          {/* Breadcrumb */}
          <div className="mx-auto max-w-[1440px] px-5 py-7 md:px-10">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-400">
              VAL <span className="mx-2">/</span> COLLECTION
              <span className="mx-2">/</span>
              <span className="text-gray-700">{item.category}</span>
            </p>
          </div>

          <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f0eee9]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-5 transition-transform duration-700 hover:scale-[1.04] md:p-10"
                />

                <div className="absolute left-5 top-5 flex items-center gap-2 bg-white/80 px-3 py-2 backdrop-blur-sm">
                  <Sparkles size={12} />
                  <span className="font-body text-[9px] uppercase tracking-[0.18em]">
                    VAL Collection
                  </span>
                </div>

                <span className="absolute bottom-5 right-5 font-body text-[10px] tracking-widest text-gray-500">
                  01 / 01
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center py-5 lg:py-12">
              <div className="max-w-xl">
                <p className="font-body text-xs uppercase tracking-[0.25em] text-gray-500">
                  {item.category}
                </p>

                <h1
                  data-testid="product-name"
                  className="mt-5 font-heading text-4xl leading-[1.15] tracking-tight text-[#222] md:text-5xl lg:text-6xl"
                >
                  {item.name}
                </h1>

                <div className="mt-7 flex items-center justify-between border-b border-[#dedbd4] pb-6">
                  <p
                    data-testid="product-price"
                    className="font-body text-lg tracking-wide text-[#222]"
                  >
                    {item.price} SEK
                  </p>

                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-gray-400">
                    VAL EDITION
                  </span>
                </div>

                <div className="py-8">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    The details
                  </p>

                  <p
                    data-testid="product-description"
                    className="mt-4 max-w-md font-body text-sm leading-8 text-gray-600 md:text-base"
                  >
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(item)}
                  className="group mt-2 flex w-full items-center justify-between bg-[#20201e] px-6 py-5 text-white transition-colors duration-300 hover:bg-[#44433f]"
                >
                  <span className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.18em]">
                    <ShoppingBag size={17} />
                    Add to Bag
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-5 text-center font-body text-[10px] uppercase tracking-[0.15em] text-gray-400">
                  Discover your next favourite piece
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-24 max-w-[1440px] border-t border-[#dedbd4] px-5 pt-10 md:px-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gray-400">
                  A little more VAL
                </p>

                <h2 className="mt-3 font-heading text-3xl text-[#222] md:text-4xl">
                  Style starts with you.
                </h2>
              </div>

              <p className="max-w-sm font-body text-sm leading-7 text-gray-500">
                Explore the collection and find pieces that feel like you.
              </p>
            </div>
          </section>
        </div>
      ))}
    </main>
  );
};

export default Product;
