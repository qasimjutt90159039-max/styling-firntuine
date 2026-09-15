const API_BASE = import.meta.env.VITE_API_URL || '';

export const api = {
  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '' && val !== 'All') {
        query.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/api/products?${query.toString()}`);
    if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch products`);
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error ${res.status}: Failed to fetch product details`);
    }
    return res.json();
  },

  async createProduct(formData, token) {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to create product');
    }
    return res.json();
  },

  async updateProduct(id, formData, token) {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to update product');
    }
    return res.json();
  },

  async deleteProduct(id, token) {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/api/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async createCategory(formData, token) {
    const res = await fetch(`${API_BASE}/api/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to create category');
    }
    return res.json();
  },

  async updateCategory(id, formData, token) {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to update category');
    }
    return res.json();
  },

  async deleteCategory(id, token) {
    const res = await fetch(`${API_BASE}/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
  },

  // Gallery
  async getGallery(category = '') {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/api/gallery${query}`);
    if (!res.ok) throw new Error('Failed to fetch gallery items');
    return res.json();
  },

  async createGalleryItem(formData, token) {
    const res = await fetch(`${API_BASE}/api/gallery`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to add gallery item');
    }
    return res.json();
  },

  async deleteGalleryItem(id, token) {
    const res = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete gallery item');
    return res.json();
  },

  // Inquiries
  async submitInquiry(formData) {
    const res = await fetch(`${API_BASE}/api/inquiries`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit inquiry');
    }
    return data;
  },

  async getInquiries(token, status = '') {
    const query = status && status !== 'All' ? `?status=${encodeURIComponent(status)}` : '';
    const res = await fetch(`${API_BASE}/api/inquiries${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to fetch customer inquiries');
    return res.json();
  },

  async updateInquiryStatus(id, status, token) {
    const res = await fetch(`${API_BASE}/api/inquiries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update inquiry status');
    return res.json();
  },

  async deleteInquiry(id, token) {
    const res = await fetch(`${API_BASE}/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete inquiry');
    return res.json();
  },

  // Admin Auth
  async login(username, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || 'Invalid login credentials');
    }
    return data;
  },

  async verifyAuth(token) {
    const res = await fetch(`${API_BASE}/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    return res.json();
  },
};
