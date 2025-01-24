import React from 'react'
import logo from '/logo/logo.jpg'

const Error404 = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center w-screen h-screen top-0 left-0'>
        <img src={logo} className='w-56 h-56'/>
        <p className='text-3xl text-center'>The page you&apos;re looking for does not exist.</p>
        <p className='text-center'>click here to go to <a href="/" className=' p-1 text-xl rounded-md text-green-900'>Home page</a></p>
      </div>
    </>
    
  )
}

export default Error404