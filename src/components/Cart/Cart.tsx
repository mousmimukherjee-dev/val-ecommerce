"use client";

import { useCart } from "@/context/CartContext";
import { CartItemsProps, ProductProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart } = useCart();

  const removeItem = (product: CartItemsProps) => {
    setCart((prev) => prev.map((item) => item.id === product.id ? {...item, quantity : item.quantity - 1} : item).filter((item) => item.quantity > 0));
  };

  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity , 0)
  const afterDiscount= Math.floor(subTotal * 0.15)

  const totalAmount = subTotal - afterDiscount

  return (
    <>
      <div className="grid font-body grid-cols-3 items-center text-gray-dark p-6 max-w-6xl">
        <Link href="/">Continue Shopping</Link>
        <h1 className="text-center">
          Shopping Bag {""} {cart.length}
        </h1>
      </div>

      {cart.length === 0 && (
        <>
          <div data-testid="empty-cart" className="flex flex-col justify-center items-center mt-20">
            <h3 >YOUR BASKET IS EMPTY</h3>
            <p>The items you add will be shown here</p>
          </div>
        </>
      )}

      {cart.length > 0 && (
  <div data-testid="product-cart" className="flex justify-evenly items-center px-6 ">
    <div className="flex flex-col gap-10">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-evenly items-center"
        >
          <Image
            src={item.image}
            alt=""
            loading="eager"
            width={80}
            height={80}
            className="w-60 h-65 object-contain"
          />
          <p>{item.name}</p>
          <p>{item.price} {" "}SEK</p>
          <p data-testid="product-quantity">{item.quantity}</p>
          <button className="cursor-pointer" onClick={() => removeItem(item)}>
            Remove
          </button>
        </div>
      ))}
    </div>
    <div className="border flex flex-col items-start border-gray-dark p-8 w-96">
  <h2 className="text-center mb-6">Order Summary</h2>

  <div className="flex justify-between w-full">
    <p>Subtotal</p>
    <p data-testid="sub-total-price">{subTotal} SEK</p>
  </div>

  <div className="flex justify-between w-full border-b border-gray-light pb-3">
    <p>Discount (15%)</p>
    <p data-testid="discount-price">{afterDiscount} SEK</p>
  </div>

  <div className="flex justify-between w-full pt-3">
    <p>Total</p>
    <p data-testid="total-price">{totalAmount} SEK</p>
  </div>
</div>
  </div>
)}
    </>
  );
};

export default Cart;
