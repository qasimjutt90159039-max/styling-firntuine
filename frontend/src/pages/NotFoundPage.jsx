import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-canvas">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-xs uppercase font-mono tracking-widest text-stone-400 mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal mb-4">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-stone-600 max-w-md mb-8 leading-relaxed">
        The page you are looking for does not exist or has been relocated. Explore our room collections or return to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
        >
          Return Home
        </Link>
        <Link
          to="/furniture"
          className="px-6 py-3 border border-stone-300 text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal transition-colors"
        >
          Explore Furniture
        </Link>
      </div>
    </div>
  );
}
