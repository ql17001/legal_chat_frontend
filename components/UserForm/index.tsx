import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";

interface UserIUserFormProperties {
    id?: number;
}

interface ICreateUsuarioResponse {
  message: string;
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
const [role, setRole] = useState<string>("Client");

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

  const createUsuario = async () => {
    try {
      const response = await axios.post<ICreateUsuarioResponse>('/usuario', {
        nombre: {firstName},
        apellido:{lastName},
        email:{email},
        dui:{DUI},
        password:{password},
        passwordConfirmado:{confirmedPassword},
        rol:{role}
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data.message)
    } catch (error) {
      if(isAxiosError(error)){
        console.log('Error de axios', error)
      }else{
        console.log('Otro error', error)
      }
    }
  }

const handleGuardarOnClick = () =>{
  if(id == undefined){
    createUsuario();
  }else{
    updateUsuario();
  }
  


}
  

  const updateUsuario = async () => {
    try {
      const response = await axios.put<IUpdateUsuarioResponse>('/usuario/1', {
        nombre: {firstName},
        apellido:{lastName},
        email:{email},
        dui:{DUI},
        password:{password},
        passwordConfirmado:{confirmedPassword},
        rol:{role}
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      console.log('Message:', response.data.message)

      console.log('Data:', response.data.data)
    } catch (error) {
      if(isAxiosError(error)){
        console.log('Error de axios', error)
      }else{
        console.log('Otro error', error)
      }
    }
  }

  return (
    <div className="px-[125px] py-14 w-auto h-auto">
    <div className="px-[10px] py-6 grid grid-cols-4 gap-x-8 gap-y-6">
      <div className="text-center col-span-4 font-bold">
        <h1>Crear/Editar usuario</h1>
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
      <div className="col-span-4 flex flex-row justify-center items-center">
      <button className="boton-default bg-green-400" onClick={handleGuardarOnClick}>Guardar</button>
      <button className="boton-default bg-red-400" onClick={() => router.push('./nuevo')}>Cancelar</button>
      </div>
    </div>
  </div>
  );
}

export default UserForm;