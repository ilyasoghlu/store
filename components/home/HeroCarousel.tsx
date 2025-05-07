import React from 'react'
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem,
    CarouselNext,
    CarouselPrevious 
  } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import hero1 from '@/public/images/hero1.jpg'
import hero2 from '@/public/images/hero2.jpg'
import hero3 from '@/public/images/hero3.jpg'
import hero5 from '@/public/images/hero5.jpg'
import hero6 from '@/public/images/hero6.jpg'
import hero7 from '@/public/images/hero7.jpg'

const carouselImages = [hero1, hero2,hero3,hero5,hero6,hero7]
function HeroCarousel() {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index)=>{
            return<CarouselItem key={index}>
              <Card>
                <CardContent className='p-2'>
                  <Image src={image} alt='hero' className='w-full rounded-md h-[20rem] object-cover' />
                </CardContent>
              </Card>
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default HeroCarousel