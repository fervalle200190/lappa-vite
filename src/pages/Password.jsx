import { useState } from "react";
import { ReactSVG } from "react-svg";
import { resetPassword, resetPasswordToken } from "../utils";
import "../styles/Password.scss";
import { FormPassword } from "../components/FormPassword";
import { FormToken } from "../components/FormToken";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export const Password = () => {
     const [resetForm, setResetForm] = useState("");
     const [secondToken, setSecondToken] = useState({ pass: "", codigo: "" });
     const [token, setToken] = useState("");
     const [isFetching, setIsFetching] = useState(false);
     const navigate = useNavigate()
     const handleSubmit = async (e) => {
          e.preventDefault();
          setIsFetching(true)
          let res = await resetPassword({
               params: {
                    celular: resetForm,
               },
          });
          setIsFetching(false)
          if (res.error) return alert("El número no existe");
          setToken(res.result.token);
     };
     const handleToken = async (e) => {
          e.preventDefault();
          let regex = /[a-zA-Z]+\.[0-9]+/i;
          if (regex.test(secondToken.pass) === false) {
               return alert("La contraseña no cumple con los requisitos");
          }
          const data = {
               params: {
                    celular: resetForm,
                    token,
                    password: secondToken.pass,
                    codigo: secondToken.codigo,
               },
          };
          let res = await resetPasswordToken(data);
          if(res.result.mensaje) {
               alert(res.result.mensaje)
               return navigate("/")
          }
     };
     return (
          <div className="password-container">
               <Link to={"/"}>
                    <ReactSVG src={Logo} />
               </Link>
               {token === "" ? (
                    <FormPassword
                         resetForm={resetForm}
                         setResetForm={setResetForm}
                         isFetching={isFetching}
                         handleSubmit={handleSubmit}
                    />
               ) : (
                    <FormToken handleToken={handleToken} setSecondToken={setSecondToken} secondToken={secondToken} />
               )}
          </div>
     );
};
