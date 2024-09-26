import axios from 'axios';

const COUPON_API_URL = `${process.env.REACT_APP_API_URL}/coupons/`;

export const fetchCoupons = async () => {
  try {
    const response = await axios.get(COUPON_API_URL);
    if (response.status === 200) {
      console.log('Fetched coupons data:', response.data);
      return response.data; // Return the coupon object
    } else {
      console.error('Unexpected response status:', response.status);
      throw new Error('Failed to fetch coupons');
    }
  } catch (error) {
    console.error('Error fetching coupons:', error.message);
    throw error; // Rethrow the error for handling in the component
  }
};
