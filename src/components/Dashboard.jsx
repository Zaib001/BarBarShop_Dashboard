import React, { useEffect, useState } from 'react';
import Widget from './Widget';
import { fetchBarbers } from '../api/barberApi';
import { fetchServices } from '../api/serviceApi';
import { fetchAppointments } from '../api/appointmentApi';

const Dashboard = () => {
  const [barbersCount, setBarbersCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const barbers = await fetchBarbers();
        const services = await fetchServices();
        const appointments = await fetchAppointments();

        setBarbersCount(barbers.length);
        setServicesCount(services.length);
        setAppointmentsCount(appointments.length);
      } catch (error) {
        console.error('Error loading counts:', error);
      }
    };

    loadCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <Widget title="Barbers" value={barbersCount} />
      <Widget title="Services" value={servicesCount} />
      <Widget title="Appointments" value={appointmentsCount} />
    </div>
  );
};

export default Dashboard;
