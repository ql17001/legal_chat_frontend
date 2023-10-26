import { Routes } from '@/utils/constants'
import React from 'react'
import Link from 'next/link'

type TRole = undefined | 'Cliente' | 'Asesor' | 'Administrador';

const getRole= ():TRole=> 'Administrador';

const Header = () => {
    let role:TRole=getRole();
    
    return (
        <div className='w-full items-end pb-5 pt-5 flex flex-row justify-between pl-10 bg-blue-600 text-white'>
            <Link href="" className='text-xl px-20 font-bold'>LegalChat</Link>

            <div className="flex flex-row items-center pr-20">
            {role== undefined && <Link href={Routes.REGISTRARSE} className='text-sm px-2'>Registrarse</Link>} 

            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <Link href={Routes.HOME} className='text-sm px-2'>Inicio</Link>}
            {(role==='Asesor'||role==='Cliente') && <Link href={Routes.CHATS} className='text-sm px-2'>Chats</Link>}
            {(role==='Administrador') && <Link href={Routes.USUARIOS} className='text-sm px-2'>Usuarios</Link>}
            {(role==='Administrador'|| role==='Asesor') && <Link href={Routes.ASESORIAS}  className='text-sm px-2'>Asesorías</Link>}
            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <Link href={Routes.VER_PERFIL} className='text-sm px-2'>Ver perfil</Link>}
            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <Link href={Routes.LOGIN} className='text-sm px-2 pr-10'>Cerrar sesión</Link>}
            </div>
        </div>
    )
}


export default Header