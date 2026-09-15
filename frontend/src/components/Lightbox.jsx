import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-6 right-6 p-2 rounded-full text-canvas/80 hover:text-canvas hover:bg-canvas/10 transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous Image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-canvas/70 hover:text-canvas hover:bg-canvas/10 rounded-full transition-colors z-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-canvas/70 hover:text-canvas hover:bg-canvas/10 rounded-full transition-colors z-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image & Caption Content */}
      <div
        className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title || 'Furniture Gallery'}
          className="max-h-[75vh] w-auto max-w-full object-contain shadow-2xl border border-canvas/10"
        />

        <div className="mt-4 text-center text-canvas max-w-xl">
          <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">
            {item.category || 'Interior Visual'}
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-normal">
            {item.title}
          </h3>
          {item.caption && (
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              {item.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
