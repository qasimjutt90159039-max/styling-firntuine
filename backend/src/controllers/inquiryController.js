import Inquiry from '../models/Inquiry.js';
import { isConnectedToMongo } from '../db.js';
import { jsonStore } from '../store/jsonStore.js';

// @desc    Submit customer furniture inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const { name, phone, furnitureCategory, room, productName, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Customer name is required' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ message: 'Valid phone number is required' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Inquiry message or request details are required' });
    }

    let referenceImage = '';
    if (req.file) {
      referenceImage = `/uploads/${req.file.filename}`;
    } else if (req.body.referenceImage) {
      referenceImage = req.body.referenceImage;
    }

    const inqData = {
      name: name.trim(),
      phone: phone.trim(),
      furnitureCategory: furnitureCategory || '',
      room: room || '',
      productName: productName || '',
      message: message.trim(),
      referenceImage,
      status: 'New',
    };

    if (isConnectedToMongo) {
      const inquiry = new Inquiry(inqData);
      const saved = await inquiry.save();
      return res.status(201).json({
        message: 'Your inquiry has been submitted successfully.',
        inquiry: saved,
      });
    }

    const saved = jsonStore.insert('inquiries', inqData);
    res.status(201).json({
      message: 'Your inquiry has been submitted successfully.',
      inquiry: saved,
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      message: 'Failed to submit your inquiry. Please try again or call directly.',
      error: error.message,
    });
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
export const getInquiries = async (req, res) => {
  try {
    const { status } = req.query;

    if (isConnectedToMongo) {
      const query = status && status !== 'All' ? { status } : {};
      const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
      return res.json(inquiries);
    }

    let items = jsonStore.get('inquiries');
    if (status && status !== 'All') {
      items = items.filter((i) => i.status === status);
    }
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(items);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Failed to retrieve inquiries', error: error.message });
  }
};

// @desc    Get single inquiry
// @route   GET /api/inquiries/:id
// @access  Private/Admin
export const getInquiryById = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      return res.json(inquiry);
    }

    const inquiry = jsonStore.findById('inquiries', req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(inquiry);
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({ message: 'Failed to retrieve inquiry', error: error.message });
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
export const updateInquiry = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['New', 'Contacted', 'In Progress', 'Completed'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${allowed.join(', ')}` });
    }

    if (isConnectedToMongo) {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      if (status) inquiry.status = status;
      const updated = await inquiry.save();
      return res.json(updated);
    }

    const updated = jsonStore.update('inquiries', req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ message: 'Failed to update inquiry status', error: error.message });
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
export const deleteInquiry = async (req, res) => {
  try {
    if (isConnectedToMongo) {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found' });
      }
      await Inquiry.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Inquiry removed successfully' });
    }

    const success = jsonStore.delete('inquiries', req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry removed successfully' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ message: 'Failed to delete inquiry', error: error.message });
  }
};
