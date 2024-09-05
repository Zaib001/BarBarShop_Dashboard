import axios from 'axios';

export const fetchPayments = async () => {
  const response = await axios.get('https://ma-1.onrender.com/api/payments');
  return response.data;
};
