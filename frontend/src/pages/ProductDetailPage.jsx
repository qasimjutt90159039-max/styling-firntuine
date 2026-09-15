import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Layers, FileText, CheckCircle2, ChevronRight, PackageOpen } from 'lucide-react';
import { api } from '../api/client';
import { BUSINESS_INFO } from '../data/business';
import InquiryForm from '../components/InquiryForm';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await api.getProductById(id);
        if (!data) {
          setError(true);
        } else {
          setProduct(data);
          document.title = `${data.name} | Stylish Furniture Lahore`;
        }
      } catch (err) {
        console.error('Error retrieving product details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="h-4 bg-stone-200 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[4/3] bg-stone-200" />
          <div className="space-y-4">
            <div className="h-8 bg-stone-200 w-3/4" />
            <div className="h-4 bg-stone-200 w-1/2" />
            <div className="h-32 bg-stone-200 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // 404 Product Not Found State
  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-canvas">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-6">
          <PackageOpen className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-mono tracking-widest text-stone-400 mb-2">
          Error 404
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
          Product Not Found
        </h2>
        <p className="text-sm text-stone-600 max-w-md mb-8 leading-relaxed">
          The requested furniture item could not be found or has been archived. Explore our current showroom collection or contact our store directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/furniture"
            className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
          >
            Back to Furniture Catalog
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-stone-300 text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal transition-colors"
          >
            Contact Store
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'];

  const hasPrice = product.price !== null && product.price !== undefined && !isNaN(product.price);

  return (
    <div className="bg-canvas min-h-screen">
      
      {/* Breadcrumb Strip */}
      <div className="border-b border-stone-200 bg-stone-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-xs font-mono text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-charcoal">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 text-stone-400 shrink-0" />
          <Link to="/furniture" className="hover:text-charcoal">Furniture</Link>
          <ChevronRight className="w-3 h-3 mx-2 text-stone-400 shrink-0" />
          <Link to={`/furniture?room=${encodeURIComponent(product.room)}`} className="hover:text-charcoal">
            {product.room}
          </Link>
          <ChevronRight className="w-3 h-3 mx-2 text-stone-400 shrink-0" />
          <span className="text-charcoal truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Images Section */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="aspect-[4/3] bg-stone-100 border border-stone-200 overflow-hidden relative">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-charcoal border border-stone-200">
                {product.category}
              </div>
            </div>

            {/* Thumbnail Row if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 shrink-0 border overflow-hidden transition-colors ${
                      activeImage === idx ? 'border-charcoal ring-1 ring-charcoal' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  {product.room}
                </span>
                <span className="text-stone-300">&bull;</span>
                <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  {product.category}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
                {product.name}
              </h1>

              {/* Price ONLY if explicitly provided by admin */}
              {hasPrice && (
                <div className="mt-3 text-xl font-mono text-charcoal">
                  PKR {Number(product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-stone-100 pt-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-stone-500 mb-2">
                  Description
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed font-light whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Material / Details if entered by admin */}
            {(product.material || product.specifications) && (
              <div className="border-t border-stone-100 pt-4 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-widest text-stone-500">
                  Specifications & Material
                </h4>

                {product.material && (
                  <div className="flex items-start gap-2 text-xs text-stone-700">
                    <Layers className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span><strong>Material:</strong> {product.material}</span>
                  </div>
                )}

                {product.specifications && (
                  <div className="flex items-start gap-2 text-xs text-stone-700">
                    <FileText className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-line"><strong>Details:</strong> {product.specifications}</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t border-stone-200 pt-6 space-y-3">
              <button
                type="button"
                onClick={() => setShowInquiryModal(!showInquiryModal)}
                className="w-full py-3.5 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors shadow-subtle text-center"
              >
                {showInquiryModal ? 'Hide Request Form' : 'Request Information'}
              </button>

              <a
                href={BUSINESS_INFO.phoneRaw}
                className="w-full py-3.5 border border-stone-300 text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-stone-600" />
                <span>Call Store ({BUSINESS_INFO.phone})</span>
              </a>
            </div>

            {/* Factual Store Info Card */}
            <div className="p-4 bg-stone-50 border border-stone-200 text-xs font-mono text-stone-600 space-y-1">
              <div><strong>Showroom:</strong> {BUSINESS_INFO.name}</div>
              <div><strong>Address:</strong> {BUSINESS_INFO.address}</div>
            </div>

          </div>

        </div>

        {/* Embedded Inquiry Form when Request Information is clicked */}
        {showInquiryModal && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <InquiryForm
              initialProduct={product.name}
              initialCategory={product.category}
              initialRoom={product.room}
            />
          </div>
        )}

      </div>
    </div>
  );
}
