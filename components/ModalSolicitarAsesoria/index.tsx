"use client";
import React, { ChangeEvent,useState } from 'react';
import axios, { isAxiosError } from "axios";
import customAxios from "@/utils/customAxios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ISolicitarAsesoriaResponse {
    message: string;
}

function Modal({ isOpen, onClose }: ModalProps) {
    const [tema, setTema] = useState("");

    const handleTemaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTema(event.currentTarget.value);
    };
  
    const SolicitarAsesoria = async () => {
        try {
          
            const response = await customAxios.post<ISolicitarAsesoriaResponse>(
                "/asesorias/solicitar",
                {
                    nombre: tema,
                },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            alert("Se registro con exito");
            onClose();
        } catch (error) { 
            alert("No se pudo solicitar asesoria_Error: "+error)
        }
    };

    return (
    isOpen && (
      <div className="modal ">
        <div className="modal-content px-[125px] py-7 w-auto h-auto flex flex-col">
          <div>
            <h1 className='font-bold'>Solicitar Asesoria</h1>
          </div>
          <div className='py-7 text-left'>
            <h4>Tema de que necesita la asesoria:</h4>
            <textarea onChange={handleTemaOnChange} rows={5} cols={50}></textarea>
          </div>
          <div className='flex justify-end gap-x-4 place-self-end'>
            <button className='boton-error' onClick={onClose}>Cancelar</button>
            <button className='boton-guardar' onClick={SolicitarAsesoria}>Crear Asesoria</button>
          </div>
        </div>
      </div>
    )
  );
}
export default Modal;