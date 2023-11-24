"use client"
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import customAxios from "@/utils/customAxios";
import Pagination from "@/components/Pagination";

interface IFecha {
    date: string;
    timezone_type: number;
    timezone: string;
  }
  
  interface ICliente {
    nombre: string;
    apellido: string;
  }
  
  interface IAsesoria {
    id: number;
    nombre: string;
    estado: string;
    fecha: IFecha;
    cliente: ICliente;
  }

const AsesoriaTable: React.FC = () => {
  const [asesorias, setAsesorias] = useState<IAsesoria[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadAsesoriaData = useCallback(() => {
    customAxios.get(`/asesorias/sin-asesor?page=${currentPage}`)
      .then((response) => {
        const responseData = response.data["0"];
        setAsesorias(responseData.data);
        setTotalPages(response.data.lastPage);
      })
      .catch((error) => {
        console.error('Error fetching asesorias:', error);
      });
  }, [currentPage]);

  useEffect(() => {
    loadAsesoriaData();
  }, [currentPage, loadAsesoriaData]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAsesoria = async (asesoriaId: number) => {
    const confirmationUser = window.confirm('¿Seguro que desea tomar la asesoría?');
    
    if (confirmationUser) {
      try {
        const response = await customAxios.put(`/asesorias/tomar/${asesoriaId}`);
        console.log('Asesoría tomada con éxito:', response.data);
        alert('Asesoría tomada con éxito.');
        loadAsesoriaData();
      } catch (error) {
        console.error('Error al tomar la asesoría:', error);
        window.alert('Ocurrió un error. ' + error);
      }
    }
  };

    return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {asesorias.map((asesoria) => (
            <tr key={asesoria.id}>
              <td className="border px-4 py-2">{asesoria.nombre}</td>
              <td className="border px-4 py-2">{asesoria.cliente.nombre}</td>
              <td className="border px-4 py-2">{asesoria.fecha.date}</td>
              <td className="border px-4 py-2">
                <div className="flex flex-row justify-center gap-2">
                  <button className="boton-default-asesoria" onClick={() => handleAsesoria(asesoria.id)}>Tomar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { }
      <div className="mt-4 flex flex-row justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onClick={paginate} />
      </div>
    </div>
  );
};

export default AsesoriaTable;