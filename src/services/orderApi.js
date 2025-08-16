import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_USERS = 'https://dearfab.onrender.com/users'; // Endpoint cho người dùng

// Lấy danh sách tất cả đơn hàng
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return { success: true, orders: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi lấy danh sách đơn hàng: ' + error.message };
  }
};

// Lấy thông tin một đơn hàng theo ID
export const getOrderById = async (orderId) => {
  try {
    const token = Cookies.get("accessToken");
    const response = await axios.get(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { success: true, order: response.data };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, message: error.message };
  }
};

// Lưu một đơn hàng mới
export const saveOrder = async (orderData) => {
  try {
    const token = Cookies.get("accessToken");

    const response = await axios.post(
      `${API_URL}/order`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, order: response.data };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, message: "Lỗi khi lưu đơn hàng: " + error.message };
  }
};
// Cập nhật thông tin một đơn hàng theo ID
export const updateOrder = async (id, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, orderData);
    return { success: true, order: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi cập nhật đơn hàng: ' + error.message };
  }
};

// Xóa một đơn hàng theo ID
export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Lỗi khi xóa đơn hàng: ' + error.message };
  }
};

// Lấy danh sách tất cả người dùng
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL_USERS);
    return { success: true, users: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi lấy danh sách người dùng: ' + error.message };
  }
};
// Trong orderApi.js
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL_USERS}/${id}`, userData);
    return { success: true, user: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi cập nhật người dùng: ' + error.message };
  }
};