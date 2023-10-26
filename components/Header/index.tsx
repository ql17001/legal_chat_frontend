import { Routes } from '@/utils/constants'
import React from 'react'
import Link from 'next/link'


const Header = () => {
    return (
        <div className='w-full items-end pb-5 pt-5 flex flex-row justify-between pl-10 bg-blue-600 text-white'>
            <Link href="" className='text-xl px-20 font-bold'>LegalChat</Link>

            <div className="flex flex-row items-center pr-20">
                <Link href={Routes.HOME} className='text-sm px-2'>Inicio</Link>
                <Link href={Routes.USUARIOS} className='text-sm px-2'>Usuarios</Link>
                <Link href={Routes.ASESORIAS}  className='text-sm px-2'>Asesorías</Link>
                <Link  href={Routes.VER_PERFIL} className='text-sm px-2'>Perfil</Link>
                <Link href='' className='text-sm px-2 pr-10'>Cerrar sesión</Link>
            </div>
        </div>
    )
}


export default Header