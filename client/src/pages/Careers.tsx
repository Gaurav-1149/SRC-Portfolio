import React, { useState } from 'react';
import { Upload, Send, ShieldCheck } from 'lucide-react';

export const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    highestQualification: '',
    experienceYears: '',
    experienceMonths: '',
    postAppliedFor: '',
    referenceQuery: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);

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
      data.append('gender', formData.gender);
      data.append('dob', formData.dob);
      data.append('highestQualification', formData.highestQualification);
      data.append('experienceYears', formData.experienceYears);
      data.append('experienceMonths', formData.experienceMonths);
      data.append('postAppliedFor', formData.postAppliedFor);
      data.append('referenceQuery', formData.referenceQuery);

      const calculatedSubject = formData.postAppliedFor || 'Career Application';
      data.append('subject', calculatedSubject);

      const detailedMessage = [
        `Gender: ${formData.gender}`,
        `Date of Birth: ${formData.dob || 'Not provided'}`,
        `Highest Qualification: ${formData.highestQualification || 'Not provided'}`,
        `Experience: ${formData.experienceYears || '0'} Years, ${formData.experienceMonths || '0'} Months`,
        `Post Applied For: ${formData.postAppliedFor || 'Not specified'}`,
        `Reference / Query: ${formData.referenceQuery || 'None'}`,
      ].join('\n');
      data.append('message', detailedMessage);

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
          gender: 'Male',
          dob: '',
          highestQualification: '',
          experienceYears: '',
          experienceMonths: '',
          postAppliedFor: '',
          referenceQuery: '',
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
        text: 'Application recorded successfully! Forwarded to gauravgarg9595@gmail.com.',
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

      {/* Main Content Area: Career Application Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8AC926]">
              Career Application
            </span>
            <h2 className="text-2xl font-bold text-gray-950 mt-1">Submit Your Profile</h2>
            <p className="text-xs text-gray-500 mt-1">
              Fill out the application below. All applications are reviewed by our senior partners.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Gaurav Sharma"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Field 2: Email Address */}
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
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Field 3: Phone Number */}
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
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Field 4: Gender */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium text-gray-800"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Field 5: Date Of Birth */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Date Of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800"
                />
              </div>

              {/* Field 6: Highest Qualification */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Highest Qualification *
                </label>
                <input
                  type="text"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  placeholder="e.g. Chartered Accountant / B.Com / MBA"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Field 7: Years of Experience */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Years of Experience *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium text-gray-800"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 26 }, (_, i) => (
                      <option key={i} value={i.toString()}>{i} {i === 1 ? 'Year' : 'Years'}</option>
                    ))}
                  </select>
                  <select
                    value={formData.experienceMonths}
                    onChange={(e) => setFormData({ ...formData, experienceMonths: e.target.value })}
                    className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium text-gray-800"
                  >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i.toString()}>{i} {i === 1 ? 'Month' : 'Months'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 8: Post Applied for */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Post Applied for *
                </label>
                <select
                  value={formData.postAppliedFor}
                  onChange={(e) => setFormData({ ...formData, postAppliedFor: e.target.value })}
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white font-medium text-gray-800"
                >
                  <option value="">Choose Post</option>
                  <option value="Article Assistant">Article Assistant</option>
                  <option value="Associate">Associate</option>
                  <option value="Senior Associate">Senior Associate</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {/* Field 9: Reference/Query */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Reference / Query
                </label>
                <input
                  type="text"
                  value={formData.referenceQuery}
                  onChange={(e) => setFormData({ ...formData, referenceQuery: e.target.value })}
                  placeholder="Share any reference details or specific query..."
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8AC926] bg-white text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Field 10: Upload Your Resume */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Upload Your Resume (PDF / DOCX - Max 10MB)
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
                    {resumeFile ? resumeFile.name : 'No file chosen'}
                  </span>
                </div>
              </div>

              {/* Privacy statement */}
              <div className="md:col-span-2 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200 text-[11px] text-gray-600">
                <ShieldCheck className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                <span>
                  All candidate applications and resumes submitted to Singhal Rakesh & Co. are held in strict professional confidence under statutory data protection covenants.
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

            {/* Field 11: Send Message Button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-[#8AC926] hover:bg-[#78b31f] text-black font-extrabold py-3.5 px-10 rounded-lg shadow-md transition-all text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

