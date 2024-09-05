import axios from 'axios';

export const fetchServices = async () => {
  const response = await axios.get('http://localhost:5000/api/services');
  return response.data;
};
export const createService = async (service) => {
  const response = await axios.post('http://localhost:5000/api/services' , service);
  return response.data;
};
export const deleteService = async (id) => {
  await axios.delete(`http://localhost:5000/api/services/${id}`);
};
