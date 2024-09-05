import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import BarberList from './pages/BarberList';
import ServiceList from './pages/ServiceList';
import AppointmentList from './pages/AppointmentList';
import PaymentList from './pages/PaymentList';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/barbers" element={<BarberList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/payments" element={<PaymentList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
