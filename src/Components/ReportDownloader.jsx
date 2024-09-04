import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../css/ReportExcel.css';

const autenticacionServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const enpointReportesExcel = import.meta.env.VITE_ENPOINT_SERVER_CALLCENTER_ReportesExcel;

/**
 * The `ReportDownloader` component in JavaScript React allows users to download a report by specifying
 * a start and end date, with error handling and loading indicators.
 * @returns The `ReportDownloader` component is being returned. It is a functional component that
 * displays a form for downloading a report based on start and end dates. The component includes input
 * fields for the start and end dates, a button to trigger the download process, and toast
 * notifications for success or error messages during the download process.
 */
const ReportDownloader = ({ onCancel }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    const formatDateToISO = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toISOString();
    };

    const handleDownload = async () => {
        if (!startDate || !endDate) {
            toast.error('Por favor, completa ambos campos de fecha.', {
                className: 'toast-error-custom'
            });
            return;
        }

        setLoading(true);

        try {
            const formattedStartDate = formatDateToISO(startDate);

            const endDateWithTime = new Date(endDate);
            endDateWithTime.setUTCHours(23, 59, 59, 999);
            const formattedEndDateWithTime = endDateWithTime.toISOString();

            const response = await axios.get(enpointReportesExcel, {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDateWithTime
                },
                headers: {
                    "authorization": autenticacionServer
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ReporteClientes.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            toast.success('Reporte descargado con éxito.', {
                className: 'toast-success-custom'
            });

            if (onCancel) onCancel();
        } catch (error) {
            console.error('Error al descargar el reporte:', error);
            toast.error('Hubo un error al intentar descargar el reporte.', {
                className: 'toast-error-custom'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-overlay">
            <div className="report-container">
                <h1 className="report-heading">Descargar Reporte</h1>
                <div className="form-group">
                    <label htmlFor="startDate">Fecha de Inicio:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Fecha de Fin:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="button primary" onClick={handleDownload} disabled={loading}>
                    {loading ? 'Descargando...' : 'Descargar Reporte'}
                </button>
                <button className="cancel-button" onClick={onCancel}>Cancelar</button>
            </div>
            <ToastContainer />
        </div>
    );
};

ReportDownloader.propTypes = {
    onCancel: PropTypes.func
};

export default ReportDownloader;