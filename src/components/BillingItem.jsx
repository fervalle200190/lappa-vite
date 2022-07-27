import { useEffect, useState } from "react";
// import { ReactComponent as ArrowDown } from "../assets/flecha.svg";
import { getBill } from "../utils";

export const BillingItem = ({ bill, index }) => {
     const [link, setLink] = useState({link: "", down: ""})
     const handleBill = async () => {
          const dataToSend = {
               params: {
                    token: JSON.parse(localStorage.getItem("user")).token,
                    dev: "Lappa",
                    uid: JSON.parse(localStorage.getItem("user")).id,
                    model: "asw.comprobante",
                    accion: "exe",
                    Id: bill.id,
                    val: {},
                    funcion: "DescargarPDF",
               },
          };
          const response = await getBill(dataToSend);
          const url = `data:application/pdf;base64,${response.result.datos.file}`
          const fileName = response.result.datos.filename
          setLink({link: url,down: fileName})
     };
     useEffect(() => {
          handleBill();
     }, []);

     return (
          <div className={`billing-item ${index % 2 === 0 ? "clear" : ""}`}>
               <p className="billing-p">{bill.name}</p>
               <a href={link.link} download={link.down} className={"btn-down"}>
                    <button>
                         {bill.tipo}
                         {/* <ArrowDown /> */}
                    </button>
               </a>
          </div>
     );
};
