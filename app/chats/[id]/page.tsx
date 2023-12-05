'use client';
import ChatsContainer from '@/components/ChatsContainer'
import { IFecha, IMensaje } from '@/types/global';
import { retrieveAuthentication } from '@/utils/authentication';
import customAxios from '@/utils/customAxios';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import {EventSourcePolyfill} from 'event-source-polyfill';
import { useRouter } from 'next/navigation';
import { Routes } from '@/utils/constants';

interface IProperties {
  params: {
    id: string;
  }
}

interface IChatResponse {
  message: string;
  data: {
    asesoria: {
      id: number;
      nombre: string;
      estado: 'e' | 't';
      fecha: IFecha;
      cliente: {
        nombre: string;
        apellido: string;
      }
    },
    chat: {
      id: number;
      fechaCreacion: IFecha;
      mensajes: IMensaje[]
    },
    mercure:{
      'token': string,
      'topic': string
    }
  }
}

interface IEnviarMensajeResponse {
  message: string;
}

const ChatPage = ({params: {id}}:IProperties) => {
  const [messages, setMessages] = useState<IMensaje[]>([]);
  const [mercure, setMercure] = useState<IChatResponse['data']['mercure']>()
  const authentication = retrieveAuthentication();
  const audioReference = useRef<HTMLAudioElement>(null);
  const [message, setMessage] = useState('');
  const [asesoria, setAsesoria] = useState<IChatResponse['data']['asesoria']>();
  const router = useRouter();

  const handleMessageChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.currentTarget.value.length <= 255){
      setMessage(event.currentTarget.value);
    }
  }

  const handleEnviarClick = async () => {
    if(message.length > 0 && asesoria?.estado !== 't'){
      try {
        await customAxios.put(`/chats/${id}`, {
          contenido: message
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        setMessage('');
      } catch (error) {
        alert('No fue posible enviar el mensaje.')
      }
    }
  }

  const handleTerminarClick = async () => {
    if(confirm('¿Terminar asesoria? Una vez terminada no sera posible enviar mensajes.')){
      try {
        await customAxios.put(`/asesorias/terminar/${asesoria?.id}`);
        alert('Se termino la asesoria.');
        router.push(Routes.CHATS);
      } catch (error) {
        alert('Error al terminar la asesoria');
      }
    }
  }

  useEffect(() => {
    const url = new URL(`${process.env.NEXT_PUBLIC_MERCURE_URL}`);
    url.searchParams.append('topic', mercure ? mercure.topic : '');

    const es = new EventSourcePolyfill(url.toString(), {
      headers: {
          'Authorization': `Bearer ${mercure?.token}`,
      }
    });

    es.onopen = event => {
      console.log('Se conecto exitosamente.')
    }

    es.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data) as IMensaje;
      if(audioReference.current && authentication?.email !== incomingMessage.usuario.email){
        audioReference.current.play();
      }
      setMessages(previousMessages => [...previousMessages, incomingMessage])
    }
  
    return () => {
      es.close()
    }
  }, [authentication?.email, mercure])

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await customAxios.get<IChatResponse>(`/chats/${id}`);
        const { data } = response;
        const { data: { asesoria, chat: {mensajes}, mercure }, message } = data;

        setMessages(mensajes)
        setMercure(mercure);
        setAsesoria(asesoria);

      } catch (error) {
        alert('No fue posible obtener la informacion del chat.')
      }
    }
  
    getChat();
  }, [id])
  

  return (
    <div className='flex flex-col flex-1 items-center w-full max-w-xl m-auto p-8 gap-2'>
      <h1>{`${asesoria?.cliente.nombre} ${asesoria?.cliente.apellido}: ${asesoria?.nombre}`}</h1>
      <audio ref={audioReference} src='/notification.wav' />
      <ChatsContainer mensajes={messages} usuarioActual={authentication ? authentication.email : ''}/>
      {asesoria?.estado !== 't' && <>
        <div className='w-full flex flex-row gap-4'>
          <input className='flex-1' type="text" value={message} onChange={handleMessageChange} />
          <button onClick={handleEnviarClick}>Enviar</button>
        </div>
        <button className='boton-error' onClick={handleTerminarClick}>Terminar asesoria</button>
      </>}
    </div>
  )
}

export default ChatPage