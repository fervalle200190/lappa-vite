import "./App.scss";
import { Routes, Route, Navigate } from "react-router";
import { SideBar } from "./components/SideBar";
import {
     Welcome,
     GeneralData,
     FiscalData,
     Locations,
     LappaPlus,
     Billing,
     Security,
     AddLocations,
     Login,
     Password,
} from "./pages";
import { Navbar } from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
     const { isLogged } = useContext(AuthContext);
     return (
          <div className="main-container">
               {!isLogged ? (
                    <Routes>
                         <Route path="/" element={<Login />} />
                         <Route path="/recuperar" element={<Password />} />
                         <Route path="/*" element={<Navigate to={"/"} />} />
                    </Routes>
               ) : (
                    <>
                         <Navbar />
                         <SideBar />
                         <Routes>
                              <Route path="/" element={<Welcome />} />
                              <Route path="/datos-generales" element={<GeneralData />} />
                              <Route path="/datos-fiscales" element={<FiscalData />} />
                              <Route path="/localidades" element={<Locations />} />
                              <Route path="/localidades/ingresar" element={<AddLocations />} />
                              <Route path="/lappa-plus" element={<LappaPlus />} />
                              <Route path="/facturacion" element={<Billing />} />
                              <Route path="/seguridad" element={<Security />} />
                         </Routes>
                    </>
               )}
          </div>
     );
}

export default App;
