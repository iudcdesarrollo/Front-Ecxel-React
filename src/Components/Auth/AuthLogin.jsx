import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../css/AuthLogin.css';

const authServer = import.meta.env.VITE_SERVER_AUTHENTICATION_KEY;
const endpointAuthUserServer = import.meta.env.VITE_ENPOINT_LOGIN_USERS;

function AuthLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(endpointAuthUserServer, {
        username,
        password
      }, {
        headers: {
          'Authorization': authServer,
          'Content-Type': 'application/json'
        }
      });

      console.log('Login successful:', response.data);

      const { role } = response.data;
      login(role);

      setTimeout(() => {
        if (role === 'InnovacionAdmin') {
          navigate('/ServiceDashboard');
        } else {
          console.log('Role not handled:', role);
        }
      }, 100);

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error de autenticación');
      } else if (error.request) {
        setError('Error en el servidor');
      } else {
        setError('Error en la solicitud');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p className="auth-terms">
          Página de innovación para la gestión de nuestros modelos de inteligencia artificial.
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;