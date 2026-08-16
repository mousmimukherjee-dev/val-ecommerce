import Product from '@/components/Product/Product'
import React from 'react'

const productpage = ({params}:{params: Promise<{id: string , category : string}>}) => {
  return (
    <Product params={params} />
  )
}

export default productpage