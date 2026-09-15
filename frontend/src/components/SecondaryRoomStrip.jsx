import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROOMS } from '../data/business';

export default function SecondaryRoomStrip({ activeRoom = '', onSelectRoom = null }) {
  const location = useLocation();

  const stripItems = [
    { label: 'All Spaces', path: '/furniture', roomParam: 'All' },
    { label: 'Living Room', path: '/rooms/living-room', roomParam: 'Living Room' },
    { label: 'Bedroom', path: '/rooms/bedroom', roomParam: 'Bedroom' },
    { label: 'Dining Room', path: '/rooms/dining-room', roomParam: 'Dining Room' },
    { label: 'Office', path: '/rooms/office', roomParam: 'Office' },
    { label: 'Storage', path: '/furniture?room=Storage', roomParam: 'Storage' },
    { label: 'Essentials', path: '/furniture?room=Furniture Essentials', roomParam: 'Furniture Essentials' },
  ];

  return (
    <div className="w-full bg-stone-50 border-b border-stone-200 overflow-x-auto scrollbar-none py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-4 whitespace-nowrap min-w-max">
        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 mr-2">
          Spaces:
        </span>

        {stripItems.map((item) => {
          const isActive =
            activeRoom === item.roomParam ||
            (activeRoom === '' && location.pathname === item.path);

          if (onSelectRoom) {
            return (
              <button
                key={item.label}
                onClick={() => onSelectRoom(item.roomParam)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? 'bg-charcoal text-canvas font-medium'
                    : 'text-stone-600 hover:text-charcoal hover:bg-stone-200/50'
                }`}
              >
                {item.label}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                isActive
                  ? 'bg-charcoal text-canvas font-medium'
                  : 'text-stone-600 hover:text-charcoal hover:bg-stone-200/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
