import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/coupons/`;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched products:', response);
    return response.data; // Return the data array
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
