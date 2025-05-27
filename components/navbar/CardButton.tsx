import React from 'react'
import { Button } from '../ui/button'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Link from 'next/link';
import { fetchCartItems } from '@/utils/actions';

async function CardButton() {
  // !This function comes from actions 
  const numItemsInCard =await  fetchCartItems()
  return (
    <Button
      asChild
      variant="outline"
      size='icon'
      className='flex justify-center items relative'
    >
      <Link href='/card'>
        <MdOutlineShoppingCartCheckout />
        <span className='absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex justify-center items-center text-xs'>{numItemsInCard}</span>
      </Link>
    </Button>
  );
}

export default CardButton