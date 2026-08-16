"use client"
import { useCart } from '@/context/CartContext'
import Link from 'next/link'


export const Header = () => {

const{cart} = useCart()

const totalItems = cart.reduce((sum,item) => sum + item.quantity , 0)

  return (
    <header className='w-full font-body p-6 relative flex justify-center items-center border-b border-gray-light'>
      <Link href="/" className='text-black text-5xl font-heading space font-bold'>VAL</Link>
      <Link href="/cartpage" className='text-black absolute font-medium right-20 text-md'>Bag <span data-testid="bag-count">{totalItems}</span></Link>
    </header>
  )
}
