import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/barbers" className="hover:text-gray-400">Barbers</Link>
        </li>
        <li className="mb-4">
          <Link to="/services" className="hover:text-gray-400">Services</Link>
        </li>
        <li className="mb-4">
          <Link to="/appointments" className="hover:text-gray-400">Appointments</Link>
        </li>
        <li className="mb-4">
          <Link to="/payments" className="hover:text-gray-400">Payments</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
