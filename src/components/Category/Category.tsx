"use client";
import React, { use } from "react";
import { productsData } from "@/data/data";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ProductProps } from "@/types/types";
import { useApiCall } from "@/context/ApiCallContext";

const Category = ({ params }: { params: Promise<{ category: string }> }) => {

  const{products} = useApiCall()
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
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 font-body w-[80%] h-auto mx-auto py-5">
      {productsCategory.map((item) => {
        return (
          <Link href={`/productpage/${item.id}/${item.category}`} key={item.id} className="group p-2 border border-gray-light rounded-xl">
            <div className="relative flex justify-center items-center overflow-hidden">
               <div className="relative w-82.5 h-50 md:h-110  overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-contain group-hover:scale-[1.03]"
                              />
                            </div>
              <button
                className="absolute bottom-3 flex items-center justify-center
        w-[90%] md:w-[80%]
        cursor-pointer
        md:shadow-2xl
        md:shadow-gray-dark
        px-3 py-4
        text-xs md:text-sm
        whitespace-nowrap
        text-center
        bg-white
        opacity-100
        md:opacity-0
        group-hover:opacity-100
        transition-opacity duration-200"
                onClick={(e) => addToCart(e, item)}
              >
                Add to Bag
              </button>
            </div>
            <p className="">{item.name}</p>{" "}
            <p className="text-gray-dark">{Math.floor(item.price)} SEK</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
