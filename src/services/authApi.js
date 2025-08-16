import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { email, password });
    const { status, message, data } = response.data;

    if (status === 200) {
      return {
        success: true,
        user: {
          id: data.accountId,
          email: data.email,
          name: data.fullName,
          phone: data.phone,
          role: data.role,
        },
        accessToken: data.accessToken,
        role: data.role,
      };
    } else {
      return { success: false, message: message || 'Đăng nhập thất bại' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/account`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    // API DearFab thường trả { status, message, data }
    if (response.status === 201 || response.status === 200) {
      const { data, message } = response.data;
      return {
        success: true,
        user: {
          id: data.accountId || data.id,
          email: data.email,
          name: data.fullName,
          address: data.address,
          phone: data.phone,
          role: data.role || "User",
        },
        message: message || "Đăng ký thành công",
      };
    }

    return { success: false, message: response.data?.message || "Đăng ký thất bại" };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi server. Vui lòng thử lại sau.",
    };
  }
};