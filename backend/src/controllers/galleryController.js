import Gallery from '../models/Gallery.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;

    if (isConnectedToMongo) {
      const query = {};
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
      const items = await Gallery.find(query).sort({ createdAt: -1 });
      return res.json(items);
    }

    let items = jsonStore.get('gallery');
    if (category && category !== 'All') {
      items = items.filter((g) => g.category && g.category.toLowerCase() === category.toLowerCase());
    }
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'Failed to retrieve gallery images', error: error.message });
  }
};

// @desc    Create new gallery image
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, caption } = req.body;

    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    if (!image) {
      return res.status(400).json({ message: 'Image file or image URL is required' });
    }

    const itemData = {
      title: title ? title.trim() : 'Furniture Visual',
      image,
      category: category || 'General',
      caption: caption || '',
    };

    if (isConnectedToMongo) {
      const galleryItem = new Gallery(itemData);
      const saved = await galleryItem.save();
      return res.status(201).json(saved);
    }

    const saved = jsonStore.insert('gallery', itemData);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(400).json({ message: 'Failed to add gallery item', error: error.message });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryItem = async (req, res) => {
  try {
    const { title, category, caption } = req.body;
    let image = undefined;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    if (isConnectedToMongo) {
      const item = await Gallery.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Gallery item not found' });
      }

      if (title !== undefined) item.title = title.trim();
      if (category !== undefined) item.category = category;
      if (caption !== undefined) item.caption = caption;
      if (image !== undefined) item.image = image;

      const updated = await item.save();
      return res.json(updated);
    }

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (category !== undefined) updates.category = category;
    if (caption !== undefined) updates.caption = caption;
    if (image !== undefined) updates.image = image;

    const updated = jsonStore.update('gallery', req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(400).json({ message: 'Failed to update gallery item', error: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const item = await Gallery.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Gallery item not found' });
      }
      await Gallery.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Gallery item deleted successfully' });
    }

    const success = jsonStore.delete('gallery', req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Failed to delete gallery item', error: error.message });
  }
};
