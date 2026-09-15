import React from 'react';
import { Link } from 'react-router-dom';
import { PackageOpen, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = "Furniture collection will appear here.",
  message = "New inventory is regularly updated. Contact our store directly or submit an inquiry for custom furniture requests.",
  actionLink = "/inquiry",
  actionText = "Request Information",
}) {
  return (
    <div className="w-full py-16 px-6 my-6 bg-stone-50 border border-dashed border-stone-300 text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
      <div className="w-12 h-12 rounded-full bg-stone-200/60 flex items-center justify-center mb-4 text-stone-600">
        <PackageOpen className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-normal mb-2">
        {title}
      </h4>
      <p className="text-sm text-stone-500 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-canvas text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}
