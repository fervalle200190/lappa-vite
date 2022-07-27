import "../styles/Security.scss";
import { useEffect, useState } from "react";
import { changeMail } from "../utils";
import { ReactSVG } from 'react-svg'
import LogoBack from '../assets/nav-op.svg'


export const Security = () => {
     const dataTosend = {
          params: {
               token: JSON.parse(localStorage.getItem("user")).token,
               dev: "Lappa",
               UID: JSON.parse(localStorage.getItem("user")).id,
               Id: JSON.parse(localStorage.getItem("user")).id,
               model: "res.users",
               accion: "exe",
          },
     };
     const [email, setEmail] = useState({ email: "", newEmail: "", passwordEmail: "" });
     const [password, setPassword] = useState({ password: "", newPassword: "", repeatNewPassword: "" });
     const [error, setError] = useState(false);
     const handleNewEmail = async (e) => {
          e.preventDefault();
          if (email.email === "" || email.newEmail === "" || email.passwordEmail === "") return;
          const emailData = {
               ...dataTosend,
               params: {
                    ...dataTosend.params,
                    val: {
                         user_actual: email.email,
                         user_nuevo: email.newEmail,
                         pass_actual: email.passwordEmail,
                    },
                    funcion: "CambiarMail",
               },
          };
          console.log(emailData, "params-email");
          let res = await changeMail(emailData);
          if(res.result.datos) {
               alert(res.result.datos)
          }
     };
     const handleEmailChange = (e) => {
          setEmail({
               ...email,
               [e.target.name]: e.target.value,
          });
     };
     const handlePasswordChange = (e) => {
          setPassword({
               ...password,
               [e.target.name]: e.target.value,
          });
     };
     useEffect(() => {
          if(password.newPassword !== password.repeatNewPassword) {
               setError(true)
          } else {
               setError(false)
          }
     }, [password.repeatNewPassword])
     
     const handleNewPassword = async (e) => {
          e.preventDefault();
          if(password.newPassword !== password.repeatNewPassword) return
          let regex = /[a-zA-Z]+\.[0-9]+/i
          if(regex.test(password.newPassword) === false) return
          const passwordData = {
               ...dataTosend,
               params: {
                    ...dataTosend.params,
                    val: {
                         pass_actual: password.password,
                         pass_nueva: password.newPassword,
                    },
                    funcion: "CambiarContrasenia",
               },
          };
          let res = await changeMail(passwordData);
          if(res.result.datos) {
               alert(res.result.datos)
          }
     };

     return (
          <div className="security-container">
               <h1 className="security-title">Seguridad</h1>
               <form className="form-container-security" onSubmit={handleNewEmail}>
                    <label>
                         Correo electrónico actual
                         <input type="text" name="email" id="email" onChange={handleEmailChange} value={email.email} />
                    </label>
                    <label>
                         Correo electrónico nuevo
                         <input
                              type="text"
                              name="newEmail"
                              id="newemail"
                              onChange={handleEmailChange}
                              value={email.newEmail}
                         />
                    </label>
                    <label>
                         Contraseña
                         <input
                              type="text"
                              name="passwordEmail"
                              id="repeatemail"
                              onChange={handleEmailChange}
                              value={email.passwordEmail}
                         />
                    </label>
                    <div className="btn-security">
                         <button>Guardar cambios</button>
                    </div>
               </form>
               <form className="form-container-security snd-form" onSubmit={handleNewPassword}>
                    <label>
                         Clave actual
                         <input
                              type="text"
                              name="password"
                              id="password"
                              minLength={8}
                              value={password.password}
                              onChange={handlePasswordChange}
                         />
                    </label>
                    <label>
                         Clave nueva
                         <input
                              type="text"
                              name="newPassword"
                              id="newPassword"
                              minLength={8}
                              value={password.newPassword}
                              onChange={handlePasswordChange}
                         />
                         <span style={{fontSize: ".6rem"}}>*la clave debe tener mínimo 8 caracteres, una mayúscula y un número</span>
                    </label>
                    <label style={{position: "relative"}}>
                         Confirmar clave nueva
                         <input
                              type="text"
                              name="repeatNewPassword"
                              id="repeatNewPassword"
                              minLength={8}
                              value={password.repeatNewPassword}
                              onChange={handlePasswordChange}
                         />
                         {error && <span style={{color: "#c00", fontSize: '.6rem', position: "absolute", bottom: "-15px"}}>las contraseñas no coinciden</span>}
                    </label>
                    <div className="btn-security">
                         <button>Guardar cambios</button>
                    </div>
               </form>
               <ReactSVG src={LogoBack} className='back-icon' />
          </div>
     );
};
