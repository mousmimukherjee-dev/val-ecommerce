"use client";
import React, { use } from "react";
import { productsData } from "@/data/data";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ProductProps } from "@/types/types";

const Category = ({ params }: { params: Promise<{ category: string }> }) => {
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

  const productsCategory = productsData.filter(
    (product) => product.category === category,
  );

  return (
    <div className="max-w-7xl flex justify-evenly items-center py-5 font-body">
      {productsCategory.map((item) => {
        return (
          <Link href={`/productpage/${item.id}/${item.category}`} key={item.id} className="group ">
            <div className="relative flex justify-center items-center overflow-hidden">
              <Image
                src={item.image}
                alt=""
                width={80}
                height={80}
                className="w-82.5 h-110 object-cover group-hover:scale-[1.03]"
              />
              <button
                className="w-fit z-50 cursor-pointer px-19 py-2  absolute bottom-4 text-center mx-auto bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-75"
                onClick={(e) => addToCart(e, item)}
              >
                Add to Bag
              </button>
            </div>
            <p className="">{item.name}</p>{" "}
            <p className="text-gray-dark">{item.price}SEK</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
