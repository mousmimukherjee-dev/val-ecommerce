import type { Metadata } from "next";
import { Geist, Bodoni_Moda, Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import Nav from "@/components/Nav/Nav";
import CartContextProvider from "@/context/CartContextProvider";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: "400",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "VAL",
  description:
    "A minimal fashion e-commerce site featuring category-based product browsing, a shopping cart with quantity management, and a clean, modern design",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#ffffff]">
        <CartContextProvider>
          <Header />
          <Nav />
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
