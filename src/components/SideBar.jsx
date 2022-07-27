import { LappaLogo } from "./LappaLogo";
import { SideBarItem } from "./SideBarItem";
import "../styles/SideBar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const sideBarOptions = [
     {
          name: "datos generales",
          url: "/datos-generales",
     },
     {
          name: "datos fiscales",
          url: "/datos-fiscales",
     },
     {
          name: "localidades",
          url: "/localidades",
     },
     {
          name: "lappa plus",
          url: "/lappa-plus",
     },
     {
          name: "facturación",
          url: "/facturacion",
     },
     {
          name: "seguridad",
          url: "/seguridad",
     },
     {
          name: "salir",
          url: "/",
     },
];

export const SideBar = () => {
     const { isOpen, handleClick } = useContext(AuthContext)
     return (
          <>
               <nav className={`navbar-container ${isOpen}`}>
                    <div className="close-icon-container">
                         <ion-icon name="close-outline" onClick={handleClick}></ion-icon>
                    </div>
                    <Link to={`/`}>
                         <LappaLogo />
                    </Link>
                    <div className="items-container">
                         {sideBarOptions.map((sideBarOption) => (
                              <SideBarItem key={sideBarOption.name} {...sideBarOption} />
                         ))}
                    </div>
               </nav>
          </>
     );
};
