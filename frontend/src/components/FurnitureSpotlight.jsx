import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

export default function FurnitureSpotlight({ products = [], loading = false }) {
  if (loading) {
    return (
      <section className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 bg-stone-200 w-48 mb-6 animate-pulse" />
          <div className="h-96 bg-stone-200 w-full animate-pulse" />
        </div>
      </section>
    );
  }

  // Filter featured or take top products
  const featuredList = products.filter((p) => p.featured);
  const displayItems = featuredList.length > 0 ? featuredList : products;

  return (
    <section className="py-20 sm:py-28 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-stone-600" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Furniture Spotlight
            </h2>
          </div>
          <Link
            to="/furniture"
            className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-charcoal hover:underline"
          >
            <span>Explore All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Dynamic Display or Clean Empty State */}
        {displayItems.length === 0 ? (
          <EmptyState
            title="Furniture spotlight will appear here."
            message="Showroom spotlight items are curated by our store team. Explore our room collections or send an inquiry for custom pieces."
            actionLink="/inquiry"
            actionText="Request Information"
          />
        ) : (
          <div className="space-y-12">
            {/* Primary spotlight piece */}
            <ProductCard product={displayItems[0]} variant="featured" />

            {/* Secondary floating cards if more products exist */}
            {displayItems.length > 1 && (
              <div>
                <div className="text-xs uppercase font-mono tracking-widest text-stone-400 mb-4">
                  Additional Spotlights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayItems.slice(1, 4).map((item) => (
                    <ProductCard key={item._id} product={item} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
