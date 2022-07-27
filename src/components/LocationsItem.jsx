import NavIcon from "../assets/nav.svg";
import { ReactSVG } from 'react-svg'

export const LocationsItem = ({ location }) => {
     return (
          <li className="location-flex">
               <ReactSVG src={NavIcon} />
               {location.name}
          </li>
     );
};
