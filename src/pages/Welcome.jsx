import '../styles/Welcome.scss'
import { ReactSVG } from 'react-svg'
import LogoBack from '../assets/nav-op.svg'


export const Welcome = () => {
  return (
    <div className="welcome-page">
        <h1 className='main-title'>Bienvenido a Lappa</h1>
        <div className='info-container'>
            <p>Estimado/a transportista, usted ha ingresado a la plataforma de gestión de datos personales de Lappa. Desde aquí podrá:</p>
            <ul className='ul-container'>
                <li>Modificar los datos generales de su empresa.</li>
                <li>Modificar los datos fiscales y de facturación o fiscales.</li>
                <li>Generar un alta, una baja o modificar los datos de las localidades por donde el transporte tiene parada. </li>
                <li>Suscribirse a la membrecía plus.</li>
                <li>Descargar los comprobantes fiscales antiguos.</li>
            </ul>
        </div>
        <ReactSVG src={LogoBack} className='back-icon'  />
    </div>
  )
}
