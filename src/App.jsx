import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";
import DashboardPage from "./pages/DashboardPage";
import BarberList from "./pages/BarberList";
import ServiceList from "./pages/ServiceList";
import AppointmentList from "./pages/AppointmentList";
import PaymentList from "./pages/PaymentList";
import VoucherManagement from "./components/VoucherManagement";
import LoginForm from "./pages/LoginForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes for Unauthenticated Pages */}
        <Route path="/" element={<UnauthenticatedLayout />}>
          <Route index element={<LoginForm />} />
        </Route>

        {/* Routes for Authenticated Pages */}
        <Route path="/" element={<AuthenticatedLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="barbers" element={<BarberList />} />
          <Route path="services" element={<ServiceList />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="payments" element={<PaymentList />} />
          <Route path="voucher" element={<VoucherManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
