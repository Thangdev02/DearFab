import axios from 'axios';
import Cookies from "js-cookie";

const   API_URL = import.meta.env.VITE_API_URL;
const API_URL_USERS = 'https://dearfab.onrender.com/users'; // Endpoint cho người dùng
const API_URL_ORDERS = 'https://dearfab.onrender.com/orders'; // Endpoint cho người dùng

// Lấy danh sách tất cả đơn hàng
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL_ORDERS);
    return { success: true, orders: response.data };
  } catch (error) {
    return { success: false, message: 'Lỗi khi lấy danh sách đơn hàng: ' + error.message };
  }
};

// Lấy thông tin một đơn hàng theo ID
export const saveOrder = async (payload) => {
  try {
    const accessToken = Cookies.get('accessToken');
    console.log(`[API] Saving order with token: ${accessToken}`, { payload });
    if (!accessToken) {
      throw new Error('Không tìm thấy access token. Vui lòng đăng nhập lại.');
    }

    const response = await axios.post(`${API_URL}/order`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const { status, message, data } = response.data;
    console.log(`[API] Order save response`, { status, message, data }); // Log toàn bộ response
    if (status === 201 || status === 200) {
      return {
        success: true,
        order: data, // Giả sử data chứa thông tin order, bao gồm id
        message: message || 'Tạo order thành công',
      };
    } else {
      console.log(`[API] Order save failed`, { status, message });
      return { success: false, message: message || 'Tạo order thất bại' };
    }
  } catch (error) {
    console.error('[API] Error saving order - Details:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response data',
      status: error.response ? error.response.status : 'No status',
      config: error.config ? error.config.url : 'No config',
      requestData: payload,
    });
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
    };
  }
};

export const getOrderById = async (orderId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    console.log(`[API] Fetching order with ID: ${orderId} and token: ${accessToken}`);
    if (!accessToken) {
      throw new Error('Không tìm thấy access token. Vui lòng đăng nhập lại.');
    }

    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const { status, message, data } = response.data;
    if (status === 200) {
      console.log(`[API] Order fetched successfully`, { data });
      return {
        success: true,
        order: data,
        message: message || 'Lấy thông tin đơn hàng thành công',
      };
    } else {
      console.log(`[API] Order fetch failed`, { status, message });
      return { success: false, message: message || 'Lấy thông tin đơn hàng thất bại' };
    }
  } catch (error) {
    console.error('[API] Error fetching order - Details:', {
      message: error.message,
      response: error.response ? error.response.data : 'No response data',
      status: error.response ? error.response.status : 'No status',
      config: error.config ? error.config.url : 'No config',
    });
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
    };
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