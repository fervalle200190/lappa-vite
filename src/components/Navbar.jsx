import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.scss'

export const Navbar = () => {
    const { handleClick } = useContext(AuthContext)
     return (
          <div className="menu-big-container">
               <div className="open-icon-container" onClick={handleClick}>
                    <ion-icon name="menu-outline"></ion-icon>
               </div>
          </div>
     );
};
