'use client'
import React, { useEffect, useState } from "react"
import axios from "axios";
import customAxios from "@/utils/customAxios";
import { retrieveAuthentication } from "@/utils/authentication";

interface IUserData {
    nombre: string;
    apellido: string;
    email: string;
    dui: string;
}

const fetchData = async (
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>,
    setOriginalData: React.Dispatch<React.SetStateAction<IUserData>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    token: string
) => {
    try {
        const response = await customAxios.get<IUserData>("http://localhost:8000/usuario/perfil");
        const { nombre, apellido, email, dui } = response.data;
        setUserData({
            nombre: nombre,
            apellido: apellido,
            email: email,
            dui: dui
        });
        setOriginalData({
            nombre: nombre,
            apellido: apellido,
            email: email,
            dui: dui
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert("Error al obtener los datos del perfil, axios error: " + error);
        } else {
            alert("Error al obtener datos del perfil: " + error);
        }
        setError("Error al obtener los datos del perfil.");
    }
};

const ViewProfileScreen = () => { 
    const [userData, setUserData] = useState<IUserData>({
        nombre: '',
        apellido: '',
        email: '',
        dui: '',
    });
    
    const [originalData, setOriginalData] = useState<IUserData>({
        nombre: '',
        apellido: '',
        email: '',
        dui: '',
    });

    const [error, setError] = useState<string>('');
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await customAxios.put("http://localhost:8000/usuario/perfil", userData);
            // Actualizar los datos del usuario con la respuesta del servidor
            setUserData(response.data);
            setEditMode(false);
        } catch (error) {
            setError("Error al actualizar el perfil.");
        }
    };



    useEffect(() => {
        const authentication = retrieveAuthentication();
        if (authentication) {
            fetchData(setUserData, setOriginalData, setError, authentication.token);
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
                        <input type="text" name="nombre " disabled={!editMode} value={userData.nombre} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block">Apellido:</label>
                        <input type="text" name="apellido" disabled={!editMode} value={userData.apellido} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block">Correo Electrónico:</label>
                        <input type="email" name="email" disabled={!editMode} value={userData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label className="block">Documento de Identidad:</label>
                        <input type="text" name="documento" disabled={!editMode} value={userData.dui} onChange={handleInputChange} />
                    </div>
                    <div className="col-span-2 flex gap-x-4 place-self-end ">
                        {
                            editMode ? (
                                <>
                                <button onClick={handleSubmit}>Guardar</button>
                                <button onClick={() => {

                                    setUserData(originalData);
                                    setEditMode(false);

                                }}>Cancelar</button>
                                </>
                            ) : (
                                <button onClick={() => setEditMode(true)}>Editar</button>
                            )
                        }
                        <button>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ViewProfileScreen;