import { useState } from 'react';
import '../css/SectionWithMenu.css';
import PropTypes from 'prop-types';
import FileUploadComponent from './ClientExcel';
import ManualCustomerEntryForm from './ClientManually';
import ReportDownloader from './ReportDownloader';

/* This code defines a functional React component called `SectionWithMenu`. Inside this component, it
manages the state using the `useState` hook to keep track of whether the menu is open (`isMenuOpen`)
and which component is currently active (`activeComponent`). */
const SectionWithMenu = ({nameServicio}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const showExcel = () => {
    setActiveComponent('excel');
    setIsMenuOpen(false);
  };
  const showClientes = () => {
    setActiveComponent('clientes');
    setIsMenuOpen(false);
  };
  const showReport = () => {
    setActiveComponent('report');
    setIsMenuOpen(false);
  };
  const handleCancel = () => setActiveComponent(null);

  return (
    <div className="section-with-menu">
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </button>
      <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href="#excel" className="dropdown-link" onClick={showExcel}>Excel</a>
        <a href="#clientes" className="dropdown-link" onClick={showClientes}>Clientes</a>
        <a href="#report" className="dropdown-link" onClick={showReport}>Reporte Excel</a>
      </div>
      {activeComponent === 'excel' && <FileUploadComponent onCancel={handleCancel} nameServicio={nameServicio}/>}
      {activeComponent === 'clientes' && <ManualCustomerEntryForm onCancel={handleCancel} servicio={nameServicio} />}
      {activeComponent === 'report' && <ReportDownloader onCancel={handleCancel} servicioNombre={nameServicio}/>}
    </div>
  );
};

SectionWithMenu.propTypes = {
  nameServicio: PropTypes.string.isRequired
};

export default SectionWithMenu;