'use client'
import React, { useEffect, useState } from 'react';
import customAxios from '@/utils/customAxios'; 
import ChatPreview from '@/components/ChatPreview';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

interface IChatData {
    idChat: number;
    nombreAsesoria: string;
    ultimoMensaje?: {
      contenido: string;
      fechaEnvio: {
        date: string;
        timezone_type: number;
        timezone: string;
      };
      usuario: {
        nombre: string;
        apellido: string;
      };
    };
}

interface IResponseData {
  message: string;
  data: {
    chats: IChatData[]; 
  };
  totalPages: number;
}

const Chats = () => {
  const [responseData, setResponseData] = useState<IResponseData>({ message: '', data: { chats: [] } , totalPages: 1});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await customAxios.get<IResponseData>(`/chats?page=${currentPage}`);
      const datos:IResponseData = response.data;

      setResponseData( datos);
      setTotalPages(datos.totalPages);
    } catch (error) {
      alert('Error al cargar los chats');
      // Manejar el error de manera adecuada
    }
  };

  useEffect(() => {
    fetchData();
  },); 

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleFinalizarAsesoria = async (idChat: number) => {
    try {
      // Realizar una llamada a la API para finalizar la asesoria
      await customAxios.post(`/chats/${idChat}/finalizar`);

      // Actualizar la lista de chats excluyendo el chat finalizado
      const updatedChats = responseData.data.chats.filter(chat => chat.idChat !== idChat);
      setResponseData({ ...responseData, data: { chats: updatedChats } });
    } catch (error) {
      alert('Error al finalizar la asesoria');
      // Manejar el error de manera adecuada
    }
  };

  return (
    <div className="text-center">
      <h1 className="font-bold">Chats</h1>
      {responseData.data.chats.length === 0 ? (
        <p>No hay chats disponibles</p>
      ) : (
        <div>
          <ul>
            {responseData.data.chats.map((response) => (
              <li key={response.idChat}>
                <Link href={`/chats/${response.idChat}`}>
                  <ChatPreview
                    idChat={response.idChat}
                    nombreAsesoria={response.nombreAsesoria}
                    ultimoMensaje={response.ultimoMensaje?.contenido || ''}
                    fechaUltimoMensaje={response.ultimoMensaje?.fechaEnvio.date || ''}
                    nombreUsuario={response.ultimoMensaje?.usuario.nombre || ''}
                    apellidoUsuario={response.ultimoMensaje?.usuario.apellido || ''}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center items-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onClick={handlePageChange} />
      </div>
    </div>
  );
  
};

export default Chats;