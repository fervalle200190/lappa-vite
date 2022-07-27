import { useState } from "react";
import Arrow from "../assets/flecha.svg";
import "../styles/Select.scss";
import { ReactSVG } from "react-svg";

export const Select = ({ options, onInputChange, name }) => {
     const [show, setShow] = useState("");
     const [selected, setSelected] = useState("");
     const handleClick = () => {
          if (show === "show-select") {
               setShow("");
          } else {
               setShow("show-select");
          }
     };
     return (
          <div className="select-container" onClick={handleClick}>
               <div className={`upper-input`} style={{ paddingLeft: 15, alignItems: "center", display: "flex" }}>
                    {selected}
                    <div className={`options-container ${show}`}>
                         {options &&
                              options.map((option, i) => (
                                   <option
                                        key={i}
                                        value={option[0]}
                                        onClick={() => {
                                             onInputChange({ target: { name, value: option[0] } });
                                             setSelected(option[1]);
                                        }}
                                        style={{ cursor: "pointer" }}
                                   >
                                        {option[1]}
                                   </option>
                              ))}
                    </div>
               </div>
          </div>
     );
};
