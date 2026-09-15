import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import Lightbox from '../components/Lightbox';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ZoomIn, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = "Furniture Gallery & Inspiration | Stylish Furniture Lahore";
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await api.getGallery(selectedCategory);
      setGalleryItems(data);
    } catch (err) {
      console.error('Failed to fetch gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const categories = ['All', 'Living Room', 'Bedroom', 'Dining Room', 'Office', 'Details'];

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <div className="bg-canvas min-h-screen">
      
      {/* Gallery Header */}
      <section className="py-14 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
              Visual Showcase
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
              Furniture Gallery
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-light leading-relaxed">
              Explore photography of our furniture pieces, interior compositions, joinery close-ups, and spatial styling. Click any image to view in high resolution.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider font-mono px-4 py-2 border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-charcoal text-canvas border-charcoal'
                    : 'bg-canvas text-stone-700 border-stone-200 hover:border-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Main Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : galleryItems.length === 0 ? (
          <EmptyState
            title="Gallery images will appear here."
            message="Curated interior visuals and furniture photography will be displayed here as added by our showroom team. Check back soon or visit our Lahore showroom."
            actionLink="/furniture"
            actionText="Browse Furniture Collection"
          />
        ) : (
          /* Asymmetric Masonry-style Grid with Large vertical, wide, and detail images */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
            {galleryItems.map((item, index) => {
              // Asymmetric span calculations
              let colSpan = 'lg:col-span-4';
              let aspect = 'aspect-[4/5]'; // vertical default

              if (index % 5 === 0) {
                colSpan = 'lg:col-span-8';
                aspect = 'aspect-[16/10]'; // wide image
              } else if (index % 5 === 1) {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-[3/4]'; // tall vertical
              } else if (index % 5 === 2) {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-square'; // detail close-up
              } else if (index % 5 === 3) {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-[4/3]';
              } else {
                colSpan = 'lg:col-span-4';
                aspect = 'aspect-[4/5]';
              }

              return (
                <div
                  key={item._id}
                  onClick={() => openLightbox(index)}
                  className={`${colSpan} group relative bg-stone-100 border border-stone-200 overflow-hidden cursor-pointer hover:border-charcoal transition-all duration-300`}
                >
                  <div className={`${aspect} w-full overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.title || 'Furniture piece'}
                      className="w-full h-full object-cover reveal-zoom"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-canvas">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-canvas/70 block">
                          {item.category || 'Showroom'}
                        </span>
                        <h4 className="font-serif text-lg font-normal">
                          {item.title}
                        </h4>
                      </div>
                      <div className="p-2 rounded-full bg-canvas/20 backdrop-blur-sm text-canvas">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && galleryItems[lightboxIndex] && (
        <Lightbox
          item={galleryItems[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={galleryItems.length > 1 ? prevLightbox : null}
          onNext={galleryItems.length > 1 ? nextLightbox : null}
        />
      )}

    </div>
  );
}
