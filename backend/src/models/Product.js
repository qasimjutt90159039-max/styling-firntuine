import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    room: {
      type: String,
      required: [true, 'Room is required'],
      enum: [
        'Living Room',
        'Bedroom',
        'Dining Room',
        'Office',
        'Storage',
        'Furniture Essentials',
      ],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    material: {
      type: String,
      trim: true,
      default: '',
    },
    specifications: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);
