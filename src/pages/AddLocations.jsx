import "../styles/AddLocations.scss";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import LogoBack from "../assets/nav-op.svg";
import { LocationSelect } from "../components/LocationSelect";
import { sendForm } from "../utils";
import { useForm } from "../hooks/useForm";

const days = [
     "Lunes",
     "Martes",
     "Miercoles",
     "Jueves",
     "Viernes",
     "Sabado",
     "Domingo",
];

export const AddLocations = () => {
     const [search, setSearch] = useState("");
     const [activeDays, setActiveDays] = useState({});
     const [error, setError] = useState({ phone: false, cellphone: false });
     const { formState, onInputChange } = useForm({
          address: "",
          phone: "",
          cellphone: "",
          delivery: false,
          pickUp: false,
          elevator: false,
     });

     const handleSubmit = async (e) => {
          if (e.target.matches(".add-btn")) {
               if (
                    formState.address == "" ||
                    formState.phone == "" ||
                    formState.cellphone == "" ||
                    formState.delivery == "" ||
                    formState.location == "" ||
                    formState.pickUp == "" ||
                    formState.elevator == ""
               ) {
                    e.preventDefault();
                    setError({
                         ...error,
                         cellphone: formState.phone === "",
                         phone: formState.cellphone === ""
                    });

                    return alert("Faltan algunos datos");
               }
               e.preventDefault();
               let daysSelected = [];
               for (const day in activeDays) {
                    if (activeDays[day]) {
                         daysSelected.push(day.toString());
                    }
               }
               const dataToSend = {
                    params: {
                         token: JSON.parse(localStorage.getItem("user")).token,
                         dev: "Lappa",
                         uid: JSON.parse(localStorage.getItem("user")).id,
                         model: "trans.transportista",
                         accion: "exe",
                         Id: 1,
                         val: {
                              pr_localidad: formState.location,
                              dias_arribo: daysSelected,
                              pr_direccion: formState.address,
                              entrega_domicilio: formState.delivery,
                              retira_domicilio: formState.pickUp,
                              celular: formState.cellphone,
                              pr_telefono: formState.phone,
                              autoelevador: formState.elevator,
                         },
                         funcion: "AgregarPuntoRetiroWEB",
                    },
               };
               const response = await sendForm(dataToSend);
               if (response.result.datos) {
                    alert("Datos actualizados correctamente");
               }
          }
     };
     return (
          <div className="add-location-container">
               <h1 className="location-title">Localidades</h1>
               <form
                    className="form-container-add-locations"
                    onClick={handleSubmit}
               >
                    <LocationSelect
                         search={search}
                         setSearch={setSearch}
                         handleChange={onInputChange}
                         name={"Localidad"}
                         url={`https://validacion.hgtsa.com.ar/lappa/localidades/sugerenciaget?localidad=${search}`}
                    />
                    <label>
                         Domicilio
                         <input
                              type="text"
                              name="address"
                              id="house"
                              onChange={onInputChange}
                              value={formState.address}
                         />
                    </label>
                    <label>
                         <b className={`${error.cellphone ? "error-red" : ""}`}>
                              Celular
                         </b>
                         <div className="extra-container">
                              <input
                                   type="number"
                                   name="cellphone"
                                   onChange={onInputChange}
                                   value={formState.cellphone}
                                   id="cellphone"
                              />
                              <span>Sin 0 ni 15</span>
                         </div>
                    </label>
                    <label>
                         <b className={`${error.phone ? "error-red" : ""}`}>
                              Teléfono fijo
                         </b>
                         <input
                              type="number"
                              name="phone"
                              id="phone"
                              value={formState.phone}
                              onChange={onInputChange}
                         />
                    </label>
                    <label>
                         Días de arribo a la localidad
                         <div
                              className="checks-container"
                              onChange={(e) =>
                                   setActiveDays({
                                        ...activeDays,
                                        [e.target.name]: e.target.checked,
                                   })
                              }
                         >
                              {days.map((day) => (
                                   <label key={day}>
                                        {day}
                                        <input
                                             type="checkbox"
                                             value={day}
                                             name={day}
                                             className={"checkbox"}
                                        />
                                   </label>
                              ))}
                         </div>
                    </label>
                    <label>
                         Entrega a domicilio
                         <div
                              className="radios-container"
                              onChange={onInputChange}
                         >
                              <label>
                                   Si
                                   <input
                                        type="radio"
                                        name="delivery"
                                        value={true}
                                        className="radio-check"
                                   />
                              </label>
                              <label>
                                   No
                                   <input
                                        type="radio"
                                        name="delivery"
                                        value={false}
                                        className="radio-check"
                                        defaultChecked
                                   />
                              </label>
                         </div>
                    </label>
                    <label>
                         Retira a domicilio
                         <div
                              className="radios-container"
                              onChange={onInputChange}
                         >
                              <label>
                                   Si
                                   <input
                                        type="radio"
                                        name="pickUp"
                                        value={true}
                                        className="radio-check"
                                   />
                              </label>
                              <label>
                                   No
                                   <input
                                        type="radio"
                                        name="pickUp"
                                        value={false}
                                        className="radio-check"
                                        defaultChecked
                                   />
                              </label>
                         </div>
                    </label>
                    <label>
                         Cuenta con autoelevador
                         <div
                              className="radios-container"
                              onChange={onInputChange}
                         >
                              <label>
                                   Si
                                   <input
                                        type="radio"
                                        name="elevator"
                                        value={true}
                                        className="radio-check"
                                   />
                              </label>
                              <label>
                                   No
                                   <input
                                        type="radio"
                                        name="elevator"
                                        value={false}
                                        className="radio-check"
                                        defaultChecked
                                   />
                              </label>
                         </div>
                    </label>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                         <button type="submit" className="add-btn">
                              Agregar
                         </button>
                    </div>
               </form>
               <ReactSVG src={LogoBack} className="back-icon" />
          </div>
     );
};
