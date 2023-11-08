'use client'
import HomeAdmin from '@/components/HomeAdmin';
import HomeAdviser from '@/components/HomeAdviser';
import HomeClient from '@/components/HomeClient';
import { Routes } from '@/utils/constants'
import { deleteAuthentication, retrieveAuthentication } from '@/utils/authentication';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [role, setRole] = useState<string>()
  const pathname = usePathname()

  useEffect(() => {
    const authentication = retrieveAuthentication();

    if(authentication){
      setRole(authentication.role);
    }
  }, [pathname])

  return (
    <main>
      {(role==='Administrador') && <HomeAdmin />}
      {(role==='Cliente') && <HomeClient />}
      {(role==='Asesor') && <HomeAdviser />}
    </main>
  )
}
