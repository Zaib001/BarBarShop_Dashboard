import axios from 'axios';

export const fetchAppointments = async () => {
  const response = await axios.get('http://localhost:5000/api/appointments');
  return response.data;
};

export const updatePaymentStatus = async (id, status) => {
  const response = await axios.put(`http://localhost:5000/api/appointments/${id}/payment-status`, { status });
  return response.data;
};
export const fetchBarberById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/barbers/${id}`);
  return response.data;
};

export const fetchServiceById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/services/${id}`);
  return response.data;
};
export const fetchUserById = async (id) => {
  const response = await axios.get(`http://localhost:5000/api/user/${id}`);
  return response.data;
};