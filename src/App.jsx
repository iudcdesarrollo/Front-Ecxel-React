import './App.css';
import { useState } from 'react';
import VistaGeneral from './Components/CallCanter/VistaGeneral';
import Navbar from './Components/Menu.jsx';

function App() {
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

export default App;