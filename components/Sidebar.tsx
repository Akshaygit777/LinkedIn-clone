import Image from 'next/image'
import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'

const Sidebar = ({user} : {user:any}) => {
  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-800 bg-[#161722] rounded-lg'>
        <div className='flex relative flex-col items-center '>
            <div className='w-full h-16 overflow-hidden'>
              {
                user && (
                  <Image
                  src ={"/cover.jpg"}
                  alt="Cover"
                  width={200}
                  height={200}
                  className='w-full h-full rounded-t'/>
                )
              }
            </div>
            <div className='my-1 absolute top-10'>
              <ProfilePhoto src ={user ?  user?.imageUrl : "/cover.jpg"}/>
            </div>
            <div className='border-b border-b-gray-300'>
              <div className='p-2 mt-5 text-center'>
                <h1 className='font-bold hover:underline cursor-pointer text-white'>{user? `${user?.firstName} ${user?.lastName}`: "Akshay"}</h1>
              <p className='text-white text-sm'>{user ? `${user?.username}` : 'username'}</p>
              </div>
            </div>
           

        </div>
        <div className='text-xs'>
            
            <div className='flex w-full items-center px-3 py-2  cursor-pointer justify-between'>
            <p className='text-white'>Post Impression</p>
            <p className='font-bold text-[#0077B5]'>78</p>
            </div>
        
            <div className='flex w-full items-center px-3 py-2  cursor-pointer justify-between'>
            <p className='text-white'>Post</p>
            <p className='font-bold text-[#0077B5]'>0</p>
            </div>
          </div>
    </div>
  )
}

export default Sidebar