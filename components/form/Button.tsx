'use client'

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { SignInButton } from "@clerk/nextjs"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { LuTrash2, LuPenSquare } from "react-icons/lu"
import { useFormState } from "react-dom"
import { ReLoadIcon} from '@radix-ui/react-icons'



type btnSize = 'default' | 'lg' | 'sm';

type SubmitButtonProps = {
  className? :string;
  text?: string;
  size?: btnSize;
}

export function SubmitButton({className='', text='submit', size='lg'}: SubmitButtonProps ) {
  const { pending } = useFormState()

  return (
    <Button type="submit" disabled={pending} className={cn('capitalize', className)} size={size}>
      {pending ? <>
      <ReLoadIcon className= 'mr-2 h-4 w-4 animate-spin'/>
      Please wait...
      </> : text}
    </Button>
  )
}

