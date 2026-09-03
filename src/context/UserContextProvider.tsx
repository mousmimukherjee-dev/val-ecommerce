"use client"
import { ReactNode, useState } from "react";
import { UserContext, UserContextProps, UserProps } from "./UserContext";


export const UserContextProvider=({children}:{children:ReactNode})=>{


  const[user , setUser] = useState<UserProps | null>(null)


  return(

    <UserContext.Provider value={{user , setUser}}>

      {children}
    </UserContext.Provider>

   
  )
}