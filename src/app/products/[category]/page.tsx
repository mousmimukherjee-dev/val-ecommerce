import Category from '@/components/Category/Category'
import React from 'react'

const categoryPage = ({params}: {params : Promise<{category: string}>}) => {
  return (
    <Category params={params} />
  )
}

export default categoryPage