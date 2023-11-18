'use client';
import { Routes } from '@/utils/constants';
import customAxios from '@/utils/customAxios';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'

const CambiarContraseniaPage = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const router = useRouter()

  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value);

  const handleConfirmedPasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => setConfirm(event.currentTarget.value);

  const handleGuardarOnClick = async () => {
    if(password !== '' && confirm !== '' && password === confirm){
      try {
        await customAxios.put('usuario/actualizar-contraseña',
        {
          password          
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
        
        alert('Se actualizo la contraseña exitosamente.');
        router.push(Routes.VER_PERFIL);
      } catch (error) {
        if(isAxiosError(error)){
          alert('Ocurrio un error al procesar la peticion: '+error.message);
        }else{
          alert('Ocurrio un error que impidio hacer la peticion.')
        }
      }

    }else{
      alert('Debe especificar un valor a las contraseñas y las contraseñas deben ser iguales.')
    }
  }

  return (
    <div className='max-w-lg m-auto'>
      <h1 className='mb-6 text-center'>Cambiar contraseña</h1>
      <div className='grid grid-cols-2 gap-6'>
        <div className="flex flex-col  ">
          <label>Contraseña</label>
          <input onChange={handlePasswordOnChange} type="password" />
        </div>
        <div className="flex flex-col  ">
          <label>Confirmar contraseña</label>
          <input onChange={handleConfirmedPasswordOnChange} type="password" />
        </div>
      </div>
      <div className='w-full flex justify-end gap-2 mt-4'>
        <button className='boton-guardar' onClick={handleGuardarOnClick}>Guardar</button>
        <Link href={Routes.VER_PERFIL} className='boton-error'>Cancelar</Link>
      </div>
    </div>
  )
}

export default CambiarContraseniaPage