import { deleteAuthentication, retrieveAuthentication } from "@/utils/authentication";
import { Routes } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const unprotectedRoutes = ['/iniciar-sesion', '/registrarme'];
const commonProtectedRoutes = [...unprotectedRoutes, '/perfil', '/cambiar-contrasenia'];
const adminProtectedRoutes = [...commonProtectedRoutes, '/usuarios', '/consultar-asesorias'];
const asesorProtectedRoutes = [...commonProtectedRoutes, '/asesorias-sin-asesor', '/chats'];
const clienteProtectedRoutes = [...commonProtectedRoutes, '/chats'];

const useProtectedRoutes = () => {
  const pathname = usePathname()
  const router = useRouter();

  useEffect(() => {
    const authentication = retrieveAuthentication();
    if(authentication){
      const role = authentication.role;
      let shouldSeeIt = false;
      switch(role){
        case 'Administrador': {
          for(const route of adminProtectedRoutes){
            if(pathname.startsWith(route) || pathname === '/'){
              shouldSeeIt = true;
              break;
            }
          }
          break;
        }
        case 'Asesor': {
          for(const route of asesorProtectedRoutes){
            if(pathname.startsWith(route) || pathname === '/'){
              shouldSeeIt = true;
              break;
            }
          }
          break;
        }
        case 'Cliente': {
          for(const route of clienteProtectedRoutes){
            if(pathname.startsWith(route) || pathname === '/'){
              shouldSeeIt = true;
              break;
            }
          }
          break;
        }
        default: {
          deleteAuthentication();
        }
      }
      if(!shouldSeeIt){
        router.push(Routes.HOME);
      }
    }else{
      if(!unprotectedRoutes.includes(pathname)){
        router.push(Routes.LOGIN);
      }
    }
  }, [pathname, router])
}

export default useProtectedRoutes