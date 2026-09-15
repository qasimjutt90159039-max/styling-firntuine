import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import SecondaryRoomStrip from '../components/SecondaryRoomStrip';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function DiningRoomPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dining Room Furniture | Stylish Furniture Lahore";

    const fetchDiningProducts = async () => {
      try {
        const data = await api.getProducts({ room: 'Dining Room', status: 'active' });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching dining room furniture:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiningProducts();
  }, []);

  return (
    <div className="bg-canvas">
      {/* Secondary Room Strip */}
      <SecondaryRoomStrip activeRoom="Dining Room" />

      {/* Large Dining Visual with Asymmetric Layout */}
      <section className="py-12 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-200/50 text-[10px] font-mono uppercase tracking-widest text-stone-700">
                <UtensilsCrossed className="w-3 h-3" />
                <span>Room Collection 03</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
                Dining Room
              </h1>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
                Communal dining surfaces, sculpted dining chairs, and display sideboards. Thoughtfully proportioned for celebratory dinners and everyday nourishment.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-stone-500">
                <span className="px-3 py-1 bg-canvas border border-stone-200">Dining Tables</span>
                <span className="px-3 py-1 bg-canvas border border-stone-200">Dining Chairs</span>
                <span className="px-3 py-1 bg-canvas border border-stone-200">Buffets & Sideboards</span>
              </div>
            </div>

            <div className="lg:col-span-7 aspect-[16/10] bg-stone-200 overflow-hidden border border-stone-300">
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80"
                alt="Dining room table and chairs layout"
                className="w-full h-full object-cover reveal-zoom"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Asymmetric Product Layout / Rail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSkeleton count={4} type="card" />
        ) : products.length === 0 ? (
          <EmptyState
            title="Dining room furniture will appear here."
            message="Dining tables, seating arrangements, and credenzas are regularly added to our catalog. Inquire for 6-seater, 8-seater, or custom banquet dimensions."
            actionLink="/inquiry?room=Dining Room"
            actionText="Request Dining Room Furniture"
          />
        ) : (
          <div className="space-y-16">
            
            {/* Dining furniture explorer grid */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
                <h3 className="font-serif text-2xl text-charcoal font-normal">
                  Dining Room Collection
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {products.length} {products.length === 1 ? 'Piece' : 'Pieces'}
                </span>
              </div>

              {/* Asymmetric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item, idx) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    variant={idx % 3 === 0 ? 'default' : 'compact'}
                  />
                ))}
              </div>
            </div>

            {/* Product Rail for Dining */}
            {products.length > 2 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-xl text-charcoal">
                    Dining Furniture Carousel
                  </h4>
                  <span className="text-xs font-mono text-stone-400">
                    Scroll horizontally &rarr;
                  </span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {products.map((p) => (
                    <ProductCard key={`dining-rail-${p._id}`} product={p} variant="rail" />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Inquiry CTA */}
      <section className="py-16 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
            Custom Dining Solutions
          </span>
          <h3 className="font-serif text-3xl text-charcoal font-normal">
            Looking for a specific timber finish or table length?
          </h3>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            Contact Stylish Furniture in Nagra Town Lahore for bespoke table crafting and chair upholstery options.
          </p>
          <div className="pt-2">
            <Link
              to="/inquiry?room=Dining Room"
              className="inline-flex items-center gap-2 px-8 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
            >
              <span>Submit Dining Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
