import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ClientManually.css';

const claveAccesServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const enpoint = import.meta.env.VITE_ENPOINT_SERVER_CALLCENTER_MANUALLY;

const ManualCustomerEntryForm = ({ onCancel, servicio }) => {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        posgradoInteres: '',
        servicio: servicio,
        fechaIngresoMeta: getCurrentDate()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombre || !formData.apellido || !formData.correo || !formData.telefono || !formData.posgradoInteres || !formData.servicio) {
            toast.error('Todos los campos son obligatorios.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo)) {
            toast.error('Por favor, introduce un correo electrónico válido.');
            return;
        }

        const telefonoRegex = /^3\d{9}$/;
        if (!telefonoRegex.test(formData.telefono)) {
            toast.error('Por favor, introduce un número de teléfono colombiano válido (10 dígitos comenzando con 3).');
            return;
        }

        const telefonoConPrefijo = `+57${formData.telefono}`;
        formData.telefono = telefonoConPrefijo;

        try {
            const response = await axios.post(enpoint, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': claveAccesServer,
                },
            });
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message);
                setFormData({
                    nombre: '',
                    apellido: '',
                    correo: '',
                    telefono: '',
                    posgradoInteres: '',
                    servicio: servicio,
                    fechaIngresoMeta: getCurrentDate()
                });
            } else {
                toast.error('Error al procesar el ingreso manual.');
            }
        } catch (error) {
            console.error('Error:', error.response || error.message || error);
            toast.error('Error al procesar el ingreso manual.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2 className="form-heading">Ingreso Manual de Clientes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Programa de interés:</label>
                        <input
                            type="text"
                            name="posgradoInteres"
                            value={formData.posgradoInteres}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Servicio:</label>
                        <input
                            type="text"
                            name="servicio"
                            value={formData.servicio}
                            className="form-input"
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Fecha de Ingreso:</label>
                        <input
                            type="text"
                            name="fechaIngresoMeta"
                            value={formData.fechaIngresoMeta}
                            className="form-input"
                            readOnly
                        />
                    </div>
                    <button type="submit" className="submit-button">Enviar</button>
                    <button className="cancel-button" onClick={onCancel}>Cancelar</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

ManualCustomerEntryForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    servicio: PropTypes.string.isRequired
};

export default ManualCustomerEntryForm;