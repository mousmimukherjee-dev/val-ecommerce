"use client";
import { Dispatch, ReactNode, useEffect, useState } from "react";
import { ApiCallContext, ApiCallContextProviderProps } from "./ApiCallContext";
import { ProductProps } from "@/types/types";

export interface DummyJsonProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
}

export const ApiCallContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=12");
        if(!res.ok){

          throw new Error("Fetch failed")
        }
        const data = await res.json();

        const apiCallProduct: ProductProps[] = data.products.map(
          (product: DummyJsonProduct) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            category: product.category,
            image: product.images?.[0] || product.thumbnail,
            description: product.description,
          }),
        );

        setProducts(apiCallProduct);
      } catch (error) {
        console.log("Fetch failed!",error);
      }
    };

    getProducts();
  }, []);

  return (
    <ApiCallContext.Provider value={{ products, setProducts }}>
      {children}
    </ApiCallContext.Provider>
  );
};
