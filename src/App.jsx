import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ServiceDashboard from './Components/ServiceDashboard/ServiceDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ServiceDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;