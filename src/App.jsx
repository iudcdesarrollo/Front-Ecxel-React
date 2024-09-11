import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/Auth/AuthContext';
import ServiceDashboard from './components/ServiceDashboard/ServiceDashboard';
// import CallCenterDashboard from './components/CallCenterDashboard/CallCenterDashboard';
import AuthLogin from './Components/Auth/AuthLogin';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLogin />} />
          
          <Route
            path="/ServiceDashboard"
            element={
              <ProtectedRoute 
                element={<ServiceDashboard />} 
                requiredRole="InnovacionAdmin" 
              />
            } 
          />
          
          {/* <Route 
            path="/CallCenter" 
            element={
              <ProtectedRoute 
                element={<CallCenterDashboard />} 
                requiredRole="AgenteCallCenter" 
              />
            } 
          /> */}
          
          {/* Añadir más rutas protegidas según sea necesario */}
          
          {/* Ruta de redirección para cualquier URL no definida */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;