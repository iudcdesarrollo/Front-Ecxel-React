import RingLoader from 'react-spinners/RingLoader';
import '../css/LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="spinner-wrapper">
                <RingLoader color="#00BFFF" size={50} />
                <p className="loading-text">Los servidores de inovacion estan procesando tu solicitud.</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;