import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import customAxios from "@/utils/customAxios";
import { Routes } from "@/utils/constants";

interface UserIUserFormProperties {
    id?: number;
}

interface ICreateUsuarioResponse {
  message: string;
}

interface ILoadUsuarioResponse {
  message: string;
  data: {
    nombre: string;
    apellido: string;
    email: string;
    dui: string;
    rol: 'Asesor' | 'Administrador' | 'Cliente';
  }
}

interface IUsuarioEntity {
  id: number;
  nombre: string;
  edad: number;
}

interface IUpdateUsuarioResponse {
  message: string;
  data: IUsuarioEntity;
}


const UserForm = (properties:UserIUserFormProperties) =>{
  const {id} = properties;
const router = useRouter();
const [firstName, setFirstName] = useState("");
const [email, setEmail] = useState("");
const [lastName, setLastName] = useState("");
const [DUI, setDUI] = useState("");
const [password, setPassword] = useState("");
const [confirmedPassword, setConfirmedPassword] = useState("");
const [role, setRole] = useState<string>("Cliente");

const handleFirstNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
  };
  const handleLastNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };
  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleDUIOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDUI(event.currentTarget.value);
  };
  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const handleConfirmedPasswordOnChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmedPassword(event.currentTarget.value);
  };

  const handleRoleOnChange = (event:ChangeEvent<HTMLSelectElement>) => {
    if(event.currentTarget.value === 'Cliente' || event.currentTarget.value === 'Administrador' || event.currentTarget.value === 'Asesor'){
      setRole(event.currentTarget.value)
    }
  };

  const validarDatos = () => {
    const errores:string[] = [];

    if(confirmedPassword === '' || password === '' || password !== confirmedPassword){
      errores.push('Se debe especificar una contraseña y/o la contraseña debe ser igual a la confirmacion de la contraseña.');
    }

    if(firstName === ''){
      errores.push('Se debe especificar un nombre.');
    }

    if(lastName === ''){
      errores.push('Se debe especificar un apellido.');
    }

    if(email === ''){
      errores.push('Se debe especificar un correo electronico.');
    }

    if(DUI === '' || DUI.length !== 9){
      errores.push('Se debe especificar un Documento Unico de Identidad y/o debe ser un numero sin guion de 9 digitos.');
    }

    return errores;
  }

  const createUsuario = async () => {
    try {
      await customAxios.post<ICreateUsuarioResponse>('/usuario/crear', {
        nombre: firstName,
        apellido:lastName,
        email:email,
        dui:DUI,
        password:password,
        roles:JSON.stringify([role])
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert('Se creo el usuario con exito.')
      
      router.push(Routes.USUARIOS);
    } catch (error) {
      if(isAxiosError(error)){
        alert('Error al procesar la peticion: ' + error.response?.data)
      }else{
        alert('Ocurrio un error que impidio realizar la peticion: ' + error)
      }
    }
  }

const handleGuardarOnClick = () =>{
  const errores = validarDatos()
  if(errores.length === 0){
    if(id == undefined){
      createUsuario();
    }else{
      updateUsuario();
    }
  }else{
    alert(`Se deben solventar los siguientes errores: ${errores.reduce((previousString, currentString) => {
      const newString = `${previousString} ${currentString}`;
      return newString;
    })}`);
  }
}
  

  const updateUsuario = async () => {
    try {
      await customAxios.put<IUpdateUsuarioResponse>(`/usuario/${id}`, {
        nombre: firstName,
        apellido:lastName,
        email:email,
        dui:DUI,
        password:password,
        passwordConfirmado:confirmedPassword,
        roles:JSON.stringify([role])
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      
      alert('Se actualizaron los datos del usuario con exito.')

      router.push(Routes.USUARIOS);
    } catch (error) {
      if(isAxiosError(error)){
        alert('Error al procesar la peticion: ' + error.response?.data)
      }else{
        alert('Ocurrio un error que impidio realizar la peticion: ' + error)
      }
    }
  }

  useEffect(() => {
    const loadUsuario = async () => {
      try {
        const response = await customAxios.get<ILoadUsuarioResponse>(`/usuario/${id}`);
        const { data } = response.data;
        setDUI(data.dui);
        setFirstName(data.nombre);
        setLastName(data.apellido);
        setRole(data.rol);
        setEmail(data.email)
      } catch (error) {
        if(isAxiosError(error)){
          alert(`Ocurrio un error en la peticion: ${error.message}`);
        }else{
          alert('Ocurrio un error que impidio cargar los datos del usuario.');
        }
      }
    }

    if(id != undefined){
      loadUsuario();
    }
  }, [id])
  

  return (
    <div className="px-[125px] py-14 w-auto h-auto">
    <div className="px-[10px] py-6 grid grid-cols-4 gap-x-8 gap-y-6">
      <div className="text-center col-span-4 font-bold">
        <h1>{`${id == undefined ? 'Creando ' : 'Editando '}`}usuario</h1>
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Nombre</label>
        <input
          onChange={handleFirstNameOnChange}
          id="firstName"
          type="text"
          value={firstName}
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Apellido</label>
        <input onChange={handleLastNameOnChange} 
        id="lastName"
        type="text"
        value={lastName}/>
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Correo electrónico</label>
        <input onChange={handleEmailOnChange} 
        id="email"
        type="text"
        value={email}/>
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Documento Único de Identidad</label>
        <input onChange={handleDUIOnChange}
        id="DUI"
        type="text"
        value={DUI}
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Contraseña</label>
        <input onChange={handlePasswordOnChange} type="password"
        id="password"
        value={password}
        />
      </div>
      <div className="col-span-2 flex flex-col">
        <label>Confirme contraseña</label>
        <input onChange={handleConfirmedPasswordOnChange} type="password"
        id="confirmedPassword"
        value={confirmedPassword} />
      </div>
      <div className="col-span-2 flex flex-col">
        <label htmlFor="rol">Rol:</label>
        <select onChange={handleRoleOnChange} id='rol' value={role}>
          <option value='Cliente'>Cliente</option>
          <option value='Administrador'>Administrador</option>
          <option value='Asesor'>Asesor</option>
          </select>
      </div>
      <div className="col-span-4 flex flex-row justify-center items-center gap-2">
      <button className="boton-default bg-green-400" onClick={handleGuardarOnClick}>Guardar</button>
      <button className="boton-default bg-red-400" onClick={() => router.push('./nuevo')}>Cancelar</button>
      </div>
    </div>
  </div>
  );
}

export default UserForm;