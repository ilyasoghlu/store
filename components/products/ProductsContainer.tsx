import React from 'react'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { fetchAllProducts } from '@/utils/actions'
import Link from 'next/link'


async function ProductsContainer() {
  return (
    <div>ProductsContainer</div>
  )
}

export default ProductsContainer