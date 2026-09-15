import React, { useState } from 'react';
import { api } from '../api/client';
import { ROOM_FILTER_OPTIONS, CATALOG_CATEGORIES } from '../data/business';
import { Send, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function InquiryForm({
  initialProduct = '',
  initialCategory = '',
  initialRoom = '',
  onSuccess = null,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    furnitureCategory: initialCategory || '',
    room: initialRoom || '',
    productName: initialProduct || '',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Client-side validation
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please enter a message or describe the furniture you are looking for.');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('phone', formData.phone.trim());
      data.append('furnitureCategory', formData.furnitureCategory);
      data.append('room', formData.room);
      data.append('productName', formData.productName.trim());
      data.append('message', formData.message.trim());
      if (selectedFile) {
        data.append('referenceImage', selectedFile);
      }

      const res = await api.submitInquiry(data);
      setSuccessMessage(res.message || 'Your inquiry has been submitted successfully.');

      // Reset form on success
      setFormData({
        name: '',
        phone: '',
        furnitureCategory: '',
        room: '',
        productName: '',
        message: '',
      });
      setSelectedFile(null);

      if (onSuccess) onSuccess(res);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setError(err.message || 'Unable to submit inquiry. Please check your connection or call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-canvas border border-stone-200 p-6 sm:p-10">
      {successMessage ? (
        <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-charcoal">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl text-charcoal font-normal">
            Inquiry Received
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            {successMessage}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="px-6 py-2.5 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-serif text-2xl text-charcoal font-normal">
              Request Furniture Information
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Submit your specifications, space dimensions, or furniture preferences. Our showroom team will contact you directly via phone.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-stone-100 border border-stone-300 text-charcoal text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-stone-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Customer Name */}
            <div>
              <label htmlFor="name" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
                Full Name <span className="text-stone-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ahmad Ali"
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
                Contact Phone <span className="text-stone-400">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +92 300 1234567"
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Room */}
            <div>
              <label htmlFor="room" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
                Target Room / Space
              </label>
              <select
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
              >
                <option value="">Select Room (Optional)</option>
                {ROOM_FILTER_OPTIONS.filter((r) => r !== 'All').map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            {/* Furniture Category */}
            <div>
              <label htmlFor="furnitureCategory" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
                Furniture Category
              </label>
              <select
                id="furnitureCategory"
                name="furnitureCategory"
                value={formData.furnitureCategory}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
              >
                <option value="">Select Category (Optional)</option>
                {CATALOG_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Name (optional) */}
          <div>
            <label htmlFor="productName" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
              Specific Piece or Model Name (Optional)
            </label>
            <input
              id="productName"
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g. Oak Dining Table, Minimalist Sofa"
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
              Inquiry / Request Details <span className="text-stone-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your dimensions, material preference, design requirements, or questions..."
              required
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-sm text-charcoal focus:bg-canvas focus:outline-none focus:border-charcoal transition-colors"
            />
          </div>

          {/* Reference Image Upload (Optional) */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-stone-600 mb-1.5">
              Reference Image or Room Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-stone-300 bg-stone-50 text-xs font-medium text-stone-700 hover:bg-stone-100 hover:border-charcoal transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{selectedFile ? selectedFile.name : 'Choose File'}</span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
              {selectedFile && (
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-xs text-stone-500 hover:text-charcoal underline"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Supports JPG, PNG, WEBP up to 10MB.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-stone-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
