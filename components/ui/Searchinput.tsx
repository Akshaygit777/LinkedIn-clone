import React from 'react'
import { Input } from './input'


const Searchinput = () => {
  return (
    <div><Input
    type="text" placeholder="search"
    className='bg-grey-500 w-80 rounded-lg border-gray-800 bg-black text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-500' /></div>
  )
}

export default Searchinput