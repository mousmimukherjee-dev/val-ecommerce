"use client"
import { CartItemsProps, ProductProps } from "@/types/types"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

interface CartContextProps{

  cart: CartItemsProps[],
  setCart: Dispatch<SetStateAction<CartItemsProps[]>>
}

export const CartContext = createContext<CartContextProps | null>(null)

export const useCart=()=>{

  const context = useContext(CartContext)

  if(!context){

    throw new Error("Product not added")
   
  }
  return context;

}



