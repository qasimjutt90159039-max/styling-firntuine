import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, RefreshCw } from 'lucide-react';
import { api } from '../api/client';
import { CATALOG_CATEGORIES, ROOM_FILTER_OPTIONS } from '../data/business';
import ProductCard from '../components/ProductCard';
import SecondaryRoomStrip from '../components/SecondaryRoomStrip';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function FurnitureCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters from URL or state
  const selectedRoom = searchParams.get('room') || 'All';
  const selectedCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  useEffect(() => {
    document.title = "Furniture Catalog | Stylish Furniture Lahore";
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts({
        room: selectedRoom,
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        status: 'active',
      });
      setProducts(data);
    } catch (err) {
      console.error('Catalog fetch error:', err);
      setError(err.message || 'Failed to retrieve furniture products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedRoom, selectedCategory, searchTerm, sortBy]);

  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const inputVal = e.target.elements.search.value;
    updateFilter('search', inputVal);
  };

  return (
    <div className="bg-canvas min-h-screen">
      
      {/* Secondary Sticky Room Strip */}
      <SecondaryRoomStrip
        activeRoom={selectedRoom}
        onSelectRoom={(r) => updateFilter('room', r)}
      />

      {/* Catalog Header */}
      <section className="py-12 sm:py-16 border-b border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
              Browse Entire Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              Furniture Catalog
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-3 font-light leading-relaxed">
              Explore furniture pieces available at Stylish Furniture, categorized by function and room architecture. Filter by space, category, or search directly for specific items.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className="border-b border-stone-200 bg-canvas sticky top-16 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <input
                type="text"
                name="search"
                defaultValue={searchTerm}
                placeholder="Search by furniture name or material..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 text-xs text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors font-mono"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-stone-400">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="px-2.5 py-2 bg-stone-50 border border-stone-200 text-xs text-charcoal focus:outline-none focus:border-charcoal font-mono"
                >
                  {CATALOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Filter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-stone-400">Room:</span>
                <select
                  value={selectedRoom}
                  onChange={(e) => updateFilter('room', e.target.value)}
                  className="px-2.5 py-2 bg-stone-50 border border-stone-200 text-xs text-charcoal focus:outline-none focus:border-charcoal font-mono"
                >
                  {ROOM_FILTER_OPTIONS.map((room) => (
                    <option key={room} value={room}>
                      {room}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-stone-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="px-2.5 py-2 bg-stone-50 border border-stone-200 text-xs text-charcoal focus:outline-none focus:border-charcoal font-mono"
                >
                  <option value="newest">Newest First</option>
                  <option value="name-asc">Name (A &rarr; Z)</option>
                  <option value="name-desc">Name (Z &rarr; A)</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Reset Filters */}
              {(selectedRoom !== 'All' || selectedCategory !== 'All' || searchTerm) && (
                <button
                  onClick={() => setSearchParams({})}
                  className="text-xs text-stone-500 hover:text-charcoal underline font-mono ml-auto lg:ml-2"
                >
                  Clear Filters
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Catalog Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-sm text-stone-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="px-4 py-2 border border-charcoal text-xs uppercase font-mono tracking-widest"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title="Furniture collection will appear here."
            message="No products match your current filters. Adjust your room or category criteria, or submit a request directly to our showroom."
            actionLink="/inquiry"
            actionText="Request Information"
          />
        ) : (
          <div className="space-y-16">
            
            {/* Asymmetric layout combination */}
            {/* Top Featured item if list is large */}
            {products.length >= 4 && (
              <div>
                <ProductCard product={products[0]} variant="featured" />
              </div>
            )}

            {/* Standard and Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(products.length >= 4 ? products.slice(1) : products).map((product, index) => {
                // Alternating card layout for dynamic asymmetric feel
                const variant = index % 4 === 1 ? 'compact' : 'default';
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    variant={variant}
                  />
                );
              })}
            </div>

            {/* Horizontal Rail for related exploration if multiple items */}
            {products.length > 2 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
                    Quick Rail View
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    Scroll horizontally &rarr;
                  </span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {products.map((p) => (
                    <ProductCard key={`rail-${p._id}`} product={p} variant="rail" />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
}
