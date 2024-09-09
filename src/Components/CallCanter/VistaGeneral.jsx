import SectionWithMenu from '../SectionMenu.jsx';
import PropTypes from 'prop-types';
import FilterControls from '../FilterControls.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import DataTable from '../DataTable.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';

const authServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const endpointGetClients = import.meta.env.VITE_ENPOINT_SERVER_CLIENTS_DATA;

const VistaGeneral = ({ nameService }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${endpointGetClients}?page=${pageIndex + 1}&limit=${pageSize}&nameService=${nameService}`, {
          headers: {
            'Authorization': authServer
          }
        });

        const responseData = response.data;
        const dataArray = responseData.data || responseData;

        if (Array.isArray(dataArray)) {
          const formattedData = dataArray.map(item => ({
            fecha_envio_wha: item.fecha_envio_wha,
            telefono: item.telefono,
            correo: item.correo,
            carrera: item.Carrera ? item.Carrera.nombre : 'N/A',
            nombres: item.nombres,
            apellidos: item.apellidos,
            estado: item.Estado ? item.Estado.nombre : 'N/A'
          }));
          setFilteredData(formattedData);
          setPageCount(Math.ceil(responseData.total / pageSize));
        } else {
          console.error('Expected an array but got:', dataArray);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [nameService, pageIndex, pageSize]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <>
      <SectionWithMenu nameServicio={nameService} />
      <FilterControls nameService={nameService} onDataFetched={(newData) => setFilteredData(newData)} />
      <div style={{ position: 'relative', height: '100vh' }}>
        {loading && <LoadingSpinner />}
        <DataTable
          columns={[
            { Header: 'Ingreso IA', accessor: 'fecha_envio_wha' },
            { Header: 'Teléfono', accessor: 'telefono' },
            { Header: 'Email', accessor: 'correo' },
            { Header: 'Carrera', accessor: 'carrera' },
            { Header: 'Nombre', accessor: 'nombres' },
            { Header: 'Apellido', accessor: 'apellidos' },
            { Header: 'Estado', accessor: 'estado' }
          ]}
          data={filteredData}
          pageCount={pageCount}
          gotoPage={handlePageChange}
          previousPage={() => handlePageChange(pageIndex - 1)}
          nextPage={() => handlePageChange(pageIndex + 1)}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          pageIndex={pageIndex}
        />
      </div>
    </>
  );
};

VistaGeneral.propTypes = {
  nameService: PropTypes.string.isRequired
};

export default VistaGeneral;