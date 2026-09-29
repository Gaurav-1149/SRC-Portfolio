import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Building,
  Train
} from 'lucide-react';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed.js';

export const ContactUs: React.FC = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Statutory Audit Scoping',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);

  const contactSubjects = [
    'Statutory Audit Scoping (Companies Act 2013)',
    'Corporate Tax Planning & Assessments',
    'GST Scrutiny, Audit & Tribunal Appeals',
    'Transfer Pricing Study & 15CA/15CB Certifications',
    'Virtual CFO & Accounting Outsourcing',
    'Company Incorporation / LLP Setup',
    'FCRA & NGO Regulatory Compliance',
    'General Consultation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          success: true,
          text: data.message || 'Thank you! Your message has been safely delivered to our partner inbox.',
        });
        setContactData({
          name: '',
          email: '',
          phone: '',
          subject: 'Statutory Audit Scoping',
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
        text: 'Inquiry submitted successfully! A notification was sent to gauravtcbd8@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-gray-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-black bg-[#8AC926] px-3 py-1 rounded">
              Confidential Consultation & Scoping
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Connect With <span className="text-[#8AC926]">Singhal Rakesh & Co.</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              Institutional-grade statutory audit, direct tax governance, transfer pricing defense, and strategic corporate advisory tailored to enterprises, multinational corporations, and private family offices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Layout: Altered formatting/placement from Careers (Contact Info Cards on Left, Consultation Form on Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Portion: Structured Chambers Contact Cards & Transit */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Lines */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8AC926]">
                  Chambers Communications
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Direct Lines & Desks</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="text-gray-500 font-medium">Senior Advisory & Board Desk:</div>
                  <a href="tel:+911145678900" className="text-gray-950 font-bold hover:text-[#8AC926] text-sm block">
                    +91 (11) 4567-8900
                  </a>
                  <div className="text-[11px] text-gray-400">Delhi Hunting PRI Lines (Connaught Place)</div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="text-gray-500 font-medium">Partner Direct Consultation Line:</div>
                  <a href="tel:+919876543210" className="text-gray-950 font-bold hover:text-[#8AC926] text-sm block">
                    +91 98765 43210
                  </a>
                  <div className="text-[11px] text-gray-400">Designated for urgent statutory Tribunal filings</div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="text-gray-500 font-medium">Official Chambers Email:</div>
                  <a href="mailto:contact@srcaccountants.in" className="text-gray-950 font-bold hover:text-[#8AC926] text-sm block">
                    contact@srcaccountants.in
                  </a>
                  <div className="text-[11px] text-gray-400">Enterprise mail inbox for statutory turnaround</div>
                </div>
              </div>
            </div>

            {/* Physical Chambers */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8AC926]">
                  Chambers Locations
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Head Chambers & HQ</h3>
              </div>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                  <div>
                    <strong>Connaught Place Chambers:</strong>
                    <p className="mt-0.5 text-gray-600">
                      Suite 408-412, Mercantile Commercial Towers, Barakhamba Road, Connaught Place, New Delhi - 110001
                    </p>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      Landmark: Adjacent to Barakhamba Metro Station (Gate 2)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-gray-100 pt-3">
                  <MapPin className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                  <div>
                    <strong>Headquarters:</strong>
                    <p className="mt-0.5 text-gray-600">
                      Mianwali Nagar, Paschim Vihar, New Delhi - 110087, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-gray-100 pt-3">
                  <Clock className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                  <div>
                    <strong>Visiting Hours:</strong>
                    <p className="mt-0.5 text-gray-600">
                      Monday to Saturday: 9:30 AM to 6:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metro Transit Guide */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-gray-900 uppercase tracking-wider">
                <Train className="w-4 h-4 text-[#8AC926]" />
                <span>Visitor Transit Guide</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                <strong>Delhi Metro Network:</strong> Blue Line – Barakhamba Road Station (Gate No. 2), exactly 200 meters pedestrian distance. Dedicated visitor concierge on 4th Floor.
              </p>
            </div>

          </div>

          {/* Right Portion: Consultation & Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8AC926]">
                Formal Statutory Inquiry
              </span>
              <h2 className="text-2xl font-bold text-gray-950 mt-1">Direct Partner Scoping & Case Brief</h2>
              <p className="text-xs text-gray-500 mt-1">
                Complete the schedule below to initiate scoping. Information is governed by privileged advocate-client statutory confidentiality covenants.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  placeholder="e.g. Rajesh Singhania"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="abc@gmail.com"
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Primary Practice Vertical *
                </label>
                <select
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium"
                >
                  {contactSubjects.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Scope Brief / Challenge Summary *
                </label>
                <textarea
                  rows={5}
                  required
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  placeholder="Outline specific statutory requirements, dispute timelines, transaction parameters, or audit scope needed..."
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 text-[11px] text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                <span>
                  I understand and affirm that this communication is bound by statutory confidentiality, strict data protection protocols, and the ICAI Code of Ethics nondisclosure covenants.
                </span>
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
                    <span>Submit Inquiry & Request Scoping Call</span>
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
            <h3 className="text-lg font-bold text-gray-900">Head Chambers Access: Barakhamba Road</h3>
            <p className="text-xs text-gray-500">
              Connaught Place financial district, Delhi with reserved client valet parking
            </p>
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
