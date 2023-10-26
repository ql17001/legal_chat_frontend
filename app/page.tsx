import Image from 'next/image'


export default function Home() {
  return (
    <main>
      Pagina inicio
      
        <input type='text' value={'input default'}/>

        <button>Boton Default</button>

        <button className=' boton-error'>Error</button>

        <button className=' boton-guardar'>Guardar</button>

        <button className='boton-editar'>Editar</button>
      

    
      

    </main>
  )
}
