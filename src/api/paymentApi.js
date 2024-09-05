import axios from 'axios';

export const fetchPayments = async () => {
  const response = await axios.get('http://localhost:5000/api/payments');
  return response.data;
};
