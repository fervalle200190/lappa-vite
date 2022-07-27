import { Select } from "../components/Select";
import { ReactSVG } from "react-svg";
import "../styles/GeneralData.scss";
import LogoBack from "../assets/nav-op.svg";
import Arrow from "../assets/arrow-down-outline.svg";
import { useEffect, useState } from "react";
import { getOptions, sendForm } from "../utils";
import { useForm } from "../hooks/useForm";
import { MultiSelect } from "react-multi-select-component";

const companies = [
     {
          label: "Empresa",
          value: "emp",
     },
     {
          label: "Camionero",
          value: "ca",
     },
     {
          label: "Comisionista",
          value: "co",
     },
];

const spanishSelect = {
     allItemsAreSelected: "Todas las opciones están seleccionadas",
     clearSearch: "Limpiar busqueda",
     clearSelected: "Quitar seleccionado",
     noOptions: "No hay opciones",
     search: "Buscar",
     selectAll: "Seleccionar todos",
     selectAllFiltered: "Seleccionar todos (Filtrado)",
     selectSomeItems: "Selecciona...",
     create: "Crear",
};

export const GeneralData = () => {
     const [baseImg, setbaseImg] = useState("");
     const { formState, onInputChange } = useForm({ comercialName: "", phone: "", website: "", email: "" });
     const [transValid, setTransValid] = useState({ tipoTransporte: [], notTransport: [] });
     const [company, setCompany] = useState([]);
     const [items, setItems] = useState([]);
     const [noItems, setNoItems] = useState([]);
     const convertToBaseFour = (image) => {
          let reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = function () {
               let base64 = reader.result.split(",")[1];
               setbaseImg({
                    name: image.name,
                    base64,
               });
          };
     };
     const handleImage = (e) => {
          const image = new Image();
          image.src = URL.createObjectURL(e.target.files[0]);
          image.onload = function () {
               if (image.width > 100 || image.height > 100) {
                    alert("esta imagen supera la medida permitida");
                    return;
               }
               convertToBaseFour(e.target.files[0]);
          };
     };
     const handleOptions = async () => {
          const response = await getOptions();
          let tipoTransporte = response.tipo_transportista.map((kind) => ({ label: kind[1], value: kind[0] }));
          let notTransport = response.no_transporta.map((item) => ({ label: item[1], value: item[0] }));
          setTransValid({
               tipoTransporte,
               notTransport,
          });
     };
     useEffect(() => {
          handleOptions();
     }, []);
     const handleSubmit = async (e) => {
          if (e.target.matches(".save-btn")) {
               if (
                    formState.comercialName === "" ||
                    formState.phone === "" ||
                    formState.website === "" ||
                    formState.email === "" ||
                    baseImg === "" ||
                    company.length <= 0 ||
                    items.length <= 0 ||
                    noItems.length <= 0
               ) {
                    e.preventDefault();
                    // return alert("algunos campos estan vacíos");
               }
               e.preventDefault();
               const dataToSend = {
                    params: {
                         token: JSON.parse(localStorage.getItem("user")).token,
                         dev: "Lappa",
                         uid: JSON.parse(localStorage.getItem("user")).uid,
                         model: "trans.transportista",
                         accion: "write",
                         Id: JSON.parse(localStorage.getItem("user")).id,
                         val: {
                              trans_logo: baseImg.base64,
                              trans_logo_nombre: baseImg.name,
                              trans_nombre: formState.comercialName,
                              trans_telefono: formState.phone,
                              trans_pagina_web: formState.website,
                              trans_email: formState.email,
                              trans_tipo_ent: company[0].value, //emp: empresa, ca: camionero, co: comisionista,
                              tipo_transportista: items.map((item) => item.value),
                              no_transporta: noItems.map((noItem) => noItem.value),
                         },
                    },
               };
               console.log(dataToSend);
               const res = await sendForm(dataToSend);
               if (res.result.datos[0].status) {
                    alert("Los datos han sido actualizados correctamente");
               }
          }
     };
     return (
          <div className="general-data-container">
               <h1 className="data-title">Datos Generales</h1>

               <form className="form-container-general" onClick={handleSubmit}>
                    <label>
                         Nombre comercial
                         <input
                              type="text"
                              name="comercialName"
                              id="comercial"
                              value={formState.comercialName}
                              onChange={onInputChange}
                              className="input-general"
                         />
                    </label>
                    <label>
                         Teléfono
                         <input
                              type="text"
                              name="phone"
                              id="phone"
                              className="input-general"
                              value={formState.phone}
                              onChange={onInputChange}
                         />
                    </label>
                    <label>
                         Página web
                         <input
                              type="text"
                              name="website"
                              id="website"
                              className="input-general"
                              value={formState.website}
                              onChange={onInputChange}
                         />
                    </label>
                    <label>
                         Correo electrónico
                         <input
                              type="email"
                              name="email"
                              id="email"
                              className="input-general"
                              value={formState.email}
                              onChange={onInputChange}
                         />
                    </label>
                    <label style={{ position: "relative" }}>
                         Tipo de empresa
                         <MultiSelect
                              className="multi-select"
                              options={companies}
                              hasSelectAll={false}
                              disableSearch={true}
                              onChange={setCompany}
                              value={company}
                              overrideStrings={spanishSelect}
                         />
                         <span style={{ fontSize: ".6rem", position: "absolute", bottom: "-15px" }}>
                              *Por favor seleccionar solo una opción
                         </span>
                    </label>
                    <label>
                         Tipo de transporte
                         <MultiSelect
                              className="multi-select"
                              options={transValid.tipoTransporte}
                              onChange={setItems}
                              value={items}
                              overrideStrings={spanishSelect}
                         />
                    </label>
                    <label>
                         Elementos que no transporta
                         <MultiSelect
                              className="multi-select"
                              overrideStrings={spanishSelect}
                              options={transValid.notTransport}
                              onChange={setNoItems}
                              value={noItems}
                         />
                    </label>
                    <div className="upload-container">
                         <label>
                              Insignia de la empresa
                              <div className="upload-btn">
                                   Subir logo
                                   <ReactSVG src={Arrow} />
                              </div>
                              <input type="file" style={{ display: "none" }} onChange={handleImage} />
                         </label>
                         <span className="upload-legend">
                              Subir en fondo blanco y en tamaño máximo de 100px x 100px
                         </span>
                    </div>
                    <div className="save-btn-container">
                         <input type="submit" value="guardar" className="save-btn" />
                    </div>
               </form>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
