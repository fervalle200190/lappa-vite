import { useEffect, useState } from "react";
import {
     checkToken,
     getBills,
     getDriver,
     getLocations,
     getToken,
} from "../utils";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
     const [isOpen, setIsOpen] = useState("");
     const [isLogged, setIsLogged] = useState(false);
     const [error, setError] = useState(false);
     const [data, setData] = useState({});
     const handleClick = () => {
          if (isOpen === "") {
               setIsOpen("show-nav");
          } else {
               setIsOpen("");
          }
     };

     const updateData = async (response) => {
          const dataToSend = {
               params: {
                    token: response.result.token,
                    dev: "Lappa",
                    uid: response.result.UID,
                    model: "trans.transportista",
                    accion: "read",
                    dominio: [["ejecutor", "=", response.result.UID]],
               },
          };
          let dataResponse = await getDriver(dataToSend);
          let info = JSON.parse(localStorage.getItem("user"));
          info = {
               ...info,
               id: dataResponse.result.datos[0][0].id,
          };
          localStorage.setItem("user", JSON.stringify(info));
          const dataToLocations = {
               ...dataToSend,
               params: {
                    ...dataToSend.params,
                    model: "trans.punto_retiro",
                    dominio: [
                         [
                              "id",
                              "=",
                              dataResponse.result.datos[0][0].trans_pto_retiro,
                         ],
                    ],
               },
          };
          let locationResponse = await getLocations(dataToLocations);
          let locations = locationResponse.result.datos.map((location) => ({
               name: location[0].display_name,
               coor: location[0].pr_coordenadas,
          }));
          const dataToBilling = {
               params: {
                    token: response.result.token,
                    dev: "Lappa",
                    uid: response.result.UID,
                    model: "asw.comprobante",
                    accion: "read_sudo",
                    Ids: [33, 25],
               },
          };
          const billingResponse = await getBills(dataToBilling);
          setData({
               ...data,
               locations,
               billing: billingResponse.result.datos.map((bill, index) => {
                    let newInfo;
                    bill.forEach((info) => {
                         newInfo = {
                              id: info.id,
                              tipo: info.tipo_comprobante_lappa,
                              name: info.display_name,
                         };
                    });
                    return newInfo;
               }),
          });
     };

     const firstToken = async (form) => {
          let response = await getToken(form);
          if (response.error) {
               setError(true);
               return false;
          }
          if (response.result.token === "000000000000000") {
               alert('Datos incorrectos')
               return false;
          }
          if (!response.result) {
               return false;
          }
          localStorage.setItem(
               "user",
               JSON.stringify({
                    token: response.result.token,
                    uid: response.result.UID,
               })
          );
          setIsLogged(true);
          setError(false);
          updateData(response);
          return false;
     };

     const validateLogged = async (token) => {
          let newDataToken = {
               params: {
                    token,
                    dev: "Lappa",
               },
          };
          let response = await checkToken(newDataToken);
          if (response.result.status === "ERROR") {
               setIsLogged(false);
               localStorage.removeItem("user");
               return;
          }
          if (!response.result) {
               return;
          }
          localStorage.setItem(
               "user",
               JSON.stringify({
                    token: response.result.token,
                    uid: response.result.UID,
               })
          );
          setIsLogged(true);
          updateData(response);
     };

     const logOut = () => {
          localStorage.removeItem("user");
          setIsLogged(false);
     };

     useEffect(() => {
          if (localStorage.getItem("user") !== null) {
               validateLogged(JSON.parse(localStorage.getItem("user")).token);
          }
     }, []);

     const stuff = {
          handleClick,
          isOpen,
          isLogged,
          firstToken,
          logOut,
          error,
          data,
     };

     return (
          <AuthContext.Provider value={stuff}>{children}</AuthContext.Provider>
     );
};
