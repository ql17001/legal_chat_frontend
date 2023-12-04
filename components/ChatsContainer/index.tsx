import { IMensaje } from '@/types/global';
import dateFormater from '@/utils/dateFormater';
import React, { useEffect, useRef } from 'react'

interface IProperties {
  mensajes: IMensaje[];
  usuarioActual: string;
}

interface IChatItemProperties {mensaje: IMensaje; mio: boolean}

const ChatItem = ({mensaje, mio}: IChatItemProperties) => {
  const { dateString, timeString } = dateFormater(mensaje.fechaEnvio.date)
  return <div className='flex flex-col'>
    { !mio && <span className='ml-2 font-bold'>{`${mensaje.usuario.nombre} ${mensaje.usuario.apellido}`}</span>}
    <div className={`flex ${mio ? 'flex-row self-end':'flex-row-reverse self-start'} gap-2 max-w-sm`}>
      <div className='flex flex-col items-center text-[0.65rem] text-gray-400 justify-center'>
        <span>{dateString}</span><span>{timeString}</span>
      </div>
      <div className={`border border-gray-200 p-2 rounded-lg ${mio ? ' rounded-br-none bg-theme-blue text-white' : 'rounded-bl-none'}`}>{mensaje.contenido}</div>
    </div>
  </div>
}

const ChatsContainer = ({mensajes, usuarioActual}: IProperties) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [mensajes]);
  
  return (
    <div className='flex-1 border-gray-300 border rounded-md w-full p-2 max-h-96 overflow-y-scroll' ref={containerRef}>
      <div className='flex flex-col gap-2 max-h-full'>
        {
          mensajes.map(mensaje => <ChatItem key={mensaje.id} mio={usuarioActual === mensaje.usuario.email} mensaje = {mensaje}/>)
        }
      </div>
    </div>
  )
}

export default ChatsContainer