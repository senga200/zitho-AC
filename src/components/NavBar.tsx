import{ useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './../styles/NavBarStyle.css';
import beerGif from './../assets/beer-cup.gif';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to={`/`}><img src={beerGif} alt="Beer Cup" className="navbar-logo-img" /></Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        {/* <li className="nav-item">
          <Link to="/" className="nav-links" onClick={toggleMenu}>
            Home
          </Link>
        </li> */}
        <li className="nav-item">
          <Link to="/beers" className="nav-links" onClick={toggleMenu}>
            Beers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/breweries" className="nav-links" onClick={toggleMenu}>
            Breweries
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
