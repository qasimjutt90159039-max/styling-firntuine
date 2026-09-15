import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FurnitureCatalogPage from './pages/FurnitureCatalogPage';
import LivingRoomPage from './pages/LivingRoomPage';
import BedroomPage from './pages/BedroomPage';
import DiningRoomPage from './pages/DiningRoomPage';
import OfficePage from './pages/OfficePage';
import ProductDetailPage from './pages/ProductDetailPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import InquiryPage from './pages/InquiryPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-canvas text-charcoal">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/furniture" element={<FurnitureCatalogPage />} />
          <Route path="/rooms/living-room" element={<LivingRoomPage />} />
          <Route path="/rooms/bedroom" element={<BedroomPage />} />
          <Route path="/rooms/dining-room" element={<DiningRoomPage />} />
          <Route path="/rooms/office" element={<OfficePage />} />
          <Route path="/furniture/:id" element={<ProductDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
