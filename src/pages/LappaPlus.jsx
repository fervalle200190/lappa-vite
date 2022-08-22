import "../styles/LappaPlus.scss";
import { ReactSVG } from "react-svg";
import { PlusBox } from "../components/PlusBox";
import LogoBack from "../assets/nav-op.svg";
import IconOne from "../assets/1.svg";
import IconTwo from "../assets/2.svg";
import IconThree from "../assets/3.svg";
import IconFour from "../assets/4.svg";
import { sendData } from "../utils";
import { useNavigate } from "react-router-dom";

const boxInfo = [
     {
          description: `informacion de cada localidadde carga del transporte`,
          icon: <ReactSVG src={IconOne} />,
     },
     {
          description: `Posicionamiento en los primeros lugares de busqueda`,
          icon: <ReactSVG src={IconTwo} />,
     },
     {
          description: `Información sobre los servicios que brinda la empresa`,
          icon: <ReactSVG src={IconThree} />,
     },
     {
          description: `Soporte técnico vía chat, whatsapp, teléfono y correo electronico.`,
          icon: <ReactSVG className="phone-icon" src={IconFour} />,
     },
];

export const LappaPlus = () => {
     const navigate = useNavigate()
     const getSuscription = async () => {
          const dataToSend = {
               params: {
                    token: JSON.parse(localStorage.getItem("user")).token,
                    dev: "Lappa",
                    uid: JSON.parse(localStorage.getItem("user")).uid,
                    model: "trans.transportista",
                    accion: "exe",
                    Id: JSON.parse(localStorage.getItem("user")).id,
                    funcion: "ComprarMembresia",
               },
          };
          const data = await sendData(dataToSend);
          console.log(data);
          location.assign(data.result.datos.url)
     };
     return (
          <div className="lappa-plus-container">
               <h1 className="plus-title">Lappa plus</h1>
               <p className="plus-p">
                    Estamos para ofrecerte la mejor experiencia, desde el mismo instante en que te registrás, y siempre
                    atendido por personas reales, no robots.
               </p>
               <div className="cards-container">
                    {boxInfo.map(({ description, icon }) => (
                         <PlusBox key={description} description={description} icon={icon} />
                    ))}
               </div>
               <div className="plus-btn-container">
                    <button onClick={getSuscription}>Suscribirse</button>
               </div>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
