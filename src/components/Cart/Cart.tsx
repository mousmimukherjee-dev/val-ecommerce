"use client";

import { useCart } from "@/context/CartContext";
import type { CartItemsProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, setCart } = useCart();

  const updateQuantity = (product: CartItemsProps, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (product: CartItemsProps) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subTotalRounded = Math.floor(subTotal);
  const afterDiscount = Math.floor(subTotal * 0.15);
  const totalAmount = Math.floor(subTotal - afterDiscount);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#faf9f6] font-body">
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 md:px-10 md:pt-20">
        <div className="flex flex-col gap-6 border-b border-[#dedbd4] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
              Your selections
            </p>

            <h1 className="mt-4 font-heading text-4xl text-[#252521] md:text-6xl">
              Shopping Bag<span className="text-[#a49b8d]">.</span>
            </h1>
          </div>

          <Link
            href="/products"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 transition-colors hover:text-[#252521]"
          >
            <ArrowLeft size={15} />
            Continue shopping
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your bag
          </p>

          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            VAL
          </p>
        </div>
      </section>

      {cart.length === 0 ? (
        <section
          data-testid="empty-cart"
          className="mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-center px-5 pb-24 text-center"
        >
          <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0eee9]">
            <span className="font-heading text-3xl text-[#a49b8d]">V</span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            Nothing here yet
          </p>

          <h2 className="mt-4 font-heading text-3xl text-[#252521] md:text-4xl">
            Your bag is waiting.
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
            Discover something you love and add your favourite pieces to your
            shopping bag.
          </p>

          <Link
            href="/products"
            className="mt-8 bg-[#252521] px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#514b43]"
          >
            Explore the collection
          </Link>
        </section>
      ) : (
        <section
          data-testid="product-cart"
          className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-10 px-5 pb-24 md:grid-cols-[1.6fr_1fr] md:gap-14 md:px-10"
        >
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-[#dedbd4] pb-4">
              <h2 className="font-heading text-xl text-[#252521]">
                Your items
              </h2>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                {cart.length} products
              </p>
            </div>

            <div className="flex flex-col">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#dedbd4] py-6 md:gap-7"
                >
                  <Link
                    href={`/productpage/${item.id}/${item.category}`}
                    className="relative h-36 w-28 shrink-0 overflow-hidden bg-[#f0eee9] md:h-48 md:w-40"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 112px, 160px"
                      className="object-contain p-3"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                        {item.category}
                      </p>

                      <h3 className="mt-2 font-heading text-base text-[#252521] md:text-lg">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600">
                        {Math.floor(item.price)} SEK
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center border border-[#dedbd4]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="p-2.5 text-[#252521] transition-colors hover:bg-[#f0eee9]"
                        >
                          <Minus size={13} />
                        </button>

                        <span
                          data-testid="product-quantity"
                          className="min-w-9 text-center text-xs text-[#252521]"
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="p-2.5 text-[#252521] transition-colors hover:bg-[#f0eee9]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500 transition-colors hover:text-red-700"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="hidden shrink-0 pt-1 text-sm text-[#252521] sm:block">
                    {Math.floor(item.price * item.quantity)} SEK
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-[#dedbd4] bg-[#f5f3ef] p-6 md:sticky md:top-8 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
              VAL checkout
            </p>

            <h2 className="mb-8 mt-3 font-heading text-2xl text-[#252521]">
              Order Summary
            </h2>

            <div className="space-y-5 border-b border-[#dedbd4] pb-6">
              <div className="flex justify-between gap-3 text-sm text-gray-600">
                <p>Subtotal</p>
                <p data-testid="sub-total-price">{subTotalRounded} SEK</p>
              </div>

              <div className="flex justify-between gap-3 text-sm text-gray-600">
                <p>Discount (15%)</p>
                <p data-testid="discount-price" className="text-[#71816a]">
                  -{afterDiscount} SEK
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 py-6">
              <p className="font-heading text-lg text-[#252521]">Total</p>

              <p
                data-testid="total-price"
                className="text-lg font-medium text-[#252521]"
              >
                {totalAmount} SEK
              </p>
            </div>

            <p className="border-t border-[#dedbd4] pt-5 text-xs leading-6 text-gray-500">
              Your 15% discount has been applied to your order.
            </p>

            <Link
              href="/products"
              className="mt-6 flex w-full items-center justify-center gap-2 border border-[#252521] bg-[#252521] px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[#252521]"
            >
              Continue shopping
              <ArrowLeft size={14} />
            </Link>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
