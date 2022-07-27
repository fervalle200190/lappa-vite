import { useEffect, useState } from "react";

export const LocationSelect = ({ search, setSearch, handleChange, url, name }) => {
     const [locations, setLocations] = useState([]);
     const [onSelected, setOnSelected] = useState(false);
     const handleSearch = (e) => {
          setOnSelected(false);
          setSearch(e.target.value);
     };

     useEffect(() => {
          if (search !== "" && !onSelected) {
               fetch(url)
                    .then((res) => {
                         return res.json();
                    })
                    .then((res) => {
                         setLocations(res);
                    });
          }
     }, [search]);
     return (
          <label style={{ position: "relative" }}>
               { name }
               <input
                    type="text"
                    name="location"
                    id="location"
                    onChange={(e) => {
                         handleSearch(e);
                    }}
                    value={search}
               />
               <div
                    className={`options-container height-fixed ${
                         search.length === 0 || onSelected ? "" : "show-select"
                    }`}
                    style={{ bottom: "-100px" }}
               >
                    {locations.length > 0 ? (
                         locations.map((location) => (
                              <div
                                   onClick={() => {
                                        handleChange({
                                             target: { name: "location", value: `${location.id}` },
                                        });
                                        setOnSelected(true);
                                        setSearch(location.name);
                                   }}
                                   key={location.id}
                              >
                                   {location.name}
                              </div>
                         ))
                    ) : (
                         <div>No hay nada para mostrar</div>
                    )}
               </div>
          </label>
     );
};
