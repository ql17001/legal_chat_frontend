"use client";
import Modal from "../ModalSolicitarAsesoria"
import React, { useState } from 'react';


const HomeClient = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
     return(
        <div className='px-[125px] py-7 w-auto h-auto flex flex-col'>
            <div className='self-center'>
                    <h1 className='text-2xl font-bold'>Inicio</h1>
            </div>
            <div className='self-center py-3'>
                    <p>LegalChat es un servicio para realizar consultas de indole legal a nuestros<br></br> 
                        asesores. Puede solicitar asesoria de algunos temas legales como:
                    </p>
            </div>
            <div className='self-center'>
                <ul className='list-disc'>
                    <li>¿Necesito un abogado para mi situación legal?</li>
                    <li>¿Cuáles son mis derechos legales en esta situación?</li>
                    <li>¿Cuáles son las leyes y regulaciones relevantes para mi negocio o industria?</li>
                    <li>¿Qué pasos debo seguir para presentar una demanda o una reclamación legal?</li>
                    <li>¿Qué opciones tengo si estoy enfrentando un divorcio o cuestiones de custodia?</li>
                    <li>¿Cómo puedo  proteger mi propiedad intelectual, como patentes, marcas<br />registradas o derechos de autos?</li>                        <li>¿Qué hacer si estoy siendo acosado en mi lugarde trabajo?</li>
                    <li>¿Cuáles son mis derechos en relación con la vivienda, como el arrendamiento y<br/>el desalojo?</li>
                    <li>¿Cómo puedo planificar adecuadamente mi patrimonio y mi testamento?</li>
                    <li>¿Cuáles son las implicaciones legales de la inmigración o ciudadania en un país?</li>
                    <li>¿Cómo puedo resolver disputas vecinales o problemas de propiedad?</li>
                    <li>¿Cuál es el proceso de quiebra y sus implicaciones legales?</li>
                    <li>¿Cómo puedo obtener una orden de restricción o protección <br/>en caso de violencia doméstica?</li>
                    <li>¿Cuáles son mis derechos si soy arrestado o enfrento cargos penales?</li>
                </ul>
            </div>
            <div className='self-center py-3'>
                <p>Puede pedir comuinicarse con un asesor creando una asesoria dando clic a <br /> el siguiente botón.</p>
            </div>
            <div className="flex justify-end px-[700px]">           
                <button className='whitespace-nowrap' onClick={openModal}>Nueva Asesoria</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}/>
            </div>
     </div>
  )
}
export default HomeClient