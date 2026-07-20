import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const notfound = () => {
  return (
    <div>
        <div className=''>
        <h2 className='text-2xl font-bol my-4'>Page Not Found</h2>
        <Image src="/travel.svg" alt="not-found" width={100} height={100} />
        
        <Link href="/" className='text-blue-500 hover:text-blue-700'>Go to Home</Link>
        </div>
    </div>
  )
}

export default notfound