'use client'

import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { SignInButton } from "@clerk/nextjs"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { LuTrash2, LuPenSquare } from "react-icons/lu"
import { useFormState, useFormStatus } from "react-dom"
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

type actionType = 'edit' | 'delete'


export const IconButton = ({actionType}: {actionType:actionType}) =>{
  const {pending} = useFormStatus()


  const renderIcon = () =>{
    switch(actionType){
      case 'edit':
        return<LuPenSquare />
      case 'delete':
        return<LuTrash2 />
      default:
        const never:never=actionType;
        throw new Error(`Invalid action type: ${never}`)
    }
  }

  return <Button type='submit' size='icon' variant='link' className="p-2 cursor-pointer">
    {pending?<ReLoadIcon className='animate-spin' />: renderIcon() }
  </Button> 
}

