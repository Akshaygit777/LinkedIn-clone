import Image from 'next/image'
import React from 'react'
import Searchinput from './Searchinput'
import NavbarItems from './NavbarItems'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from './button'


const Navbar = () => {
  return (
    <div className='fixed w-full  bg-[#121917] z-50 shadow-[0_8px_16px_rgba(0,0,0,0.46)] border border-gray-800'>
        <div className='flex items-center max-w-6xl justify-between h-14 mx-auto px-3'>
            <div className='flex items-center gap-3'>
                <Image
                src={'/image.jpg'}
                alt="logo"
                width={35}
                height={35}/>
                <div className='md:block hidden'>
                  <Searchinput/>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <div className='md:block hidden'>
               <NavbarItems/>
                </div>
                <div>
                    <SignedIn>
                    <UserButton/>
                    </SignedIn>
                    <SignedOut>
                   <Button className='rounded-full bg-gray-500 text-black' variant={"secondary"}  >
                    <SignInButton/>
                   </Button>
                    </SignedOut>
                  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar