import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

// Lấy danh sách review theo productId
// Lấy danh sách review theo productId và size
export const getReviews = async (productId, size = 10) => {
    try {
      const token = Cookies.get("accessToken");
      // truyền size vào query param
      const res = await axios.get(`${API_URL}/product/${productId}/review?size=${size}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        withCredentials: true,
      });
  
      const { status, message, data } = res.data;
      if (status === 200) {
        return { 
          success: true, 
          reviews: data?.items || [], 
          total: data?.total || 0,
          totalPages: data?.totalPages || 1,
          message 
        };
      }
      return { success: false, message: message || "Lấy review thất bại" };
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Lỗi server khi lấy review",
      };
    }
  };
  

// Thêm review mới cho product
export const addReview = async (productId, { content, rating }) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await axios.post(
      `${API_URL}/product/${productId}/review`,
      { content, rating },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        withCredentials: true,
      }
    );

    const { status, message, data } = res.data;
    if (status === 201 || status === 200) {
      return { success: true, review: data, message };
    }
    return { success: false, message: message || "Thêm review thất bại" };
  } catch (err) {
    console.error("Error adding review:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Lỗi server khi thêm review",
    };
  }
};

// Xóa review theo id
export const deleteReview = async (reviewId) => {
  try {
    const token = Cookies.get("accessToken");
    const res = await axios.delete(`${API_URL}/review/${reviewId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });

    const { status, message } = res.data;
    if (status === 200) {
      return { success: true, message: message || "Xóa review thành công" };
    }
    return { success: false, message: message || "Xóa review thất bại" };
  } catch (err) {
    console.error("Error deleting review:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Lỗi server khi xóa review",
    };
  }
};
