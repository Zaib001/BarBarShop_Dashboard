import axios from 'axios';



export const fetchUserById = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/${id}`);
    return response.data;
  };