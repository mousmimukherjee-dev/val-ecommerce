"use client"
import ProductsPage from "@/components/ProducstPage/ProductsPage";
import Image from "next/image";
import Link from "next/link"


const HomePage = () => {
  return (
    <main className="grid grid-cols-2 gap-4">
      <div className="w-full h-screen relative">
        <Image src="/images/home.jpeg" alt="" priority fill sizes="50vw" className="object-cover [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]"/>
      </div>
      <div className="flex flex-col items-right gap-8 pt-40">
        <p className="text-gray-dark text-xl">New Collection — Autumn 2026</p>
        <h2 className="text-black text-5xl font-heading space font-bold">Dressed for Every Moment</h2>
        <p className="text-gray-dark text-lg">
          Thoughtfully made clothing for women, men, and kids.<br></br> Clean
          silhouettes, quality materials, honest prices.
        </p>
        <div className="flex gap-3">
          <Link href="/products" className="border border-black text-black text-sm py-3 px-5 hover:bg-black hover:text-white">SHOP NOW</Link>
          <Link href="/signin" className="border border-black text-black text-sm py-3 px-7.5 hover:bg-black hover:text-white">SIGN OUT</Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage