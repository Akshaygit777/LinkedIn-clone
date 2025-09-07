import React from 'react'
import { Input } from './input'


const Searchinput = () => {
  return (
    <div><Input
    type="text" placeholder="search"
    className='bg-grey-500 w-80 rounded-lg border-none text-white' /></div>
  )
}

export default Searchinput