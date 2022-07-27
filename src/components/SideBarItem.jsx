import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const SideBarItem = ({ name, url }) => {
     const { logOut } = useContext(AuthContext);
     let activeLink = {
          underline: "none",
          background: "#eabe3f",
     };
     const checkLog = () => {
          if (name === "salir") {
               logOut();
          }
     };
     return (
          <>
               {name === "salir" ? (
                    <Link to={`/`} className="navbar-item" onClick={checkLog}>
                         {name}
                    </Link>
               ) : (
                    <NavLink
                         to={url}
                         className="navbar-item"
                         style={({ isActive }) => (isActive ? activeLink : undefined)}
                         onClick={checkLog}
                    >
                         {name}
                    </NavLink>
               )}
          </>
     );
};
