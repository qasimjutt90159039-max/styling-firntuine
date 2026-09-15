import React from 'react';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((i) => (
          <div key={i} className="bg-stone-50 border border-stone-200 p-4 space-y-3 animate-pulse">
            <div className="aspect-[4/3] bg-stone-200 w-full" />
            <div className="h-4 bg-stone-200 w-3/4" />
            <div className="h-3 bg-stone-200 w-1/2" />
            <div className="h-8 bg-stone-200 w-full mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'rail') {
    return (
      <div className="flex gap-4 overflow-hidden">
        {items.map((i) => (
          <div key={i} className="min-w-[280px] bg-stone-50 border border-stone-200 p-4 space-y-3 animate-pulse">
            <div className="h-48 bg-stone-200 w-full" />
            <div className="h-4 bg-stone-200 w-2/3" />
            <div className="h-3 bg-stone-200 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-stone-200 w-1/4" />
      <div className="h-32 bg-stone-200 w-full" />
    </div>
  );
}
