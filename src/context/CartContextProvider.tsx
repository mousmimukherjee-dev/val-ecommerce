"use client"
import { ReactNode, useState } from "react";
import {CartContext} from "@/context/CartContext";
import { CartItemsProps, ProductProps } from "@/types/types";


const CartContextProvider=({children,}: {children: ReactNode})=>{

  const[cart , setCart] = useState<CartItemsProps[]>([])


  return(

    <CartContext.Provider value={{cart , setCart}}>
    {children}
    </CartContext.Provider>
  )
}



export default CartContextProvider