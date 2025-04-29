import React from 'react'
import { SiVsco } from "react-icons/si";
import { Button } from '../ui/button';
import Link from 'next/link';

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <SiVsco className='w-6 h-6'/>
      </Link>
    </Button>
  );
}

export default Logo