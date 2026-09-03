"use client";
import { ReactNode, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { CartItemsProps, ProductProps } from "@/types/types";

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemsProps[]>([]);
  const [isLoaded , setIsloaded] = useState(false)

  useEffect(()=>{

    const cartItems = localStorage.getItem("cartItems")

    if(cartItems !== null){
     
      const savedItems:CartItemsProps[] = JSON.parse(cartItems)
      setCart(savedItems)
      setIsloaded(true)
    }
  },[])

  useEffect(()=> {

    if(isLoaded){
     
       localStorage.setItem("cartItems", JSON.stringify(cart))

    }

   
  },[cart , isLoaded])

  return (
    <CartContext.Provider value={{ cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
