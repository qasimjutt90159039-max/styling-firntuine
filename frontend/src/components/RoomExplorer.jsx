import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ROOMS } from '../data/business';

export default function RoomExplorer() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const featuredRooms = ROOMS.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-200 pb-6 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
              Room-Based Shopping Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight font-normal">
              Choose Your Space.
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Navigate our furniture collection structured by interior space. Tailored proportions and cohesive styles for every room.
          </p>
        </div>

        {/* Room Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-6">
          {featuredRooms.map((room, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <Link
                key={room.id}
                to={room.path}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col justify-between bg-stone-50 border border-stone-200 overflow-hidden min-h-[480px] sm:min-h-[520px] p-6 transition-all duration-500 hover:border-charcoal hover:shadow-lift"
              >
                {/* Background Image Container with Subtle Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={room.cardImage}
                    alt={`${room.name} interior preview`}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-105 filter contrast-105' : 'scale-100'
                    }`}
                    loading="lazy"
                  />
                  {/* Subtle gradient overlay to keep text legible and white-friendly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent transition-opacity duration-300" />
                </div>

                {/* Top Badge: Number and Category pill */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-canvas/90 bg-charcoal/40 backdrop-blur-sm px-2.5 py-1 border border-canvas/20">
                    {room.number}
                  </span>
                  <div className={`p-2 rounded-full bg-canvas/90 text-charcoal transition-transform duration-300 ${
                    isHovered ? 'translate-x-1 -translate-y-1' : ''
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content with slight shift on hover */}
                <div className={`relative z-10 text-canvas transition-transform duration-300 ${
                  isHovered ? '-translate-y-1' : 'translate-y-0'
                }`}>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2 text-canvas">
                    {room.name}
                  </h3>
                  <p className="text-xs text-canvas/80 line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-canvas border-b border-canvas/40 pb-1">
                    <span>Explore Space</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom helper strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between text-xs font-mono text-stone-500 border-t border-stone-100 pt-4 gap-2">
          <span>01 Living Room &bull; 02 Bedroom &bull; 03 Dining Room &bull; 04 Office</span>
          <Link to="/furniture" className="text-charcoal hover:underline flex items-center gap-1 font-sans">
            View full furniture catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
