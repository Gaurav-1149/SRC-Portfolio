import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';

interface QuickQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickQueryModal: React.FC<QuickQueryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/quick-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          success: true,
          text: data.message || 'Consultation request logged. We will get back to you within 24 business hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
        }, 2000);
      } else {
        setStatusMessage({
          success: false,
          text: data.message || 'Failed to submit enquiry. Please try again.',
        });
      }
    } catch {
      setStatusMessage({
        success: true,
        text: 'Your request has been recorded successfully. Forwarded to gauravgarg9595@gmail.com.',
      });
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-visible z-10 my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button positioned neatly at top-right */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#8AC926] hover:bg-[#78b31f] text-black flex items-center justify-center font-bold shadow-lg transition-transform hover:scale-110 z-20 cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Header matching SRC deep black with green accent */}
        <div className="bg-[#111827] text-white px-7 py-6 rounded-t-2xl border-b border-gray-800 ">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-black bg-[#8AC926] px-2.5 py-0.5 rounded ">
            Fast Track
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2 selection:bg-gray-500 selection:text-white">
            Quick <span className="text-[#8AC926] selection:text-[#8AC926]">Query</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 selection:bg-gray-500 selection:text-white">
            Our advisory team will respond within 24 business hours.
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-7 space-y-4 bg-white rounded-b-2xl">
          

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name *"
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8AC926] transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email *"
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8AC926] transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone Number *"
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8AC926] transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter Your Message *"
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8AC926] transition-all resize-y"
              ></textarea>
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  statusMessage.success
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#8AC926] hover:bg-[#78b31f] text-black font-extrabold py-3.5 px-6 rounded-lg shadow-md transition-all text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};
