import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import Widget from './Widget';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const Dashboard = () => {
  const [barbersCount, setBarbersCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [averageIncome, setAverageIncome] = useState(0);
  const [averageAppointments, setAverageAppointments] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [barbers, services, stats] = await Promise.all([
          axios.get('https://ma-ney3.onrender.com/api/barbers'),
          axios.get('https://ma-ney3.onrender.com/api/services'),
          axios.get('https://ma-ney3.onrender.com/api/appointments/stats'),
        ]);

        setBarbersCount(barbers.data.length);
        setServicesCount(services.data.length);

        const totalAppointments = stats.data.reduce(
          (sum, month) => sum + month.totalAppointments,
          0
        );

        const totalEarnings = stats.data.reduce(
          (sum, month) => sum + month.totalEarnings,
          0
        );

        setAppointmentsCount(totalAppointments);
        setAverageIncome((totalEarnings / 12).toFixed(2)); // Calculate average income
        setAverageAppointments(Math.round(totalAppointments / 12)); // Calculate average appointments
        setMonthlyStats(stats.data);
      } catch (error) {
        console.error('Error loading counts:', error);
      }
    };

    loadCounts();
  }, []);

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Monthly Appointments',
        data: monthlyStats.map((stat) => stat.totalAppointments),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Monthly Earnings ($)',
        data: monthlyStats.map((stat) => stat.totalEarnings),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart respects height/width constraints
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Appointments and Earnings',
      },
    },
  };

  return (
    <div className="p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
  <Widget title="Barbers" value={barbersCount} />
  <Widget title="Services" value={servicesCount} />
  <Widget title="Appointments" value={appointmentsCount} />
</div>
      {/* Display Average Income and Appointments */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Average Monthly Income</h2>
          <p className="text-2xl">${averageIncome}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Average Monthly Appointments</h2>
          <p className="text-2xl">{averageAppointments}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6" style={{ height: '400px', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
