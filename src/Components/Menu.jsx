import { useState } from 'react';
import '../css/Navbar.css';
import PropTypes from 'prop-types';

const Navbar = ({ onSelectView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <p>Inovaccion IA Call Center</p>
      </div>
      <div className="menu-button" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={() => onSelectView('CallCenter')} className="nav-link">Call Center</button>
        <button onClick={() => onSelectView('IPS')} className="nav-link">IPS</button>
        <button onClick={() => onSelectView('Veterinaria')} className="nav-link">Veterinaria</button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onSelectView: PropTypes.func.isRequired,
};

export default Navbar;