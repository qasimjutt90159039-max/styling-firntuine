import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import { Phone, MapPin, CheckCircle, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function InquiryPage() {
  const [searchParams] = useSearchParams();
  const preProduct = searchParams.get('product') || '';
  const preCategory = searchParams.get('category') || '';
  const preRoom = searchParams.get('room') || '';

  useEffect(() => {
    document.title = "Request Furniture | Stylish Furniture Lahore";
  }, []);

  return (
    <div className="bg-canvas min-h-screen">
      
      {/* Header Banner */}
      <section className="py-14 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
            Showroom Assistance & Custom Furniture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
            Request Furniture Information
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-light max-w-2xl leading-relaxed">
            Specify your furniture preferences, target room layout, or custom dimensions. We will review your request and connect with you directly by phone.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form Column */}
          <div className="lg:col-span-8">
            <InquiryForm
              initialProduct={preProduct}
              initialCategory={preCategory}
              initialRoom={preRoom}
            />
          </div>

          {/* Side Information Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Call Box */}
            <div className="bg-stone-50 border border-stone-200 p-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                Immediate Assistance
              </span>
              <h4 className="font-serif text-xl text-charcoal">
                Direct Phone Call
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Prefer to speak directly? Call our store representative for prompt answers regarding showroom inventory or inquiries.
              </p>
              <a
                href={BUSINESS_INFO.phoneRaw}
                className="inline-flex items-center gap-2 text-sm font-mono font-medium text-charcoal hover:underline pt-1"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Factual Guidelines Box */}
            <div className="bg-canvas border border-stone-200 p-6 space-y-3 text-xs text-stone-600">
              <h5 className="font-serif text-base text-charcoal">
                Inquiry Guidelines
              </h5>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-charcoal font-mono">&bull;</span>
                  <span><strong>Reference Photos:</strong> You can upload sketches or photos of spaces to help our team understand your requirements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-charcoal font-mono">&bull;</span>
                  <span><strong>Accurate Phone:</strong> Please ensure your phone number is valid as our team reaches out by call.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-charcoal font-mono">&bull;</span>
                  <span><strong>Showroom Location:</strong> Nagra Rd, Nagra Town Lahore, Pakistan.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
