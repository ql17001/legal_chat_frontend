'use client'
import axios from "axios"
import React, { useEffect, useState } from "react"
import { retrieveAuthentication } from "@/utils/authentication"; // Asegúrate de importar tu función retrieveAuthentication

interface IUserData {
    nombre: string;
    apellido: string;
    correo: string;
    dui: string;
}

const fetchData = async (setUserData: React.Dispatch<React.SetStateAction<IUserData>>, setError: React.Dispatch<React.SetStateAction<string>>, token: string) => {
    try {
        const response = await axios.get<IUserData>("/usuario/perfil", {
            headers: {
                Authorization: `Bearer ${token}`                     
            }
        });
        const { nombre, apellido, correo, dui } = response.data;
        setUserData({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            dui: dui
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setError("Error al obtener los datos del perfil.");
        }
        else {
            console.error("Error al obtener datos del perfil:", error);
        }
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