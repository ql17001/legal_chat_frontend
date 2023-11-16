'use client';
import { Routes } from '@/utils/constants'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { deleteAuthentication, retrieveAuthentication } from '@/utils/authentication';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
    const [role, setRole] = useState<string>()
    const router = useRouter();
    const pathname = usePathname()
    
    const onClickLogout = () => {
      deleteAuthentication();
      setRole(undefined);
      router.push(Routes.LOGIN);
    }

    useEffect(() => {
      const authentication = retrieveAuthentication();

      if(authentication){
        setRole(authentication.role);
      }
    }, [pathname])
    

    return (
        <div className='w-full items-end pb-5 pt-5 flex flex-row justify-between pl-10 bg-blue-600 text-white'>
            <Link href={role ? Routes.HOME : Routes.LOGIN } className='text-xl px-20 font-bold'>LegalChat</Link>

            <div className="flex flex-row items-center pr-20">
            {role== undefined && <Link href={Routes.REGISTRARSE} className='text-sm px-2'>Registrarse</Link>} 
            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <Link href={Routes.HOME} className='text-sm px-2'>Inicio</Link>}
            {(role==='Asesor'||role==='Cliente') && <Link href={Routes.CHATS} className='text-sm px-2'>Chats</Link>}
            {(role==='Administrador') && <Link href={Routes.USUARIOS} className='text-sm px-2'>Usuarios</Link>}
            {(role==='Administrador') && <Link href={Routes.ASESORIAS}  className='text-sm px-2'>Asesorías</Link>}
            {(role==='Asesor') && <Link href={Routes.ASESORIAS_SIN_ASESOR}  className='text-sm px-2'>Asesorías sin asesor</Link>}
            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <Link href={Routes.VER_PERFIL} className='text-sm px-2'>Ver perfil</Link>}
            {(role==='Administrador'|| role==='Asesor'||role==='Cliente') && <button onClick={onClickLogout} className='bg-transparent text-sm px-2 pr-10'>Cerrar sesión</button>}
            </div>
        </div>
    )
}


export default Header