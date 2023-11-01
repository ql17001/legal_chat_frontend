'use client'
import React, { useEffect, useState } from "react"
import axios from "axios";
import customAxios from "@/utils/customAxios";
import { retrieveAuthentication } from "@/utils/authentication";

interface IUserData {
    nombre: string;
    apellido: string;
    correo: string;
    dui: string;
}

const fetchData = async (
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    token: string
) => {
    try {
        const response = await customAxios.get<IUserData>("/usuario/perfil");
        const { nombre, apellido, correo, dui } = response.data;
        setUserData({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            dui: dui
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert("Error al obtener los datos del perfil: " + error);
            console.log("Error al obtener los datos del perfil: " + error)
        } else {
            alert("Error al obtener datos del perfil: " + error);
            console.log("Error al obtener los datos del perfil: " + error)
        }
        setError("Error al obtener los datos del perfil.");
    }
};

const ViewProfileScreen = () => { 
    const [userData, setUserData] = useState<IUserData>({
        nombre: '',
        apellido: '',
        correo: '',
        dui: '',
    });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const authentication = retrieveAuthentication();
        if (authentication) {
            fetchData(setUserData, setError, authentication.token);
        } else {
            setError('No se pudo obtener el token de autenticación.');
        }
    }, []);


    return (
        <div className="px-[125px] py-14 w-auto h-auto flex flex-col">
            <div className="self-center">
                <h1 className="font-bold">Ver Perfil</h1>
            </div>
            <div className="self-center py-7">
                <div className="grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-20">
                    <div>
                        <label className="block">Nombre:</label>
                        <input type="text" name="nombre " disabled value={userData.nombre} />
                    </div>
                    <div>
                        <label className="block">Apellido:</label>
                        <input type="text" name="apellido" disabled value={userData.apellido} />
                    </div>
                    <div>
                        <label className="block">Correo Electrónico:</label>
                        <input type="email" name="correo" disabled value={userData.correo} />
                    </div>
                    <div>
                        <label className="block">Documento de Identidad:</label>
                        <input type="text" name="documento" disabled value={userData.dui} />
                    </div>
                    <div className="col-span-2 flex gap-x-4 place-self-end ">
                        <button>Editar</button>
                        <button>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ViewProfileScreen;