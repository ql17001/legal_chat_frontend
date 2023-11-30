"use client"
import React, { ChangeEvent, useCallback } from "react";
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
    asesor?: ICliente;
  }

const AsesoriaTableCompleta: React.FC = () => {
  const [asesorias, setAsesorias] = useState<IAsesoria[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<string>('all');

  const loadAsesoriaData = useCallback(() => {
    customAxios.get(`/asesorias?page=${currentPage}&filtro=${currentFilter}`)
      .then((response) => {
        const responseData = response.data["0"];
        setAsesorias(responseData.data);
        setTotalPages(response.data.lastPage);
      })
      .catch((error) => {
        console.error('Error fetching asesorias:', error);
      });
  }, [currentPage,currentFilter]);

  useEffect(
    ()=>{
      setCurrentPage(1);
    },
    [currentFilter]
  )

  useEffect(() => {
    loadAsesoriaData();
  }, [currentPage, loadAsesoriaData]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onFilter = (filterSelected: string) => {
    setCurrentFilter(filterSelected);
  };

  const handleFiltroOnChange = (e:ChangeEvent<HTMLSelectElement>) => onFilter(e.currentTarget.value);

  const obtenerEstado = (estado: string) => {
    if (estado === 's') {
      return <label>Sin asesor</label>;
    } else if (estado === 't') {
      return <label>Terminada</label>;
    } else if (estado === 'e') {
      return <label>En proceso</label>;
    } else {
      return <label></label>;
    }
  };

    return (
    <div>
      <div>
        <label>Filtro: </label><br></br>
        <select onChange={handleFiltroOnChange} value={currentFilter}>
          <option value="all">Todos</option>
          <option value="s">Sin asesor</option>
          <option value="t">Terminada</option>
          <option value="e">En proceso</option>
        </select>
      </div><br></br>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Asesor</th>
            <th className="px-4 py-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {asesorias.map((asesoria) => (
            <tr key={asesoria.id}>
              <td className="border px-4 py-2">{asesoria.nombre}</td>
              <td className="border px-4 py-2">{asesoria.cliente.nombre}</td>
              <td className="border px-4 py-2">{asesoria?.asesor?.nombre}</td>
              <td className="border px-4 py-2">{obtenerEstado(asesoria.estado)}</td>
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

export default AsesoriaTableCompleta;