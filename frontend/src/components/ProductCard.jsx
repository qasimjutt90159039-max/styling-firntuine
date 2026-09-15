import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageSquare, Layers } from 'lucide-react';

export default function ProductCard({ product, variant = 'default' }) {
  if (!product) return null;

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80';

  // Format price only if present in product and admin entered it
  const formattedPrice =
    product.price !== null && product.price !== undefined && !isNaN(product.price)
      ? `PKR ${Number(product.price).toLocaleString()}`
      : null;

  // Rail Variant (for horizontal product rails)
  if (variant === 'rail') {
    return (
      <div className="min-w-[280px] sm:min-w-[320px] bg-stone-50 border border-stone-200 group flex flex-col justify-between transition-all duration-300 hover:border-charcoal hover:shadow-subtle">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover reveal-zoom"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 bg-canvas/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-charcoal border border-stone-200">
            {product.category}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mb-1">
              {product.room}
            </div>
            <h4 className="font-serif text-lg text-charcoal group-hover:text-stone-700 transition-colors line-clamp-1">
              {product.name}
            </h4>
            {product.material && (
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                {product.material}
              </p>
            )}
            {formattedPrice && (
              <p className="text-xs font-mono font-medium text-charcoal mt-1">
                {formattedPrice}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
            <Link
              to={`/furniture/${product._id}`}
              className="text-stone-700 hover:text-charcoal font-medium inline-flex items-center gap-1"
            >
              Details <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to={`/inquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}&room=${encodeURIComponent(product.room)}`}
              className="text-[11px] uppercase tracking-wider text-stone-500 hover:text-charcoal font-mono"
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Compact Asymmetric Variant
  if (variant === 'compact') {
    return (
      <div className="bg-canvas border border-stone-200 group flex flex-col justify-between transition-all duration-300 hover:border-charcoal hover:shadow-subtle">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover reveal-zoom"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-canvas/90 px-2 py-0.5 text-[10px] font-mono uppercase text-stone-600 border border-stone-200">
            {product.room}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block">
                {product.category}
              </span>
              <h4 className="font-serif text-base text-charcoal group-hover:text-stone-700 transition-colors">
                {product.name}
              </h4>
            </div>
            {formattedPrice && (
              <span className="text-xs font-mono font-semibold text-charcoal">
                {formattedPrice}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <Link
              to={`/furniture/${product._id}`}
              className="text-xs text-charcoal hover:underline inline-flex items-center gap-1"
            >
              View Specifications <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link
              to={`/inquiry?product=${encodeURIComponent(product.name)}`}
              title="Request Information"
              className="p-1.5 text-stone-500 hover:text-charcoal hover:bg-stone-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Featured Large Variant
  if (variant === 'featured') {
    return (
      <div className="bg-stone-50 border border-stone-200 group grid grid-cols-1 md:grid-cols-12 overflow-hidden hover:border-charcoal transition-all duration-300">
        <div className="md:col-span-7 relative min-h-[320px] bg-stone-100 overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover reveal-zoom"
            loading="lazy"
          />
          <span className="absolute top-4 left-4 bg-charcoal text-canvas px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
            Featured Highlight
          </span>
        </div>

        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                {product.room}
              </span>
              <span className="text-stone-300">&bull;</span>
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                {product.category}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">
                {product.description}
              </p>
            )}

            {product.material && (
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>Material: {product.material}</span>
              </div>
            )}

            {formattedPrice && (
              <div className="pt-2 text-sm font-mono font-medium text-charcoal">
                Price: {formattedPrice}
              </div>
            )}
          </div>

          <div className="pt-6 flex items-center gap-3">
            <Link
              to={`/furniture/${product._id}`}
              className="flex-1 text-center py-2.5 bg-charcoal text-canvas text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
            >
              Explore Details
            </Link>
            <Link
              to={`/inquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}&room=${encodeURIComponent(product.room)}`}
              className="flex-1 text-center py-2.5 border border-charcoal text-charcoal text-xs uppercase tracking-widest hover:bg-stone-100 transition-colors"
            >
              Request Info
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Standard Default Card
  return (
    <div className="bg-canvas border border-stone-200 group flex flex-col justify-between transition-all duration-300 hover:border-charcoal hover:shadow-subtle">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover reveal-zoom"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-canvas/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-charcoal border border-stone-200">
          {product.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-charcoal/80 text-canvas px-2 py-0.5 text-[10px] font-mono uppercase">
          {product.room}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl text-charcoal group-hover:text-stone-700 transition-colors mb-1">
            {product.name}
          </h4>
          {product.description && (
            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
          {product.material && (
            <div className="text-[11px] text-stone-400 mt-2 font-mono">
              Finish: {product.material}
            </div>
          )}
          {formattedPrice && (
            <div className="text-sm font-mono font-medium text-charcoal mt-2">
              {formattedPrice}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
          <Link
            to={`/furniture/${product._id}`}
            className="flex-1 py-2 text-center text-xs uppercase tracking-wider font-medium text-charcoal border border-stone-300 hover:border-charcoal hover:bg-stone-50 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/inquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}&room=${encodeURIComponent(product.room)}`}
            className="px-3 py-2 text-center text-xs uppercase tracking-wider font-medium bg-stone-100 text-charcoal hover:bg-charcoal hover:text-canvas transition-colors"
            title="Request Information"
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  );
}
