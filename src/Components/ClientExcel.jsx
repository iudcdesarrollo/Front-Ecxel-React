import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ClientExcel.css';

const claveAccesServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const enpoint = import.meta.env.VITE_ENPOINT_SERVER_CALLCENTER_EXCEL;

/**
 * The `FileUploadComponent` function in JavaScript React allows users to upload Excel files with
 * validation and error handling, displaying toast messages for success and failure.
 * @returns The `FileUploadComponent` functional component is being returned. It consists of a file
 * upload container with input for selecting a file, error message display, buttons for uploading and
 * canceling, and a toast container for displaying success or error messages.
 */
const FileUploadComponent = ({ onCancel, nameServicio }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const extname = selectedFile.name.toLowerCase().split('.').pop();
            if (extname === 'xlsx' || extname === 'xls') {
                setFile(selectedFile);
                setError('');
            } else {
                setError('Por favor, sube un archivo con extensión .xlsx o .xls');
                setFile(null);
                toast.error('Por favor, sube un archivo con extensión .xlsx o .xls');
            }
        }
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('nameServicio', nameServicio);

            try {
                const response = await axios.post(enpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': claveAccesServer
                    }
                });

                if (response.status === 200) {
                    toast.success('Archivo subido exitosamente.');
                    onCancel();
                } else {
                    toast.error('Error al subir el archivo: ' + response.data.message);
                }
            } catch (error) {
                toast.error('Error al conectar con el servidor: ' + error.message);
            }
        }   
    };

    return (
        <div className="file-upload-container">
            <div className="button-group">
                <input 
                    type="file" 
                    accept=".xlsx, .xls" 
                    onChange={handleFileChange} 
                />
                {error && <p className="error-message">{error}</p>}
                <button onClick={handleUpload} disabled={!file}>
                    Subir Archivo
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    Cancelar
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

FileUploadComponent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    nameServicio: PropTypes.string.isRequired
};

export default FileUploadComponent;