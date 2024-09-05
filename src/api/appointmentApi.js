import axios from 'axios';

export const fetchAppointments = async () => {
  const response = await axios.get('https://ma-1.onrender.com/api/appointments');
  return response.data;
};

export const updatePaymentStatus = async (id, status) => {
  const response = await axios.put(`https://ma-1.onrender.com/api/appointments/${id}/payment-status`, { status });
  return response.data;
};
export const fetchBarberById = async (id) => {
  const response = await axios.get(`https://ma-1.onrender.com/api/barbers/${id}`);
  return response.data;
};

export const fetchServiceById = async (id) => {
  const response = await axios.get(`https://ma-1.onrender.com/api/services/${id}`);
  return response.data;
};
export const fetchUserById = async (id) => {
  const response = await axios.get(`https://ma-1.onrender.com/api/user/${id}`);
  return response.data;
};