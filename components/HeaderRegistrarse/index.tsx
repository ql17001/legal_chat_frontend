import React from 'react'
import Link from 'next/link'


const HeaderRegistrarse = () => {
    return (
        <div className='relative w-full items-end pb-5 pt-5 flex flex-row justify-between pl-10 bg-blue-600 text-white'>
            <Link href="" className='text-xl px-20 font-bold'>LegalChat</Link>

            <div className="flex flex-row items-center pr-20">
                
                <button type='button' className='text-sm px-2 pr-10'>Registrarse</button>
            </div>

        </div>
    )
}


export default HeaderRegistrarse