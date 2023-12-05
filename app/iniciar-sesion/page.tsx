"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { persistAuthentication } from '@/utils/authentication';
import { Routes } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";

interface ILoginResponse {
  token: string;
  refreshToken: string;
}

interface ILoginBody{
  username: string;
  password: string;
}

const LoginPage = () =>{
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    };
    const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post<ILoginResponse, AxiosResponse<ILoginResponse>,ILoginBody>(`${process.env.NEXT_PUBLIC_API}/login`,{
          username: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" }
        });

        const {roles, username} = jwtDecode<{roles:string[], username: string}>(response.data.token);

        persistAuthentication({
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          role: roles[0],
          email: username
        });

        router.push(Routes.HOME);


      }catch(error){
        if(isAxiosError(error)){console.log("Ocurrió un error axios ", error);
        alert(error);
        }else{console.log("Ocurrio un error ", error);}
      }
    };

    return(
        <div className="px-[125px] py-14 w-auto h-auto">
      <div className=" px-[10px] py-6 grid grid-cols-4 gap-x-8 gap-y-6">
        <div className="text-center col-span-4 font-bold">
          <h1>Iniciar Sesión</h1>
        </div>
        <div className="col-span-2 sm:col-span-4 flex flex-col mx-auto">
          <label>Correo electronico</label>
          <input onChange={handleEmailOnChange} />
        </div>
        <div className="col-span-2 sm:col-span-4 flex flex-col mx-auto">
          <label>Contraseña</label>
          <input onChange={handlePasswordOnChange} type="password" />
        </div>
        <div className="col-span-4 text-center">
          <button className="boton-default" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
    );
}
export default LoginPage;