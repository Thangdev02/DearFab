import axios from 'axios';

const API_URL = 'https://dearfab.onrender.com/orders'; // Adjust based on your json-server setup

export const saveOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return { success: true, order: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi lưu đơn hàng: ' + error.message };
  }
};