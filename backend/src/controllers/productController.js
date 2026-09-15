import Product from '../models/Product.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

// @desc    Get all products with filters & sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { search, category, room, featured, sort, status } = req.query;

    if (isConnectedToMongo) {
      const query = {};
      if (status) {
        query.status = status;
      } else {
        query.status = 'active';
      }

      if (search) {
        query.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } },
          { material: { $regex: search.trim(), $options: 'i' } },
        ];
      }

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (room && room !== 'All') {
        query.room = { $regex: new RegExp(`^${room}$`, 'i') };
      }

      if (featured === 'true') {
        query.featured = true;
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'name-asc') {
        sortOption = { name: 1 };
      } else if (sort === 'name-desc') {
        sortOption = { name: -1 };
      } else if (sort === 'oldest') {
        sortOption = { createdAt: 1 };
      }

      const products = await Product.find(query).sort(sortOption);
      return res.json(products);
    }

    // Fallback store
    let items = jsonStore.get('products');

    if (status) {
      items = items.filter((p) => p.status === status);
    } else {
      items = items.filter((p) => p.status === 'active');
    }

    if (search) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      items = items.filter((p) => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    if (room && room !== 'All') {
      items = items.filter((p) => p.room && p.room.toLowerCase() === room.toLowerCase());
    }

    if (featured === 'true') {
      items = items.filter((p) => p.featured === true);
    }

    if (sort === 'name-asc') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      items.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'oldest') {
      items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(items);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error retrieving products', error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }

    const product = jsonStore.findById('products', req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ message: 'Server error retrieving product', error: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      room,
      description,
      material,
      specifications,
      price,
      featured,
      status,
    } = req.body;

    if (!name || !category || !room) {
      return res.status(400).json({ message: 'Name, Category, and Room are required' });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const productData = {
      name: name.trim(),
      category: category.trim(),
      room,
      description: description || '',
      images,
      material: material || '',
      specifications: specifications || '',
      price: price ? Number(price) : null,
      featured: featured === 'true' || featured === true,
      status: status || 'active',
    };

    if (isConnectedToMongo) {
      const product = new Product(productData);
      const savedProduct = await product.save();
      return res.status(201).json(savedProduct);
    }

    const saved = jsonStore.insert('products', productData);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      room,
      description,
      material,
      specifications,
      price,
      featured,
      status,
      existingImages,
    } = req.body;

    if (isConnectedToMongo) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (name) product.name = name;
      if (category) product.category = category;
      if (room) product.room = room;
      if (description !== undefined) product.description = description;
      if (material !== undefined) product.material = material;
      if (specifications !== undefined) product.specifications = specifications;
      if (price !== undefined) product.price = price ? Number(price) : null;
      if (featured !== undefined) product.featured = featured === 'true' || featured === true;
      if (status !== undefined) product.status = status;

      let updatedImages = existingImages
        ? Array.isArray(existingImages) ? existingImages : [existingImages]
        : [...product.images];

      if (req.files && req.files.length > 0) {
        const newFiles = req.files.map((file) => `/uploads/${file.filename}`);
        updatedImages = [...updatedImages, ...newFiles];
      }
      product.images = updatedImages;

      const updated = await product.save();
      return res.json(updated);
    }

    const product = jsonStore.findById('products', req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (category) updates.category = category;
    if (room) updates.room = room;
    if (description !== undefined) updates.description = description;
    if (material !== undefined) updates.material = material;
    if (specifications !== undefined) updates.specifications = specifications;
    if (price !== undefined) updates.price = price ? Number(price) : null;
    if (featured !== undefined) updates.featured = featured === 'true' || featured === true;
    if (status !== undefined) updates.status = status;

    let updatedImages = existingImages
      ? Array.isArray(existingImages) ? existingImages : [existingImages]
      : [...product.images];

    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map((file) => `/uploads/${file.filename}`);
      updatedImages = [...updatedImages, ...newFiles];
    }
    updates.images = updatedImages;

    const updated = jsonStore.update('products', req.params.id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await Product.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Product removed successfully' });
    }

    const success = jsonStore.delete('products', req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
