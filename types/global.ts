export interface IFecha {
  date: string;
  timezone_type: number,
  timezone: string;
}

export interface IMensaje {
  fechaEnvio: IFecha;
  contenido: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  }
}