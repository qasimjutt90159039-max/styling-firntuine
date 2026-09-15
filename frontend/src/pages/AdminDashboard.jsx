import React, { useState, useEffect } from 'react';
import {
  Package,
  Layers,
  Image,
  Inbox,
  LayoutDashboard,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Upload,
  CheckCircle,
  Clock,
  Eye,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { api } from '../api/client';
import { ROOM_FILTER_OPTIONS, CATALOG_CATEGORIES } from '../data/business';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('stylishAdminToken') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Modals / forms
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    room: 'Living Room',
    category: 'Sofas',
    description: '',
    material: '',
    specifications: '',
    price: '',
    featured: false,
    status: 'active',
  });
  const [productImages, setProductImages] = useState([]);

  // Category form
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [categoryImage, setCategoryImage] = useState(null);

  // Gallery form
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'Living Room', caption: '' });
  const [galleryImage, setGalleryImage] = useState(null);

  // Status message auto-dismiss
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  // Auth verification
  useEffect(() => {
    document.title = "Admin Dashboard | Stylish Furniture";

    const verify = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const user = await api.verifyAuth(token);
        if (user) {
          setAdminUser(user);
        } else {
          setToken('');
          localStorage.removeItem('stylishAdminToken');
        }
      } catch (err) {
        setToken('');
        localStorage.removeItem('stylishAdminToken');
      } finally {
        setAuthLoading(false);
      }
    };
    verify();
  }, [token]);

  // Fetch all dashboard data
  const refreshData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [prods, cats, gals, inqs] = await Promise.all([
        api.getProducts({ status: '' }), // fetch all statuses for admin
        api.getCategories(),
        api.getGallery(),
        api.getInquiries(token),
      ]);
      setProducts(prods);
      setCategories(cats);
      setGallery(gals);
      setInquiries(inqs);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (adminUser && token) {
      refreshData();
    }
  }, [adminUser, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSubmitting(true);
    try {
      const data = await api.login(username, password);
      localStorage.setItem('stylishAdminToken', data.token);
      setToken(data.token);
      setAdminUser(data);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('stylishAdminToken');
    setToken('');
    setAdminUser(null);
  };

  // Product actions
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      room: 'Living Room',
      category: 'Sofas',
      description: '',
      material: '',
      specifications: '',
      price: '',
      featured: false,
      status: 'active',
    });
    setProductImages([]);
    setShowProductModal(true);
  };

  const openEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      room: prod.room,
      category: prod.category,
      description: prod.description || '',
      material: prod.material || '',
      specifications: prod.specifications || '',
      price: prod.price ? String(prod.price) : '',
      featured: prod.featured || false,
      status: prod.status || 'active',
    });
    setProductImages([]);
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('name', productForm.name);
      fd.append('room', productForm.room);
      fd.append('category', productForm.category);
      fd.append('description', productForm.description);
      fd.append('material', productForm.material);
      fd.append('specifications', productForm.specifications);
      if (productForm.price) fd.append('price', productForm.price);
      fd.append('featured', productForm.featured);
      fd.append('status', productForm.status);

      if (productImages && productImages.length > 0) {
        Array.from(productImages).forEach((img) => {
          fd.append('images', img);
        });
      }

      if (editingProduct) {
        await api.updateProduct(editingProduct._id, fd, token);
        setActionMessage('Product updated successfully.');
      } else {
        await api.createProduct(fd, token);
        setActionMessage('Product created successfully.');
      }

      setShowProductModal(false);
      refreshData();
    } catch (err) {
      alert(err.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    try {
      await api.deleteProduct(id, token);
      setActionMessage('Product deleted.');
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Category actions
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('name', categoryForm.name);
      fd.append('description', categoryForm.description);
      if (categoryImage) {
        fd.append('image', categoryImage);
      }
      await api.createCategory(fd, token);
      setActionMessage('Category created successfully.');
      setShowCategoryModal(false);
      setCategoryForm({ name: '', description: '' });
      setCategoryImage(null);
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.deleteCategory(id, token);
      setActionMessage('Category removed.');
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Gallery actions
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galleryImage) {
      alert('Please choose an image file for the gallery');
      return;
    }
    try {
      const fd = new FormData();
      fd.append('title', galleryForm.title);
      fd.append('category', galleryForm.category);
      fd.append('caption', galleryForm.caption);
      fd.append('image', galleryImage);

      await api.createGalleryItem(fd, token);
      setActionMessage('Gallery photo added successfully.');
      setShowGalleryModal(false);
      setGalleryForm({ title: '', category: 'Living Room', caption: '' });
      setGalleryImage(null);
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await api.deleteGalleryItem(id, token);
      setActionMessage('Gallery photo removed.');
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Inquiry actions
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      await api.updateInquiryStatus(id, newStatus, token);
      setActionMessage(`Inquiry status updated to ${newStatus}`);
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this customer inquiry?')) return;
    try {
      await api.deleteInquiry(id, token);
      setActionMessage('Inquiry record deleted.');
      refreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <Loader2 className="w-8 h-8 animate-spin text-charcoal" />
      </div>
    );
  }

  // If not logged in, render Admin Login Card
  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
        <div className="max-w-md w-full bg-canvas border border-stone-200 p-8 sm:p-10 shadow-lift">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 block mb-1">
              Store Management
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-normal">
              Admin Portal
            </h2>
            <p className="text-xs text-stone-500 mt-2 font-light">
              Sign in to manage showroom inventory, gallery, categories, and customer inquiries.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-stone-100 border border-stone-300 text-charcoal text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-stone-700 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 disabled:opacity-50 transition-colors mt-2"
            >
              {loginSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100 text-center text-xs text-stone-400 font-mono">
            Stylish Furniture &bull; Lahore
          </div>
        </div>
      </div>
    );
  }

  // Counts
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-stone-50 text-charcoal flex flex-col">
      
      {/* Top Admin Header */}
      <header className="bg-canvas border-b border-stone-200 py-4 px-4 sm:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl text-charcoal">
              Stylish Furniture
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-stone-100 px-2 py-0.5 text-stone-600 border border-stone-200">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden sm:inline text-stone-500">
              User: <strong className="text-charcoal">{adminUser.username}</strong>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 hover:border-charcoal text-stone-700 hover:text-charcoal transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div className="bg-charcoal text-canvas text-xs font-mono py-2 px-4 text-center animate-in fade-in">
          {actionMessage}
        </div>
      )}

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Image },
            { id: 'inquiries', label: `Inquiries (${inquiries.length}${newInquiriesCount > 0 ? ` - ${newInquiriesCount} New` : ''})`, icon: Inbox },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase font-mono tracking-wider transition-colors border ${
                  isActive
                    ? 'bg-charcoal text-canvas border-charcoal'
                    : 'bg-canvas text-stone-600 border-stone-200 hover:border-charcoal'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-canvas border border-stone-200 p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Total Products</span>
                <div className="text-3xl font-serif text-charcoal">{products.length}</div>
                <button
                  onClick={() => { setActiveTab('products'); openAddProduct(); }}
                  className="text-xs text-stone-600 hover:text-charcoal underline font-mono"
                >
                  + Add Product
                </button>
              </div>

              <div className="bg-canvas border border-stone-200 p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Active Categories</span>
                <div className="text-3xl font-serif text-charcoal">{categories.length}</div>
                <button
                  onClick={() => setActiveTab('categories')}
                  className="text-xs text-stone-600 hover:text-charcoal underline font-mono"
                >
                  Manage Categories
                </button>
              </div>

              <div className="bg-canvas border border-stone-200 p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Gallery Items</span>
                <div className="text-3xl font-serif text-charcoal">{gallery.length}</div>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-xs text-stone-600 hover:text-charcoal underline font-mono"
                >
                  Upload Visuals
                </button>
              </div>

              <div className="bg-canvas border border-stone-200 p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">Customer Inquiries</span>
                <div className="text-3xl font-serif text-charcoal">{inquiries.length}</div>
                <span className="text-xs font-mono text-stone-500">
                  {newInquiriesCount} waiting review
                </span>
              </div>
            </div>

            {/* Quick Inquiries Preview */}
            <div className="bg-canvas border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-charcoal">Recent Inquiries</h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-mono uppercase text-charcoal hover:underline"
                >
                  View All &rarr;
                </button>
              </div>

              {inquiries.length === 0 ? (
                <p className="text-xs font-mono text-stone-400 py-6 text-center">No customer inquiries yet.</p>
              ) : (
                <div className="divide-y divide-stone-100">
                  {inquiries.slice(0, 5).map((inq) => (
                    <div key={inq._id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-charcoal">{inq.name}</strong> ({inq.phone})
                        <span className="text-stone-400 ml-2 font-mono">{inq.room || 'General'}</span>
                      </div>
                      <span className={`font-mono px-2 py-0.5 border ${
                        inq.status === 'New' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-charcoal font-normal">Showroom Products</h3>
                <p className="text-xs text-stone-500 font-mono">Create, modify, or archive showroom catalog items.</p>
              </div>
              <button
                type="button"
                onClick={openAddProduct}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-charcoal text-canvas text-xs uppercase font-mono tracking-widest hover:bg-stone-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="p-12 text-center bg-canvas border border-dashed border-stone-300">
                <p className="text-sm text-stone-500 mb-3">No products in database yet.</p>
                <button
                  onClick={openAddProduct}
                  className="px-4 py-2 bg-charcoal text-canvas text-xs uppercase font-mono"
                >
                  Create First Product
                </button>
              </div>
            ) : (
              <div className="bg-canvas border border-stone-200 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 uppercase font-mono text-[10px] text-stone-500 tracking-wider">
                    <tr>
                      <th className="p-3">Preview</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Room</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Featured</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-stone-50/50">
                        <td className="p-3">
                          <img
                            src={p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80'}
                            alt={p.name}
                            className="w-12 h-12 object-cover border border-stone-200"
                          />
                        </td>
                        <td className="p-3 font-sans font-medium text-charcoal">{p.name}</td>
                        <td className="p-3 text-stone-600">{p.room}</td>
                        <td className="p-3 text-stone-600">{p.category}</td>
                        <td className="p-3 text-stone-600">{p.price ? `PKR ${p.price}` : 'Unpriced'}</td>
                        <td className="p-3">
                          {p.featured ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">Yes</span>
                          ) : (
                            <span className="text-stone-400">No</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 border ${
                            p.status === 'active' ? 'bg-stone-50 text-stone-700 border-stone-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => openEditProduct(p)}
                            className="p-1 text-stone-600 hover:text-charcoal"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4 inline" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p._id)}
                            className="p-1 text-stone-400 hover:text-rose-600"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-charcoal font-normal">Product Categories</h3>
                <p className="text-xs text-stone-500 font-mono">Organize products into functional catalog groups.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-charcoal text-canvas text-xs uppercase font-mono tracking-widest hover:bg-stone-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c._id} className="bg-canvas border border-stone-200 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg text-charcoal mb-1">{c.name}</h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">{c.description || 'No description entered.'}</p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-stone-400">{c.status}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(c._id)}
                      className="text-xs text-stone-400 hover:text-rose-600 font-mono"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-charcoal font-normal">Showroom Gallery Photos</h3>
                <p className="text-xs text-stone-500 font-mono">Upload high resolution interior inspiration and furniture photography.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowGalleryModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-charcoal text-canvas text-xs uppercase font-mono tracking-widest hover:bg-stone-800"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Add Photo</span>
              </button>
            </div>

            {gallery.length === 0 ? (
              <div className="p-12 text-center bg-canvas border border-dashed border-stone-300">
                <p className="text-sm text-stone-500 mb-3">No gallery images uploaded yet.</p>
                <button
                  onClick={() => setShowGalleryModal(true)}
                  className="px-4 py-2 bg-charcoal text-canvas text-xs uppercase font-mono"
                >
                  Upload First Image
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g._id} className="bg-canvas border border-stone-200 overflow-hidden group relative">
                    <div className="aspect-[4/3] bg-stone-100">
                      <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <h5 className="font-serif text-sm text-charcoal truncate">{g.title}</h5>
                      <span className="text-[10px] font-mono text-stone-400 block">{g.category}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteGallery(g._id)}
                      className="absolute top-2 right-2 p-1.5 bg-canvas/90 text-stone-600 hover:text-rose-600 border border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="font-serif text-2xl text-charcoal font-normal">Customer Furniture Inquiries</h3>
              <p className="text-xs text-stone-500 font-mono">Real-time requests received from website visitors.</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-canvas border border-dashed border-stone-300">
                <p className="text-sm text-stone-500">No customer inquiries yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className="bg-canvas border border-stone-200 p-6 space-y-4 hover:border-charcoal transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <h4 className="font-serif text-xl text-charcoal">{inq.name}</h4>
                        <div className="text-xs font-mono text-stone-500 mt-0.5">
                          Phone: <a href={`tel:${inq.phone}`} className="text-charcoal hover:underline font-semibold">{inq.phone}</a> &bull; Received {new Date(inq.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-stone-400">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                          className="px-2.5 py-1 text-xs font-mono border border-stone-300 bg-stone-50 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 ml-2"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-stone-600">
                      <div>
                        <span className="text-stone-400 block uppercase text-[10px]">Room Target:</span>
                        <span>{inq.room || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block uppercase text-[10px]">Category:</span>
                        <span>{inq.furnitureCategory || 'Not specified'}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block uppercase text-[10px]">Product Inquired:</span>
                        <span>{inq.productName || 'General Inquiry'}</span>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-4 border border-stone-100">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                        Customer Message
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-line leading-relaxed">
                        {inq.message}
                      </p>
                    </div>

                    {inq.referenceImage && (
                      <div className="pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                          Attached Reference Image
                        </span>
                        <a
                          href={inq.referenceImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border border-stone-200 overflow-hidden hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={inq.referenceImage}
                            alt="Customer Reference"
                            className="h-28 w-auto object-cover"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-canvas border border-stone-300 max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
              <h3 className="font-serif text-2xl text-charcoal">
                {editingProduct ? 'Edit Furniture Piece' : 'Add Furniture Piece'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="text-xs uppercase font-mono text-stone-400 hover:text-charcoal"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-stone-600 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Sculptural Lounge Sofa"
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 font-sans text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-stone-600 mb-1">Room Assignment *</label>
                  <select
                    value={productForm.room}
                    onChange={(e) => setProductForm({ ...productForm, room: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                  >
                    {ROOM_FILTER_OPTIONS.filter((r) => r !== 'All').map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-stone-600 mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                  >
                    {CATALOG_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-stone-600 mb-1">Price (Optional - Leave blank to hide)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="e.g. 45000"
                    className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-stone-600 mb-1">Status</label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="archived">Archived (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase text-stone-600 mb-1">Material / Finish</label>
                <input
                  type="text"
                  value={productForm.material}
                  onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                  placeholder="e.g. Solid Sheesham Wood / Textured Linen"
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-stone-600 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed craftsmanship and design notes..."
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs font-sans focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-stone-600 mb-1">Dimensions & Specifications</label>
                <textarea
                  rows={2}
                  value={productForm.specifications}
                  onChange={(e) => setProductForm({ ...productForm, specifications: e.target.value })}
                  placeholder="Dimensions: 84in W x 36in D x 32in H..."
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={productForm.featured}
                  onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="w-4 h-4 text-charcoal border-stone-300 rounded focus:ring-0"
                />
                <label htmlFor="featured" className="uppercase text-stone-700 cursor-pointer">
                  Feature in Homepage Spotlight
                </label>
              </div>

              {/* Upload Images */}
              <div className="pt-2 border-t border-stone-200">
                <label className="block uppercase text-stone-600 mb-1">Product Images (Upload up to 8)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setProductImages(e.target.files)}
                  className="w-full text-xs text-stone-600 file:mr-4 file:py-1.5 file:px-3 file:border file:border-stone-300 file:text-xs file:bg-stone-50 file:text-charcoal cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-stone-300 uppercase hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-charcoal text-canvas uppercase tracking-wider hover:bg-stone-800"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CATEGORY */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas border border-stone-300 max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-serif text-xl text-charcoal mb-4">Add Category</h3>
            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-stone-600 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Accent Seating"
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block uppercase text-stone-600 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Category purpose..."
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs font-sans focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-stone-300 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-charcoal text-canvas uppercase hover:bg-stone-800"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas border border-stone-300 max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-serif text-xl text-charcoal mb-4">Upload Gallery Photo</h3>
            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-stone-600 mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Lounge Composition in Warm Tone"
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block uppercase text-stone-600 mb-1">Category Tag</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs focus:outline-none"
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Office">Office</option>
                  <option value="Details">Details</option>
                </select>
              </div>
              <div>
                <label className="block uppercase text-stone-600 mb-1">Caption / Notes</label>
                <textarea
                  rows={2}
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  placeholder="Photo caption or joinery detail..."
                  className="w-full px-3 py-2 border border-stone-300 bg-stone-50 text-xs font-sans focus:outline-none"
                />
              </div>
              <div>
                <label className="block uppercase text-stone-600 mb-1">Image File *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setGalleryImage(e.target.files[0])}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-1 file:px-3 file:border file:border-stone-300 file:text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowGalleryModal(false)}
                  className="px-4 py-2 border border-stone-300 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-charcoal text-canvas uppercase hover:bg-stone-800"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
