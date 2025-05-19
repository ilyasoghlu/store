import React from 'react'
import { formatCurrency } from '@/utils/format'
import Link from 'next/link'
import {Card, CardContent} from '@/components/ui/card'
import { Product } from '@prisma/client'
import Image from 'next/image'
import FavoriteToggleButton from './FavoriteToggleButton'



async function ProductsList({products}: {products:Product[]} ) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) =>{
        const {name, price, image, company} = product
        const dollarsAmount = formatCurrency(price)
        const productId = product.id
        return (
          <article key={productId} className='group relative'>
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3" >
                  <div className="relative h-64 md:h-48 md:w-48 rounded">
                    <Image
                      src={`/images/${image}`}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500 "
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg font-semibold capitalize">{name}</h2>
                    <h4 className='text-muted-foreground'>{company}</h4>
                  </div>
                    <p className="text-muted-foreground text-lg md:ml-auto">{dollarsAmount}</p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProductsList