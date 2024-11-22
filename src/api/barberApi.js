import axios from 'axios';

export const fetchBarbers = async () => {
  const response = await axios.get('https://ma-1.onrender.com/api/barbers');
  return response.data;
};

export const createBarber = async (barber) => {
  const response = await axios.post('https://ma-1.onrender.com/api/barbers' , barber);
  return response.data;
};
export const deleteBarber = async (id) => {
  await axios.delete(`https://ma-1.onrender.com/api/barbers/${id}`);
};
