import { BillingItem } from "../components/BillingItem";
import '../styles/Billing.scss'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ReactSVG } from 'react-svg'
import LogoBack from '../assets/nav-op.svg'


export const Billing = () => {
     const { data } = useContext(AuthContext)
     return (
          <div className="billing-container">
               <h1 className="billing-title">Facturación</h1>
               <div className="billings-container">
                    {data.billing? data.billing.map((bill, index) => (
                         <BillingItem key={bill.name} bill={bill} index={index + 1} />
                    )): "No hay datos para mostrar"}
               </div>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
