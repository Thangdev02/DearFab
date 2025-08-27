
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
import Cookies from 'js-cookie';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/product`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const result = await response.json()

    
    return result.data?.items || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const result = await response.json()
    return result.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};



export const createProduct = async (productData, customUrl = `${API_URL}/product`) => {
  try {
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      throw new Error('Không tìm thấy access token. Vui lòng đăng nhập lại.');
    }

    const response = await axios.post(customUrl, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { status, message, data } = response.data;
    if (status === 201 || status === 200) {
      return {
        success: true,
        product: data,
        message: message || 'Tạo sản phẩm thành công',
      };
    } else {
      return { success: false, message: message || 'Tạo sản phẩm thất bại' };
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
    };
  }
};


export const getSizes = async () => {
  try {
    const response = await axios.get(`${API_URL}/size`);
    const { status, message, data } = response.data;
    if (status === 200) {
      return {
        success: true,
        sizes: data.items,
        message: message || 'Lấy danh sách kích thước thành công',
      };
    } else {
      return { success: false, message: message || 'Lấy danh sách kích thước thất bại' };
    }
  } catch (error) {
    console.error('Error fetching sizes:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Lỗi server. Vui lòng thử lại sau.',
    };
  }
};
export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const updateProductSize = async (sizeId, price, quantity) => {
  try {
    const response = await axios.put(
      `${API_URL}/product-size/${sizeId}`,
      { price, quantity },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product size:", error);
    throw error;
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/product/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};



export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};