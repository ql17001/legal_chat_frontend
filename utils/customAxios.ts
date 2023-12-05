import axios from "axios";
import { deleteAuthentication, retrieveAuthentication } from "./authentication";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
})

customAxios.interceptors.request.use(
  (config) => {
    const authentication = retrieveAuthentication();

    if(authentication){
      const {token} = authentication;
      
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
)

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authentication = retrieveAuthentication();

    if(error.response.status === 401 && authentication){
      deleteAuthentication();
    }

    return Promise.reject(error)
  }
)

export default customAxios;