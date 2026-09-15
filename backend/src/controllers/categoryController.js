import Category from '../models/Category.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const { status } = req.query;

    if (isConnectedToMongo) {
      const query = status ? { status } : {};
      const categories = await Category.find(query).sort({ name: 1 });
      return res.json(categories);
    }

    let items = jsonStore.get('categories');
    if (status) {
      items = items.filter((c) => c.status === status);
    }
    items.sort((a, b) => a.name.localeCompare(b.name));
    res.json(items);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    const catData = {
      name: name.trim(),
      description: description || '',
      image,
      status: status || 'active',
    };

    if (isConnectedToMongo) {
      const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name.trim()}$`, 'i') } });
      if (existing) {
        return res.status(400).json({ message: 'A category with this name already exists' });
      }
      const category = new Category(catData);
      const savedCategory = await category.save();
      return res.status(201).json(savedCategory);
    }

    const existing = jsonStore.findOne('categories', (c) => c.name.toLowerCase() === name.trim().toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'A category with this name already exists' });
    }

    const saved = jsonStore.insert('categories', catData);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ message: 'Failed to create category', error: error.message });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    let image = undefined;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    if (isConnectedToMongo) {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      if (name) category.name = name.trim();
      if (description !== undefined) category.description = description;
      if (status !== undefined) category.status = status;
      if (image !== undefined) category.image = image;

      const updated = await category.save();
      return res.json(updated);
    }

    const updates = {};
    if (name) updates.name = name.trim();
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (image !== undefined) updates.image = image;

    const updated = jsonStore.update('categories', req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ message: 'Failed to update category', error: error.message });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await Category.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Category deleted successfully' });
    }

    const success = jsonStore.delete('categories', req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category', error: error.message });
  }
};
