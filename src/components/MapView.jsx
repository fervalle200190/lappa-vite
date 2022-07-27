import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import '../styles/MapStyles.scss'

export const MapView = ({data}) => {
     const [markers, setMarkers] = useState([])
     useEffect(() => {
       if(data.locations) {
          setMarkers(data.locations.map((location)=> location.coor.split(",")))
       }
     }, [data])
     

     return (
          <div className="map-location">
               <MapContainer center={{lat: '-34.6063416', lng: '-58.574137'}} zoom={6} >
                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                         markers.map((mark,i)=> <Marker key={i} position={mark}/>)
                    }
               </MapContainer>
          </div>
     );
};
