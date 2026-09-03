"use client";
import { productsData } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

import { CartItemsProps, ProductProps } from "@/types/types";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { ApiCallContextProvider } from "@/context/ApiCallContextProvider";
import { useApiCall } from "@/context/ApiCallContext";

const ProductsPage = () => {
  
  const { setCart } = useCart();
  const { products } = useApiCall()

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
    <div className="grid grid-cols-4 gap-8 py-5 max-w-7xl mx-auto h-110 font-body">
      {products.map((item) => {
        const href =
          item.category === "All"
            ? "/products"
            : `/productpage/${item.id}/${item.category}`;
        return (
          <Link href={href} key={item.id} className="group">
            <div className="relative flex justify-center items-center overflow-hidden">
         
              <div className="relative w-82.5 h-110 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain group-hover:scale-[1.03]"
                />
              </div>
              <button
                className="w-fit z-50 cursor-pointer px-19 py-2  absolute bottom-4 text-center mx-auto bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-75"
                onClick={(e) => addToCart(e, item)}
              >
                Add to bag
              </button>
            </div>
            <p data-testid="product-name" className="">
              {item.name}
            </p>{" "}
            <p data-testid="product-price" className="text-gray-dark">
              {item.price} SEK
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsPage;
