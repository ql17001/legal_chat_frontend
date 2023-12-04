'use client';
import ChatsContainer from '@/components/ChatsContainer'
import { IFecha, IMensaje } from '@/types/global';
import { retrieveAuthentication } from '@/utils/authentication';
import customAxios from '@/utils/customAxios';
import React, { useEffect, useState } from 'react'

interface IProperties {
  params: {
    id: string;
  }
}

interface IChatResponse {
  message: string;
  data: {
    asesoria: {
      nombre: string;
      estado: 'e' | 't';
      fecha: IFecha;
    },
    chat: {
      id: number;
      fechaCreacion: IFecha;
      mensajes: IMensaje[]
    }
  }
}

const ChatPage = ({params: {id}}:IProperties) => {
  const [messages, setMessages] = useState<IMensaje[]>([]);
  const authentication = retrieveAuthentication();

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await customAxios.get<IChatResponse>(`/chats/${id}`);
        const { data } = response;
        const { data: { asesoria, chat: {mensajes} }, message } = data;

        setMessages(mensajes)

      } catch (error) {
        
      }
    }
  
    getChat();
  }, [id])
  

  return (
    <div className='flex flex-col flex-1 items-center w-full max-w-xl m-auto p-8 gap-2'>
      <h1>Usuario: Nombre asesoria</h1>
      <ChatsContainer mensajes={messages} usuarioActual={authentication ? authentication.email : ''}/>
      <div className='w-full flex flex-row gap-4'>
        <input className='flex-1' type="text" name="" id="" />
        <button>Enviar</button>
      </div>
      <button>Terminar asesoria</button>
    </div>
  )
}

export default ChatPage