# Stylish Furniture — Modern Furniture Marketplace & Room-Based Platform

A full-stack, production-ready web application built for **Stylish Furniture**, a real furniture showroom located in Nagra Town Lahore, Pakistan.

---

## 🏢 Business Information

- **Business Name:** Stylish Furniture
- **Category:** Shop / Supermarket / Furniture Store
- **Contact Number:** `+92 305 8373021` (Direct click-to-call: `tel:+923058373021`)
- **Showroom Address:** G7MH+747 stylish furniture, Nagra Rd, Nagra Town Lahore, 54000, Pakistan
- **Social Media:** None provided (no fake accounts or links)
- **Primary Theme:** White / clean / modern / premium (`#FFFFFF` dominant with subtle `#FAFAF8`, `#F3F1ED`, `#E7E3DD`, `#242424`)

---

## 🎨 Unique Design Concept

**"Modern Furniture Marketplace + Room-Based Shopping Experience"**

- **Editorial Split-Screen Hero**: Left editorial typography and CTAs ("Furniture That Shapes Your Space.") with right architectural visual and floating interactive room labels (`LIVING`, `BEDROOM`, `DINING`).
- **Interactive Room Explorer**: `01 — Living Room`, `02 — Bedroom`, `03 — Dining Room`, `04 — Office` with hover zoom, subtle text translation, and arrow animations.
- **Asymmetric Furniture Catalog**: Mixed layouts combining large featured showcases, compact cards, and horizontal scrolling product rails.
- **Dedicated Room Pages**: Unique layouts for Living Room, Bedroom, Dining Room, and Office furniture.
- **Strict Factual Data Policy**: Zero fake reviews, fake ratings, fake prices, fake stock, fake team members, or fake certifications.
- **Responsive Viewports**: Optimized for mobile, tablet, desktop, and ultra-wide screens (320px to 1920px).

---

## 🛠 Technology Stack

### Frontend (`/frontend`)
- **React 18** + **Vite 6**
- **Tailwind CSS** with bespoke stone/charcoal color palette
- **React Router DOM v6** (11 required pages + Admin Dashboard + 404 handler)
- **Lucide React** icons

### Backend (`/backend`)
- **Node.js** & **Express.js** REST API
- **MongoDB** & **Mongoose**
- **Automatic Embedded Mongo fallback** (`mongodb-memory-server`) if local MongoDB service is inactive
- **Multer** for local file storage abstraction (`/uploads`)
- **JWT** Authentication & **Bcrypt** password hashing for the Admin Dashboard

---

## 📂 Project Structure

```
/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Products, Categories, Gallery, Inquiries, Auth
│   │   ├── middleware/    # Auth (JWT) & Upload (Multer)
│   │   ├── models/        # Product, Category, Gallery, Inquiry, User
│   │   ├── routes/        # Express REST API routes
│   │   ├── db.js          # Resilient Mongoose connection
│   │   ├── seed.js        # Initial categories & admin user seeder
│   │   └── server.js      # Main Express application entry
│   ├── uploads/           # Uploaded images directory
│   ├── .env               # Environment configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/           # Centralized API client
│   │   ├── components/    # Navbar, SecondaryRoomStrip, Footer, ProductCard,
│   │   │                  # RoomExplorer, FurnitureSpotlight, InquiryForm,
│   │   │                  # EmptyState, LoadingSkeleton, Lightbox
│   │   ├── data/          # Verified business info & room definitions
│   │   ├── pages/         # 11 Required Pages + Admin Dashboard + 404
│   │   │                  # HomePage, AboutPage, FurnitureCatalogPage,
│   │   │                  # LivingRoomPage, BedroomPage, DiningRoomPage,
│   │   │                  # OfficePage, ProductDetailPage, GalleryPage,
│   │   │                  # ContactPage, InquiryPage, AdminDashboard, NotFoundPage
│   │   ├── App.jsx        # Routing configuration
│   │   ├── main.jsx       # React mount
│   │   └── index.css      # Base styling and typography
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

In root or in both folders:
```bash
# In backend
cd backend
npm install

# In frontend
cd ../frontend
npm install
```

### 2. Start Backend Server
```bash
cd backend
npm start
```
The server will run on port `5000` (http://localhost:5000).

### 3. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Open http://localhost:3000 in your browser.

---

## 🔐 Admin Dashboard

Access the admin dashboard at:
```
http://localhost:3000/admin
```
- **Default Username**: `admin`
- **Default Password**: `stylishadmin2026` (configurable in `backend/.env`)

### Admin Capabilities:
- **Products**: Add, edit, delete furniture items with multiple photo uploads, room assignment, material details, and optional price.
- **Categories**: Manage browsing categories.
- **Gallery**: Upload and curate high-resolution interior photographs.
- **Inquiries**: Review real customer inquiries submitted from the website, inspect uploaded reference photos, and update status (`New`, `Contacted`, `In Progress`, `Completed`).
