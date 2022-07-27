import "../styles/FormToken.scss";

export const FormToken = ({ setSecondToken, secondToken, handleToken }) => {
    const handleChange = (e)=> {
        setSecondToken({
            ...secondToken,
            [e.target.name]: e.target.value
        })
    }
     return (
          <div className="inner-box">
               <div className="lock-container">
                    <ion-icon name="lock-closed"></ion-icon>
               </div>
               <h1 className="token-title">Introduce el código enviado y la nueva contraseña</h1>
               <form style={{display: "flex",flexDirection: "column",gap: "20px"}} onSubmit={handleToken}>
                    <label className="input-container input-label" style={{position: "relative"}}>
                         Nueva contraseña
                         <input
                              type="text"
                              name="pass"
                              onChange={handleChange}
                              value={secondToken.pass}
                              className="input-token"
                              minLength={8}
                         />
                         <span style={{fontSize: ".6rem", position: "absolute", bottom: "-12px"}}>*la clave debe tener mínimo 8 caracteres, una mayúscula y un número</span>
                    </label>
                    <label className="input-container input-label">
                         Código
                         <input
                              type="text"
                              name="codigo"
                              onChange={handleChange}
                              value={secondToken.codigo}
                              className="input-token"
                         />
                    </label>
                    <button type="submit">Confirmar</button>
               </form>
          </div>
     );
};
