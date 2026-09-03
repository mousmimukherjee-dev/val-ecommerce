"use client"
import ProductsPage from "@/components/ProducstPage/ProductsPage";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link"


const HomePage = () => {

   const { user , setUser} = useUser();
   
  return (
    <main className="grid grid-cols-2 gap-4">
      <div className="w-full h-screen relative">
        <Image src="/images/home.jpeg" alt="" priority fill sizes="50vw" className="object-cover mask-[linear-gradient(to_right,black_70%,transparent_100%)]"/>
      </div>
      <div className="flex flex-col items-right gap-8 pt-40">
        {user?.email && <p className="text-gray-dark text-xl">Welcome, {user?.email}!</p>}
        <p className="text-gray-dark text-xl">New Collection — Autumn 2026</p>
        <h2 className="text-black text-5xl font-heading space font-bold">Dressed for Every Moment</h2>
        <p className="text-gray-dark text-lg">
          Thoughtfully made clothing for women, men, and kids.<br></br> Clean
          silhouettes, quality materials, honest prices.
        </p>
        <div className="flex gap-3">
          <Link href="/products" className="border border-black text-black text-sm py-3 px-5 hover:bg-black hover:text-white">SHOP NOW</Link>

         
          <Link href={user ? "#" : "/signin"} className="border border-black text-black text-sm py-3 px-7.5 hover:bg-black hover:text-white" onClick={e => {

            
            if(user){
              e.preventDefault()
              setUser(null)
            }
          }}>{user ? "SIGN OUT" : "SIGN IN"}</Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage