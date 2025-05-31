// const API_URL = 'https://dearfab.onrender.com';

// export const getProducts = async () => {
//   try {
//     const response = await fetch(`${API_URL}/products`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch products');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };
// export const getProductById = async (id) => {
//   try {
//     const response = await fetch(`https://dearfab.onrender.com/products/${id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch product');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     throw error;
//   }
// };

// export const createProduct = async (productData) => {
//   try {
//     const response = await fetch(`${API_URL}/products`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to create product');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error creating product:', error);
//     throw error;
//   }
// };

// export const updateProduct = async (id, productData) => {
//   try {
//     const response = await fetch(`${API_URL}/products/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update product');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error updating product:', error);
//     throw error;
//   }
// };

// export const deleteProduct = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/products/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete product');
//     }
//     return true; // API might not return data on DELETE, just return true if successful
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     throw error;
//   }
// };

const API_URL = 'https://dearfab.onrender.com';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
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

// CRUD operations for Reviews
export const saveReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to save review');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
};

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/reviews?productId=${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const reviews = await response.json();
    return Array.isArray(reviews) ? reviews : [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const getReviewById = async (reviewId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch review');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
};

export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to update review');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete review');
    }
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
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