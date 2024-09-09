import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../css/FilterControls.css';
import LoadingSpinner from './LoadingSpinner';

const autenticacionServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const enpointConsultas = import.meta.env.VITE_ENPOINT_SERVER_CALLCENTER_CONSULTAS;

/**
 * The `FilterControls` component allows users to filter and fetch data based on
 * various criteria such as phone number, date range, and type, with pagination support.
 * @param {Object} props - The component props.
 * @param {Function} props.onDataFetched - Callback function to handle the fetched data.
 * @param {string} props.nameService - The name of the service for filtering data.
 * @returns {JSX.Element} The `FilterControls` component.
 */
const FilterControls = ({ onDataFetched, nameService }) => {
  const [telefono, setTelefono] = useState('');
  const [tipo, setTipo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return undefined;
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd');
  };

  const fetchData = async (page = 0) => {
    setLoading(true);
    try {
      const response = await axios.get(enpointConsultas, {
        params: {
          tipo: tipo,
          telefono: telefono || undefined,
          fechaInicio: formatDateTime(fechaInicio) || undefined,
          fechaFin: formatDateTime(fechaFin) || undefined,
          nameService: nameService,
          page: page + 1,
          limit: pageSize,
        },
        headers: {
          "authorization": autenticacionServer,
        },
      });

      const data = response.data;
      const formattedData = data.data.map(item => ({
        fecha_envio_wha: item.fecha_envio_wha,
        telefono: item.telefono,
        correo: item.correo,
        carrera: item.Carrera ? item.Carrera.nombre : 'N/A',
        nombres: item.nombres,
        apellidos: item.apellidos,
        estado: item.Estado ? item.Estado.nombre : 'N/A'
      }));
      setTotalPages(Math.ceil(data.total / pageSize));
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

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
    fetchData(newPageIndex);
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
      <button className="filter-submit" onClick={() => fetchData(pageIndex)}>Consultar</button>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex <= 0}
        >
          Anterior
        </button>
        <span>{pageIndex + 1} de {totalPages}</span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex >= totalPages - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

FilterControls.propTypes = {
  onDataFetched: PropTypes.func.isRequired,
  nameService: PropTypes.string.isRequired
};

export default FilterControls;