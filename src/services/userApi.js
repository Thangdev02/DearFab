import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://api.dearfab.com/api/v1";

export const getUsers = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Không tìm thấy access token. Vui lòng đăng nhập lại.");
    }

    const response = await axios.get(`${API_URL}/account?size=1000`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { status, message, data } = response.data;

    if (status === 200) {
      console.log("[API] Lấy danh sách người dùng thành công:", data.items);
      return { success: true, users: data.items, message };
    } else {
      console.error("[API] Lấy danh sách người dùng thất bại:", message);
      return { success: false, users: [], message };
    }
  } catch (error) {
    console.error("[API] Error fetching users:", {
      message: error.message,
      response: error.response ? error.response.data : "No response data",
      status: error.response ? error.response.status : "No status",
      config: error.config ? error.config.url : "No config",
    });
    return {
      success: false,
      users: [],
      message: error.response?.data?.message || "Lỗi server. Vui lòng thử lại sau.",
    };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      throw new Error("Không tìm thấy access token. Vui lòng đăng nhập lại.");
    }

    const response = await axios.put(`${API_URL}/account`, {
      ...userData,
      id,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { status, message, data } = response.data;

    if (status === 200) {
      console.log("[API] Cập nhật người dùng thành công:", data);
      return { success: true, data, message };
    } else {
      console.error("[API] Cập nhật người dùng thất bại:", message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("[API] Error updating user:", {
      message: error.message,
      response: error.response ? error.response.data : "No response data",
      status: error.response ? error.response.status : "No status",
    });
    return {
      success: false,
      message: error.response?.data?.message || "Lỗi server. Vui lòng thử lại sau.",
    };
  }
};