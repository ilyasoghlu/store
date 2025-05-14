import React from 'react'
import { LuUser } from 'react-icons/lu'
import { currentUser} from '@clerk/nextjs/server'



async function UserIcon() {

  // const {userId} =auth()    (coming soon)
  const user = await currentUser()


  const profileImage = user?.imageUrl;

if (profileImage){
  return <img src={profileImage} className= 'w-6 h-6 rounded-full object-cover'  />
}
  return (
    <LuUser className='w-6 h-6 bg-green-950 rounded-full text-white'/>
  )
}

export default UserIcon