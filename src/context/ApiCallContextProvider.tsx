"use client";

import { ReactNode, useState } from "react";
import { ApiCallContext } from "./ApiCallContext";
import { productsData } from "@/data/data";

export const ApiCallContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState(productsData);

  return (
    <ApiCallContext.Provider value={{ products, setProducts }}>
      {children}
    </ApiCallContext.Provider>
  );
};
