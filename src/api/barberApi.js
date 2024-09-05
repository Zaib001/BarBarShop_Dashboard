import axios from 'axios';

export const fetchBarbers = async () => {
  const response = await axios.get('http://localhost:5000/api/barbers');
  return response.data;
};

export const createBarber = async (barber) => {
  const response = await axios.post('http://localhost:5000/api/barbers' , barber);
  return response.data;
};
export const deleteBarber = async (id) => {
  await axios.delete(`http://localhost:5000/api/barbers/${id}`);
};
