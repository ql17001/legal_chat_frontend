
const HomeAdmin = () => {
    return(
        <div className="px-[125px] py-7 w-auto h-auto flex flex-col">
            <div className='self-center'>
                <h1 className='text-2xl font-bold'>Inicio</h1>
            </div>
            <div className='self-center py-7'>
                <p>LegalChat es un servicio para realizar consultas de indole legal a nuestros<br></br> 
                    asesores. Como administrador puede:
                </p>
            </div>
            <div className='self-center '>
                <ul className='list-disc'>
                    <li>Consultar los usuarios del sistema.</li>
                    <li>Consultar las asesorias registradas en el sistema.</li>
                </ul>
            </div>
        </div>
    )
}
export default HomeAdmin