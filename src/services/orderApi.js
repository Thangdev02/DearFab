import axios from 'axios';
import Cookies from "js-cookie";

const   API_URL = import.meta.env.VITE_API_URL;

// Lấy danh sách tất cả đơn hàng
export const getOrders = async () => {
  try {
    // Lấy access token từ cookie
    const token = Cookies.get('accessToken'); // Đảm bảo key đúng với key lưu token
    console.log('Access Token:', token); // Log token

    if (!token) {
      console.log('No access token found');
      return {
        success: false,
        message: 'Không tìm thấy access token. Vui lòng đăng nhập lại.',
      };
    }

    // Gọi API với header chứa access token
    const response = await axios.get(`${API_URL}/order?size=1000`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API Response:', response.data); // Log dữ liệu trả về từ API

    // Kiểm tra phản hồi từ API
    if (response.status === 200) {
      return {
        success: true,
        orders: response.data.data.items || [], // Lấy danh sách đơn hàng
      };
    } else {
      console.log('API returned non-200 status:', response.status);
      return {
        success: false,
        message: 'Không thể lấy danh sách đơn hàng.',
      };
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    console.log('Error Response:', error.response?.data); // Log lỗi chi tiết
    if (error.response?.status === 401) {
      Cookies.remove('accessToken'); // Sửa key cho nhất quán
      Cookies.remove('user');
      return {
        success: false,
        message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.',
      };
    }
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi khi lấy danh sách đơn hàng.',
    };
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

export const getOrderDetails = async (orderId) => {
  try {
    const token = Cookies.get('accessToken');
    console.log('Access Token for Order Details:', token);

    if (!token) {
      console.log('No access token found for order details');
      return {
        success: false,
        message: 'Không tìm thấy access token. Vui lòng đăng nhập lại.',
      };
    }

    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(`Order Details Response (${orderId}):`, response.data);

    if (response.status === 200) {
      return {
        success: true,
        order: response.data.data,
      };
    }
    return {
      success: false,
      message: 'Không thể lấy chi tiết đơn hàng.',
    };
  } catch (error) {
    console.error('Error fetching order details:', error);
    console.log('Error Response:', error.response?.data);
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi khi lấy chi tiết đơn hàng.',
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
