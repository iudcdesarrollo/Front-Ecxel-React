import { useState } from 'react';
import VistaGeneral from '../CallCanter/VistaGeneral.jsx';
import Navbar from '../Menu.jsx';

function ServiceDashboard() {
  const [selectedView, setSelectedView] = useState('CallCenter');

  const renderView = () => {
    switch (selectedView) {
      case 'IPS':
        return <VistaGeneral nameService={"IPS"} />;
      case 'CallCenter':
        return <VistaGeneral nameService={"CallCenter"} />;
      case 'Veterinaria':
        return <VistaGeneral nameService={"Veterinaria"} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar onSelectView={setSelectedView} />
      {renderView()}
    </>
  );
}

export default ServiceDashboard;