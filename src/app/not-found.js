import React from 'react'
import Link from 'next/link'

// -------------------------------------------

const NotFoundPage = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center'>
                <div className='text-center mt-20'>
                    <h1 className='text-6xl font-bold text-[#FF7A00] mb-4'>404</h1>
                    <h2 className='text-3xl font-semibold mb-2'>Page Not Found</h2>
                    <p className='text-gray-400'>The page you are looking for does not exist.</p>
                    <div className='mt-6'>
                        <Link href="/" className='w-fit bg-black text-white px-4 py-2 rounded'>Go Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage
