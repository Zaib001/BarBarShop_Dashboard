import axios from 'axios';

export const fetchPayments = async () => {
  const response = await axios.get('https://ma-ney3.onrender.com/api/payments');
  return response.data;
};
