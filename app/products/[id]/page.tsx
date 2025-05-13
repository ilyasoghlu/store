import React from 'react'
import BreadCrumbs from '@/components/single-product/BreadCrumbs'
import { fetchSingleProduct } from '@/utils/actions'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import FavoriteToggleButton from '@/components/products/FavoriteToggleButton'
import AddToCard from '@/components/single-product/AddToCard'
import ProductRating from '@/components/single-product/ProductRating'


async function ProductDetailsPage({params}:{params:{id:string}}) {
  const product = await fetchSingleProduct(params.id)
  const {name, image, company, description, price} = product
  const dollarsAmount = formatCurrency(price)
  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image first col  */}
        <div className="relative h-full ">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px)100vw, (max-width:1200px)50vw, 33vw "
            priority
            className="w-full rounded object-cover"
          />
        </div>
        {/* Product info col  */}
        <div>
          <div className='flex  gap-x-8 items-center'>
            <h1 className='capitalize text-3xl font-bold '>{name}</h1>
            <FavoriteToggleButton productId={params.id} />
          </div>
          <ProductRating productId={params.id} />
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='text-md bg-muted inline-block rounded mt-3'>{dollarsAmount}</p>
          <p className='bg-muted-foreground mt-6 leading-8 '>{description}</p>
          <AddToCard productId={params.id}/>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage
