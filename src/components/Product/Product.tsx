"use client";
import { useCart } from "@/context/CartContext";
import { productsData } from "@/data/data";
import { CartItemsProps, ProductProps } from "@/types/types";
import Image from "next/image";
import { use } from "react";

const Product = ({
  params,
}: {
  params: Promise<{ id: string; category: string }>;
}) => {
  const { id } = use(params);

  const productsInfo = productsData.filter(
    (product) => product.id === Number(id),
  );

  const { setCart } = useCart();

  const addToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: ProductProps,
  ) => {
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
    <div className="font-body">
      {productsInfo.map((item) => {
        return (
          <div key={item.id} className="flex justify-evenly p-10">
            <div>
              <Image
                src={item.image}
                alt="product-img"
                loading="eager"
                width={80}
                height={80}
                className="w-100 h-150 object-cover"
              />
            </div>

            <div>
              <div className="border-b border-b-gray-light flex flex-col gap-2 pb-3">
                <p data-testid="product-category" className="text-gray-dark ">{item.category}</p>
                <h3 data-testid="product-name"  className="text-black ">{item.name}</h3>
                <p data-testid="product-price" className="text-gray-dark">{item.price} {" "}SEK</p>
              </div>

              <p data-testid="product-description" className="border-b font-body border-b-gray-light py-10">
                {item.description}
              </p>

              <button
                className="text-center cursor-pointer bg-black text-white w-full py-3 mt-8"
                onClick={(e) => addToCart(e, item)}
              >
                Add to Bag
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
