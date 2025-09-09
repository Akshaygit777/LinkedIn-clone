import React from 'react'

const Sidebar = ({user} : {user:any}) => {
  return (
    <div className='hidden md:block w-[20%] h-fit border bordergray-300 bg-[#0f172a] rounded-lg'>
        <div className='flex relative flex-col items-center '>
            <div className='w-full h-16 overflow-hidden'></div>
        </div>
    </div>
  )
}

export default Sidebar