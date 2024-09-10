import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/MetricasLedas.css';
import LoadingSpinner from '../LoadingSpinner.jsx';

const authServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const endpointGetClients = import.meta.env.VITE_ENPOINT_SERVER_METRIC_CLIENTS;

const MetricasLedas = ({ nameService, onCancel }) => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${endpointGetClients}`, {
                    headers: {
                        'Authorization': authServer
                    },
                    params: {
                        servicioNombre: nameService
                    }
                });
                setMetrics(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, [nameService]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!metrics) {
        return <div className="noData">No hay datos disponibles</div>;
    }

    return (
        <div className="overlay">
            <div className="container">
                <button className="close-button" onClick={onCancel}>✖</button>
                <h2 className="heading">Métricas del servicio: {nameService}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {['Total Personas', 'Interesados', 'Gestionados', 'Sin Gestionar', 'Últimos 30 días', 'Últimos 7 días'].map((header) => (
                                <th key={header} className="header">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{metrics.totalPersonas}</td>
                            <td>{metrics.countInteresados}</td>
                            <td>{metrics.countGestionados}</td>
                            <td>{metrics.countSinGestionar}</td>
                            <td>
                                <div>Total: {metrics.totalLast30Days}</div>
                                <div>Interesados: {metrics.countInteresadosLast30Days}</div>
                                <div>Gestionados: {metrics.countGestionadosLast30Days}</div>
                                <div>Sin Gestionar: {metrics.countSinGestionarLast30Days}</div>
                            </td>
                            <td>
                                <div>Total: {metrics.totalLast7Days}</div>
                                <div>Interesados: {metrics.countInteresadosLast7Days}</div>
                                <div>Gestionados: {metrics.countGestionadosLast7Days}</div>
                                <div>Sin Gestionar: {metrics.countSinGestionarLast7Days}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

MetricasLedas.propTypes = {
    onCancel: PropTypes.func.isRequired,
    nameService: PropTypes.string.isRequired
};

export default MetricasLedas;