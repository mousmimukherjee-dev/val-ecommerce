import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ProductProps } from "@/types/types";

export interface ApiCallContextProviderProps {
  products: ProductProps[];
  setProducts: Dispatch<SetStateAction<ProductProps[]>>;
}

export const ApiCallContext = createContext<ApiCallContextProviderProps | null>(
  null,
);

export const useApiCall = () => {
  const context = useContext(ApiCallContext);

  if (!context) {
    throw new Error("Apicall should contain DummyJsonProduct data");
  }

  return context;
};
