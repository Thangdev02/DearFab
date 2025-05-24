import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email, password }
    });
    const users = response.data;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, user, role: user.role };
    } else {
      return { success: false, message: 'Sai email hoặc mật khẩu' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Lỗi server. Vui lòng thử lại sau.' };
  }
};