"use client";

import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

interface IRegisterResponse {
  message: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [DUI, setDUI] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

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

  const Register = async () => {
    try {
      const response = await axios.post<IRegisterResponse>(
        "http://localhost:8000/usuario/registrarme",
        {
          email: email,
          password: password,
          nombre: firstName,
          apellido: lastName,
          dui: DUI,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Se registro con exito");
      router.push('/iniciar-sesion');
    } catch (error) {
      {
       alert("Error: No pudo registrarse")
      }
    }
  };

  const handleCrearCuentaOnClick = () => {
    if (password === confirmedPassword) {
      Register();
    } else {
      alert("Error: las contraseñas no coinciden");
    }
  };
  return (
    <div className="px-[125px] py-14 border w-auto h-auto">
      <div className=" px-[10px] py-6 rounded-[50px] grid grid-cols-4 gap-x-8 gap-y-6 border border-black">
        <div className="text-center col-span-4 font-bold">
          <h1>Registrarse</h1>
        </div>
        <div className="col-[2/3] flex flex-col">
          <label>Nombre</label>
          <input
            onChange={handleFirstNameOnChange}
            id="firstName"
            type="text"
            value={firstName}
          />
        </div>
        <div className="col-[3/4] flex flex-col ">
          <label>Apellido</label>
          <input onChange={handleLastNameOnChange} />
        </div>
        <div className="col-[2/3] flex flex-col ">
          <label>Correo electronico</label>
          <input onChange={handleEmailOnChange} />
        </div>
        <div className="col-[3/4] flex flex-col  ">
          <label>Documento Único de Identindad</label>
          <input onChange={handleDUIOnChange} />
        </div>
        <div className="col-[2/3] flex flex-col  ">
          <label>Contraseña</label>
          <input onChange={handlePasswordOnChange} type="password" />
        </div>
        <div className="col-[3/4] flex flex-col  ">
          <label>Confirmar contraseña</label>
          <input onChange={handleConfirmedPasswordOnChange} type="password" />
        </div>
        <div className="col-span-4 text-center">
          <button className="boton-default" onClick={handleCrearCuentaOnClick}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
