import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');
const storeFile = path.join(dataDir, 'store.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const defaultData = {
  products: [],
  categories: [
    {
      _id: 'cat_1',
      name: 'Sofas',
      description: 'Living room seating, armchairs, and sectional couches for home relaxation.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_2',
      name: 'Beds',
      description: 'Solid frames, headboards, and bedroom sleep systems.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_3',
      name: 'Dining Furniture',
      description: 'Tables, dining chairs, and banquet seating setups.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_4',
      name: 'Tables',
      description: 'Coffee tables, side tables, console tables, and study desks.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_5',
      name: 'Chairs',
      description: 'Accent chairs, dining chairs, and ergonomic study seats.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_6',
      name: 'Storage',
      description: 'Wardrobes, media units, credenzas, and shelving systems.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: 'cat_7',
      name: 'Office Furniture',
      description: 'Desks, executive chairs, conference tables, and office storage.',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  gallery: [],
  inquiries: [],
  users: [
    {
      _id: 'user_admin',
      username: 'admin',
      password: bcrypt.hashSync('stylishadmin2026', 10),
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

function readData() {
  try {
    if (!fs.existsSync(storeFile)) {
      fs.writeFileSync(storeFile, JSON.stringify(defaultData, null, 2), 'utf-8');
      return JSON.parse(JSON.stringify(defaultData));
    }
    const raw = fs.readFileSync(storeFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading json store:', err);
    return JSON.parse(JSON.stringify(defaultData));
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(storeFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to json store:', err);
  }
}

function generateId() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

export const jsonStore = {
  get(collection) {
    const data = readData();
    return data[collection] || [];
  },

  find(collection, filterFn = () => true) {
    const items = this.get(collection);
    return items.filter(filterFn);
  },

  findById(collection, id) {
    const items = this.get(collection);
    return items.find((item) => String(item._id) === String(id)) || null;
  },

  findOne(collection, filterFn) {
    const items = this.get(collection);
    return items.find(filterFn) || null;
  },

  insert(collection, item) {
    const data = readData();
    if (!data[collection]) data[collection] = [];
    const newItem = {
      _id: item._id || generateId(),
      ...item,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data[collection].push(newItem);
    writeData(data);
    return newItem;
  },

  update(collection, id, updates) {
    const data = readData();
    if (!data[collection]) return null;
    const index = data[collection].findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    data[collection][index] = {
      ...data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    writeData(data);
    return data[collection][index];
  },

  delete(collection, id) {
    const data = readData();
    if (!data[collection]) return false;
    const initialLen = data[collection].length;
    data[collection] = data[collection].filter((item) => String(item._id) !== String(id));
    writeData(data);
    return data[collection].length < initialLen;
  },
};
