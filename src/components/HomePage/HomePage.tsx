"use client";

import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const HomePage = () => {
  const { user, setUser } = useUser();
  const { setCart } = useCart();
  const [error, setError] = useState("");

  const handleShopping = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      setError("Please log in to shop!");
    } else {
      setError("");
    }
  };

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (user) {
      e.preventDefault();
      setCart([]);
      localStorage.removeItem("cartItems");
      setUser(null);
      setError("");
    }
  };

  return (
    <main className="bg-[#faf9f6] font-body text-[#252521]">
      <section className="relative min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] grid grid-cols-1 md:grid-cols-2">
        <div className="relative min-h-[55vh] md:min-h-full overflow-hidden">
          <Image
            src="/images/home.jpeg"
            alt="VAL fashion collection"
            priority
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#faf9f6]/10 to-[#faf9f6]/90 md:to-[#faf9f6]" />

          <div className="absolute bottom-7 left-6 md:bottom-10 md:left-10 text-white">
            <p className="text-xs tracking-[0.3em] uppercase mb-2">
              The VAL collection
            </p>
            <p className="font-heading text-2xl md:text-4xl">
              Made for everyday living.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-7 py-14 md:px-12 lg:px-20 md:py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-[#a49b8d]" />
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c8275]">
                Autumn / Winter 2026
              </p>
            </div>

            {user?.email && (
              <p className="text-sm text-[#8c8275] mb-5">
                Welcome back, {user.email}!
              </p>
            )}

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.04em]">
              Dressed for
              <span className="block italic font-normal text-[#9b8d7c]">
                every moment.
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[#77736c] mt-8 max-w-md">
              Thoughtfully made clothing for women, men and kids. Clean
              silhouettes, quality materials and honest prices.
            </p>

            {error && <p className="text-sm text-red-600 mt-5">{error}</p>}

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                href="/products"
                onClick={handleShopping}
                className="inline-flex items-center justify-center gap-4 bg-[#252521] text-white px-7 py-4 text-sm tracking-[0.12em] hover:bg-[#514c43] transition-colors duration-300"
              >
                EXPLORE COLLECTION
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href={user ? "#" : "/signin"}
                onClick={handleSignOut}
                className="inline-flex items-center justify-center border border-[#c9c3b9] text-[#252521] px-7 py-4 text-sm tracking-[0.12em] hover:bg-[#eeece6] transition-colors duration-300"
              >
                {user ? "SIGN OUT" : "SIGN IN"}
              </Link>
            </div>

            <div className="border-t border-[#dedbd4] mt-14 pt-6 flex flex-wrap justify-between gap-3 items-center text-[10px] md:text-xs uppercase tracking-[0.18em] text-[#a49b8d]">
              <span>Considered design</span>
              <span>Everyday essentials</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#dedbd4] px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#a49b8d] mb-5">
              Discover VAL
            </p>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              Less, but
              <span className="italic text-[#9b8d7c]"> better.</span>
            </h2>
          </div>

          <div className="md:pb-2">
            <p className="text-[#77736c] text-base leading-relaxed max-w-lg">
              Explore everyday pieces designed around simplicity, versatility
              and comfort. Find something that feels right for you.
            </p>

            <Link
              href="/products"
              onClick={handleShopping}
              className="inline-flex items-center gap-3 mt-7 text-sm border-b border-[#252521] pb-2 hover:text-[#9b8d7c] hover:border-[#9b8d7c] transition-colors"
            >
              Discover the collection
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
