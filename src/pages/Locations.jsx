import { Link } from "react-router-dom";
import { LocationsItem } from "../components/LocationsItem";
import { MapView } from "../components/MapView";
import "../styles/Locations.scss";
import { ReactSVG } from 'react-svg'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoBack from '../assets/nav-op.svg'



export const Locations = () => { 
     const { data } = useContext(AuthContext) 
     return (
          <div className="location-container">
               <h1 className="location-title">Localidades</h1>
               <p className="location-p">Localidades cargadas</p>
               <ul>
                    {data.locations? data.locations.map((ad,i) => (
                         <LocationsItem key={i} location={ad} />
                    )): <li>Esperando data</li>}
               </ul>
               <div className="location-btn-container">
                    <Link to={`/localidades/ingresar`}>
                         <button>Ingresar localidad</button>
                    </Link>
               </div>
               <MapView data={data} />
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
