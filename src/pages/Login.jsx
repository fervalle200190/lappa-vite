import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { AuthContext } from "../context/AuthContext";
import LappaLogo from '../assets/LAPPA_LOGO_VECTOR.svg'
import Logo from "../assets/logo.svg";
import "../styles/Login.scss";

const initialForm = {
     mix: "",
     password: "",
};

export const Login = () => {
     const [loginForm, setLoginForm] = useState(initialForm);
     const { firstToken, error } = useContext(AuthContext);
     const [isFetching, setIsFetching] = useState(false);

     const handleForm = (e) => {
          setLoginForm({
               ...loginForm,
               [e.target.name]: e.target.value,
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          let dataToSend = {
               params: {
                    user: loginForm.mix,
                    pass: loginForm.password,
                    dev: "Lappa",
               },
          };
          setIsFetching(true);
          let res = await firstToken(dataToSend);
          setIsFetching(res);
     };
     return (
          <div className="inner-main">
               <div className="big-container">
                    <img src={LappaLogo} style={{width:'100%', maxWidth: '400px'}}/>
                    <form className="login-form" onSubmit={handleSubmit}>
                         <label>
                              Correo Electrónico | Celular
                              <input
                                   type="text"
                                   name="mix"
                                   onChange={handleForm}
                                   value={loginForm.mix}
                              />
                         </label>
                         <label>
                              Contraseña
                              <input
                                   type="password"
                                   name="password"
                                   onChange={handleForm}
                                   value={loginForm.password}
                              />
                         </label>
                         {error && (
                              <p className="error-message">
                                   contraseña o usuario invalido
                              </p>
                         )}
                         <input
                              type="submit"
                              disabled={isFetching}
                              className="login-btn"
                              value="Ingresar"
                         />
                         <Link to="/recuperar">Olvidé mi usuario</Link>
                    </form>
               </div>
          </div>
     );
};
