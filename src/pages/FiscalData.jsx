import { ReactSVG } from "react-svg";
import "../styles/FiscalData.scss";
import LogoBack from "../assets/nav-op.svg";
import Arrow from "../assets/arrow-down-outline.svg";
import { useState } from "react";
import { sendForm } from "../utils";
import { useForm } from "../hooks/useForm";

export const FiscalData = () => {
     const [file64, setFile64] = useState("");
     const { formState, onInputChange } = useForm({
          costumerName: "",
          iva: "",
          cuit: "",
          domicilio: "",
          provincia: "",
     });
     const convertToBaseFour = (file) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
               let base64 = reader.result.split(",")[1];
               setFile64({
                    file: base64,
                    name: file.name,
               });
          };
     };
     const handleFile = (e) => {
          convertToBaseFour(e.target.files[0]);
     };

     const handleSubmit = async (e) => {
          if (e.target.matches(".form-container-fiscal" || e.target.matches(".save-btn"))) {
               if (
                    formState.costumerName === "" ||
                    formState.iva === "" ||
                    formState.cuit === "" ||
                    formState.domicilio === "" ||
                    formState.provincia === "" ||
                    file64 === ""
               ) {
                    e.preventDefault();
                    return alert("Faltan algunos datos");
               }
               e.preventDefault()
               const dataToSend = {
                    params: {
                         token: JSON.parse(localStorage.getItem("user")).token,
                         dev: "Lappa",
                         model: "trans.transportista",
                         accion: "write",
                         Id: JSON.parse(localStorage.getItem("user")).id,
                         val: {
                              cliente_nombre: formState.costumerName,
                              condicion_iva: formState.iva,
                              fac_doc: formState.cuit, //minlength 6
                              trans_domicilio: formState.domicilio,
                              probincia: formState.provincia,
                              constancia_afip_contenido: file64.file,
                              constancia_afip_nombre: file64.name,
                         },
                    },
               };
               const response = await sendForm(dataToSend);
               if (response.result.datos[0].status) {
                    alert("Los datos han sido actualizados correctamente")
               }
          }
     };
     return (
          <div className="general-data-container">
               <h1 className="data-title">Datos Fiscales</h1>

               <form className="form-container-fiscal" onSubmit={handleSubmit}>
                    <label>
                         Razon Social a facturar
                         <input
                              type="text"
                              name="costumerName"
                              value={formState.costumerName}
                              onChange={onInputChange}
                              id="comercial"
                         />
                    </label>
                    <label>
                         Condición ante IVA
                         <input type="text" name="iva" value={formState.iva} onChange={onInputChange} id="iva" />
                    </label>
                    <label>
                         Cuit
                         <input
                              type="text"
                              name="cuit"
                              value={formState.cuit}
                              minLength={6}
                              onChange={onInputChange}
                              id="cuit"
                         />
                    </label>
                    <label>
                         Domicilio
                         <input
                              type="text"
                              name="domicilio"
                              value={formState.domicilio}
                              onChange={onInputChange}
                              id="domicilio"
                         />
                    </label>
                    <label>
                         Provincia
                         <input
                              type="text"
                              name="provincia"
                              value={formState.provincia}
                              onChange={onInputChange}
                              id="provincia"
                         />
                    </label>
                    <div className="upload-container">
                         <label>
                              Adjuntar constancia de inscripción de AFIP
                              <div className="upload-btn">
                                   Subir
                                   <ReactSVG src={Arrow} />
                              </div>
                              <input type="file" style={{ display: "none" }} onChange={handleFile} />
                         </label>
                    </div>
                    <div className="save-btn-container">
                         <input type="submit" value="guardar" className="save-btn" />
                    </div>
               </form>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
