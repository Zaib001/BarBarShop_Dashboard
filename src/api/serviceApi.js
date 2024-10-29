import axios from 'axios';

export const fetchServices = async () => {
  const response = await axios.get('https://ma-ney3.onrender.com/api/services');
  return response.data;
};
export const createService = async (service) => {
  const response = await axios.post('https://ma-ney3.onrender.com/api/services' , service);
  return response.data;
};
export const deleteService = async (id) => {
  await axios.delete(`https://ma-ney3.onrender.com/api/services/${id}`);
};
