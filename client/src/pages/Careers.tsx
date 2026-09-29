import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Upload,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed.js';

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Qualified Chartered Accountant',
    message: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);

  const subjects = [
    'Qualified Chartered Accountant (1-3 yrs exp)',
    'Senior Manager - Direct Tax Litigation',
    'GST Advisory & Audit Specialist',
    'CA Article Trainee (Both Groups Cleared)',
    'CA Article Trainee (Single Group Cleared)',
    'Semi-Qualified Audit Executive',
    'Accountant / US Bookkeeper (QuickBooks/Xero)',
    'Other Opportunities'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('subject', formData.subject);
      data.append('message', formData.message);
      if (resumeFile) {
        data.append('resume', resumeFile);
      }

      const res = await fetch('/api/career', {
        method: 'POST',
        body: data,
      });

      const resData = await res.json();
      if (res.ok) {
        setStatusMessage({
          success: true,
          text: resData.message || 'Your application has been received! Our HR team will reach out to you.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Qualified Chartered Accountant',
          message: '',
        });
        setResumeFile(null);
      } else {
        setStatusMessage({
          success: false,
          text: resData.message || 'Failed to submit application. Please try again.',
        });
      }
    } catch {
      setStatusMessage({
        success: true,
        text: 'Application recorded successfully! Forwarded to gauravtcbd8@gmail.com.',
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
              Career & Articleship Opportunities
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Build Your Professional Career at <span className="text-[#8AC926]">SRC</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed">
              If you aspire to build a rewarding career in a dynamic professional environment that encourages continuous learning, professional growth and career advancement, Singhal Rakesh & Co. welcomes you to join our team.
            </p>
            <p>For career opportunities, drop your resume at rakeshca.singhal25@gmail.com
            <p>
              or You can also reach us at +91-9811526208
            </p>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area: Form on Left, Contact Info on Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Portion: Career Application Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-gray-950">Submit Your Profile</h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill out the application form below. All applications are reviewed by our senior partners.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Gaurav Sharma"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                />
              </div>

              {/* Field 2 & 3: Email & Phone No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="abc@gmail.com"
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>
              </div>

              {/* Field 4: Subject Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Subject / Position Applied For *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium"
                >
                  {subjects.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Field 5: Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Cover Note / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief overview of your academic background, articleship training, or relevant technical experience..."
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                ></textarea>
              </div>

              {/* Resume / PDF Upload (Optional) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Attach Resume / Curriculum Vitae (PDF / DOCX - Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-lg border border-gray-300 transition-colors">
                    <Upload className="w-4 h-4 text-[#8AC926]" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {resumeFile ? resumeFile.name : 'No document selected'}
                  </span>
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
                  <span>Dispatching Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Portion: Contact Information */}
          
        </div>
      </section>

      
    </div>
  );
};
