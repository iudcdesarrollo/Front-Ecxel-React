import { useState } from 'react';
import '../css/Navbar.css';

/**
 * The Navbar component in JavaScript React toggles a menu open and closed when a button is clicked.
 * @returns The `Navbar` component is being returned. It consists of a navigation bar with a logo, a
 * menu button that toggles the visibility of the navigation links, and two navigation links for "Home"
 * and "Auth".
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <img src="/path/to/logo.png" alt="Universitaria de Colombia" className="logo" /> */}
        <p>Inovaccion IA Call Center</p>
      </div>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="#home" className="nav-link">Home</a>
        <a href="#auth" className="nav-link">Auth</a>
      </div>
    </nav>
  );
};

export default Navbar;