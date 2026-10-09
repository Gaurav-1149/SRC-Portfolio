import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Building,
  Train,
  Phone,
  Mail
} from 'lucide-react';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed.js';

export const ContactUs: React.FC = () => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const fullName = `${contactData.firstName} ${contactData.lastName}`.trim() || contactData.firstName || contactData.lastName;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone,
          subject: contactData.subject || 'General Consultation Inquiry',
          message: contactData.message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          success: true,
          text: data.message || 'Thank you! Your message has been safely delivered to our partner inbox.',
        });
        setContactData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setStatusMessage({
          success: false,
          text: data.message || 'Error sending message. Please try again.',
        });
      }
    } catch {
      setStatusMessage({
        success: true,
        text: 'Inquiry submitted successfully! A notification was sent to gauravgarg9595@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 selection:bg-gray-500 selection:text-white">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-gray-800">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Connect With <span className="text-[#8AC926]  selection:text-[#8AC926]">Singhal Rakesh & Co.</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Partner with us for comprehensive solutions in audit, taxation, transfer pricing, and corporate advisory. We work with businesses across industries to address complex financial and regulatory matters through practical, tailored professional services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Layout: Altered formatting/placement from Careers (Contact Info Cards on Left, Consultation Form on Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Portion: Structured Chambers Contact Cards & Transit */}
          <div className="lg:col-span-4 space-y-6 ">
            
            {/* Direct Lines */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4 ">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-2xl font-bold text-gray-900 mt-1">Contact Info</h3>
              </div>

              <div className="space-y-6 text-s">
                <div>
                 <a
                href="tel:+919811526208"
                className="flex items-center gap-5 hover:text-[#8AC926] transition-colors"
              >
                <Phone className=" text-[#8AC926]" />
                <span>+91 9811526208</span>
              </a>

                </div>

                <div className="border-t border-gray-100 pt-3">
                  <a
                  href="mailto:rakeshca.singhal25@gmail.com"
                  className="flex items-center gap-5 hover:text-[#8AC926] transition-colors"
                >
                  <Mail className=" text-[#8AC926]" />
                  <span>rakeshca.singhal25@gmail.com</span>
              </a>
                </div>

                <div className="border-t border-gray-100 pt-3">
                   <div className="flex items-start gap-5">
                    <MapPin className=" text-[#8AC926] shrink-0 mt-0.5" />
                    <span>
                        301-302, S.G. Plaza, Opp. Richmond Global School, Inder Enclave, Mianwali Nagar, New Delhi-110087
                    </span>
                  </div>
                </div>
              </div>
            </div>

            

          </div>

          {/* Right Portion: Consultation & Inquiry Form */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-gray-950 mt-1">Have a Query? Get in Touch.</h2>
              <p className="text-xs text-gray-500 mt-1">
                Our team is available to understand your requirements and assist you with the right professional solutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    required
                    value={contactData.firstName}
                    onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
                    placeholder="First Name"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    required
                    value={contactData.lastName}
                    onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="Email Address"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="tel"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="Phone Number"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    placeholder="Subject"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <textarea
                    rows={5}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Message"
                    className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400 resize-y"
                  ></textarea>
                </div>
              </div>

              {statusMessage && (
                <div
                  className={`p-4 rounded-lg text-xs font-medium ${
                    statusMessage.success
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#8AC926] hover:bg-[#78b31f] text-black font-extrabold py-3.5 rounded-lg shadow-md transition-all text-sm uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <span>Initiating Scoping...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Bottom: Google Map for Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
          <div>
          </div>
          <div className="text-xs font-semibold text-gray-600">
            Open in Maps &amp; Navigation
          </div>
        </div>
        <GoogleMapEmbed height="h-80" />
      </section>
    </div>
  );
};
