import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../css/FilterControls.css';
import LoadingSpinner from './LoadingSpinner'

const autenticacionServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const enpointConsultas = import.meta.env.VITE_ENPOINT_SERVER_CALLCENTER_CONSULTAS;

/**
 * The `FilterControls` component in JavaScript React allows users to filter and fetch data based on
 * various criteria such as phone number, date range, and type.
 * @returns The `FilterControls` component is being returned. It consists of filter buttons for
 * 'Gestionados', 'No Gestionados', and 'Interesados', input fields for 'Número de Teléfono', 'Fecha
 * Inicio', and 'Fecha Fin', and a 'Consultar' button. The component handles user input changes and
 * button clicks to fetch data based on the selected filters and input values
 */

const FilterControls = ({ onDataFetched }) => {
  const [telefono, setTelefono] = useState('');
  const [tipo, setTipo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return undefined;
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(enpointConsultas, {
        params: {
          tipo: tipo,
          telefono: telefono || undefined,
          fechaInicio: formatDateTime(fechaInicio) || undefined,
          fechaFin: formatDateTime(fechaFin) || undefined,
        },
        headers: {
          "authorization": autenticacionServer,
        },
      });

      const data = response.data;
      const formattedData = data.map(item => ({
        fecha_envio_wha: item.fecha_envio_wha,
        telefono: item.telefono,
        correo: item.correo,
        carrera: item.Carrera ? item.Carrera.nombre : 'N/A',
        nombres: item.nombres,
        apellidos: item.apellidos,
        estado: item.Estado ? item.Estado.nombre : 'N/A'
      }));
      onDataFetched(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterType) => {
    setTipo(filterType);
    fetchData();
  };

  const handleInputChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  return (
    <div className="filter-controls">
      {loading && <LoadingSpinner />}
      <div className="filter-buttons">
        <button className="filter-button" onClick={() => handleFilterClick('gestionado')}>Gestionados</button>
        <button className="filter-button" onClick={() => handleFilterClick('no-gestionado')}>No Gestionados</button>
        <button className="filter-button" onClick={() => handleFilterClick('interesado')}>Interesados</button>
      </div>
      <div className="filter-inputs">
        <input
          type="text"
          placeholder="Número de Teléfono"
          className="phone-input"
          value={telefono}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Fecha Inicio"
          className="date-input"
          value={fechaInicio}
          onChange={handleFechaInicioChange}
        />
        <input
          type="date"
          placeholder="Fecha Fin"
          className="date-input"
          value={fechaFin}
          onChange={handleFechaFinChange}
        />
      </div>
      <button className="filter-submit" onClick={fetchData}>Consultar</button>
    </div>
  );
};

FilterControls.propTypes = {
  onDataFetched: PropTypes.func.isRequired,
};

export default FilterControls;