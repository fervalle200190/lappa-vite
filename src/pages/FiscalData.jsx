import { ReactSVG } from "react-svg";
import "../styles/FiscalData.scss";
import LogoBack from "../assets/nav-op.svg";
import Arrow from "../assets/arrow-down-outline.svg";
import { useState } from "react";
import { sendForm } from "../utils";
import { useForm } from "../hooks/useForm";
import Select from "react-select";
import { LocationSelect } from "../components/LocationSelect";

const IVAOptions = [
     { label: "Consumidor final", value: "Consumidor final" },
     { label: "Responsable monotributo", value: "Responsable monotributo" },
     { label: "Responsable inscripto", value: "Responsable inscripto" },
     { label: "Exento", value: "Exento" },
];

const provincias = [
     { label: "Buenos Aires", value: "Buenos Aires" },
     {
          label: "Ciudad Autónoma de Buenos Aires",
          value: "Ciudad Autónoma de Buenos Aires",
     },
     { label: "Catamarca", value: "Catamarca" },
     { label: "Chaco", value: "Chaco" },
     { label: "Chubut", value: "Chubut" },
     { label: "Córdoba", value: "Córdoba" },
     { label: "Corrientes", value: "Corrientes" },
     { label: "Entre Ríos", value: "Entre Ríos" },
     { label: "Formosa", value: "Formosa" },
     { label: "Jujuy", value: "Jujuy" },
     { label: "La Pampa", value: "La Pampa" },
     { label: "La Rioja", value: "La Rioja" },
     { label: "Mendoza", value: "Mendoza" },
     { label: "Misiones", value: "Misiones" },
     { label: "Neuquén", value: "Neuquén" },
     { label: "Río Negro", value: "Río Negro" },
     { label: "Salta", value: "Salta" },
     { label: "San Juan", value: "San Juan" },
     { label: "San Luis", value: "San Luis" },
     { label: "Santa Cruz", value: "Santa Cruz" },
     { label: "Santa Fe", value: "Santa Fe" },
     { label: "Santiago del Estero", value: "Santiago del Estero" },
     {
          label: "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
          value: "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
     },
     { label: "Tucumán", value: "Tucumán" },
];

export const FiscalData = () => {
     const [file64, setFile64] = useState("");
     const [iva, setIva] = useState("");
     const [search, setSearch] = useState("");
     const [provincia, setProvincia] = useState("");
     const { formState, onInputChange } = useForm({
          costumerName: "",
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
          if (
               e.target.matches(
                    ".form-container-fiscal" || e.target.matches(".save-btn")
               )
          ) {
               if (
                    formState.costumerName === "" ||
                    iva === "" ||
                    formState.cuit === "" ||
                    formState.domicilio === "" ||
                    provincia === "" ||
                    file64 === ""
               ) {
                    e.preventDefault();
                    return alert("Faltan algunos datos");
               }
               e.preventDefault();
               const dataToSend = {
                    params: {
                         token: JSON.parse(localStorage.getItem("user")).token,
                         dev: "Lappa",
                         model: "trans.transportista",
                         accion: "write",
                         Id: JSON.parse(localStorage.getItem("user")).id,
                         val: {
                              cliente_nombre: formState.costumerName,
                              condicion_iva: iva.value,
                              fac_doc: formState.cuit, //minlength 6
                              trans_domicilio: formState.domicilio,
                              probincia: provincia,
                              pr_localidad: formState.location,
                              constancia_afip_contenido: file64.file,
                              constancia_afip_nombre: file64.name,
                         },
                    },
               };
               const response = await sendForm(dataToSend);
               if (response.result.datos[0].status) {
                    alert("Los datos han sido actualizados correctamente");
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
                              className="input-fiscal"
                              type="text"
                              name="costumerName"
                              value={formState.costumerName}
                              onChange={onInputChange}
                              id="comercial"
                         />
                    </label>
                    <label className="label-fixed">
                         Condición ante IVA
                         <Select
                              className="fiscal-selected"
                              defaultValue={iva}
                              onChange={setIva}
                              options={IVAOptions}
                              placeholder="Selecciona..."
                         />
                    </label>
                    <label>
                         CUIT
                         <input
                              className="input-fiscal"
                              type="number"
                              name="cuit"
                              value={formState.cuit}
                              minLength={11}
                              onChange={(e)=> {
                                   if(e.target.value.length > 11) {
                                        return
                                   }
                                   onInputChange(e)
                              }}
                              id="cuit"
                         />
                    </label>
                    <label>
                         Domicilio
                         <input
                              className="input-fiscal"
                              type="text"
                              name="domicilio"
                              value={formState.domicilio}
                              onChange={onInputChange}
                              id="domicilio"
                         />
                    </label>
                    <label>
                         Provincia
                         <Select
                              className="fiscal-selected"
                              defaultValue={provincia}
                              onChange={setProvincia}
                              options={provincias}
                              placeholder="Selecciona..."
                         />
                    </label>
                    <LocationSelect
                         search={search}
                         nameClass={"fiscal-selected"}
                         setSearch={setSearch}
                         handleChange={onInputChange}
                         name={"Localidad"}
                         url={`https://validacion.hgtsa.com.ar/lappa/localidades/sugerenciaget?localidad=${search}`}
                    />
                    <div className="upload-container">
                         <label>
                              Adjuntar constancia de inscripción de AFIP
                              <div className="upload-btn">
                                   Subir
                                   <ReactSVG src={Arrow} />
                              </div>
                              <input
                                   type="file"
                                   style={{ display: "none" }}
                                   onChange={handleFile}
                              />
                         </label>
                    </div>
                    <div className="save-btn-container">
                         <input
                              type="submit"
                              value="guardar"
                              className="save-btn"
                         />
                    </div>
               </form>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
