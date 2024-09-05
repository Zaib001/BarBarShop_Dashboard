import axios from 'axios';



export const fetchUserById = async (id) => {
    const response = await axios.get(`https://ma-1.onrender.com/api/${id}`);
    return response.data;
  };