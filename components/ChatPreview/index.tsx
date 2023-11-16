'use client'
import React, { useEffect, useState } from 'react';

export interface IChatPreviewData {
    idChat: number;
    nombreAsesoria: string
    ultimoMensaje: string | undefined
    fechaUltimoMensaje: string | undefined
    nombreUsuario: string | undefined
    apellidoUsuario: string | undefined
    // Otros campos de chat
};

const ChatPreview: React.FC<IChatPreviewData> = ({ idChat, nombreAsesoria , ultimoMensaje, fechaUltimoMensaje,nombreUsuario, apellidoUsuario}) => {

  return (
    <div key={idChat}>
        <div className="bg-white p-2  border border-black m-2 w-90 hover:bg-gray-400/10">
            <span className='font-bold'>{nombreAsesoria}</span>
            <div className="border-t border-black m-2"></div>
            <div className="flex justify-between">
                <p className="font text-left p-2">{nombreUsuario ? nombreUsuario : ''}{" "}{apellidoUsuario? apellidoUsuario:''}{" : "}{ultimoMensaje ? ultimoMensaje : 'No hay mensajes'}</p>
                <p className="opacity-50 text-right p-2">{fechaUltimoMensaje ? fechaUltimoMensaje : ''}</p>
            </div>  
        </div>
    </div>
  );
};

export default ChatPreview;