import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Building2,
  ChevronRight,
  Clock,
  Briefcase
} from 'lucide-react';
import { servicesData } from '../data/coreServicesData.js';

export const Home: React.FC = () => {

  return (
    <div className="space-y-20 lg:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-[#111827] to-[#1F2937] text-white py-20 lg:py-18 ">
        
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 ">
              

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] ">
                Beyond Compliance. <br />
                <span >Your Partner in</span> 
                <span className="text-[#8AC926]"> Business Growth.</span>
              </h1>

              <p className="text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
                29+ years of professional expertise in Audit, Taxation, Accounting and Advisory — delivering practical solutions tailored to your business.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
               
                <Link
                  to="/contactUs"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-lg border border-gray-600 hover:border-gray-400 transition-all"
                >
                  <span>Quick Enquiry</span>
                </Link>
              </div>

              {/* Trust Metric Counters */}
              
            </div>

            {/* Right Hero Image Column */}
            <div className="lg:col-span-5 relative">
              {/* Ambient Glow Backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#8AC926]/25 via-[#8AC926]/10 to-transparent rounded-3xl blur-2xl -z-10"></div>

              {/* Main Image Card Container */}
              
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SRC CHARTERED ACCOUNTANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
           

            <h2 className="text-3xl font-serif text-gray-950 tracking-tight leading-snug">
              About Singhal Rakesh & Co. <br />
              <span >Chartered Accountants</span>
            </h2>

            <div className="space-y-4 text-gray-600 text-base leading-relaxed text-justify">
              <p>
                Established in 1997, <strong>Singhal Rakesh & Co.</strong> is a professionally managed Chartered Accountancy firm headquartered in Mianwali Nagar, New Delhi. Over the years, we have built our practice on a foundation of technical expertise, professional integrity and a deep understanding of our clients' businesses.
              </p>
              <p>
                We offer a comprehensive range of services across Audit & Assurance, Domestic & International Taxation, Accounting, and Corporate & Business Advisory. Our approach is centred on understanding each client's unique requirements and delivering practical, customised solutions that address their specific business needs.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/aboutUs/ourTeam"
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-all text-sm group"
              >
                <span>Meet Our Leadership Team</span>
                <ChevronRight className="w-4 h-4 text-[#8AC926] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-[#8AC926] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#8AC926]/15 flex items-center justify-center text-[#8AC926] mb-4">
                  <Award className="w-5 h-5 text-[#8AC926]" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Fiduciary Integrity</h4>
                <p className="text-xs text-gray-600 leading-normal">
                  Strict adherence to statutory compliance standards and the ICAI Code of Ethics.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-[#8AC926] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#8AC926]/15 flex items-center justify-center text-[#8AC926] mb-4">
                  <Cpu className="w-5 h-5 text-[#8AC926]" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Tech-Driven Audits</h4>
                <p className="text-xs text-gray-600 leading-normal">
                  AI-assisted reconciliations, automated ledger checks, and continuous compliance monitors.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-[#8AC926] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#8AC926]/15 flex items-center justify-center text-[#8AC926] mb-4">
                  <Briefcase className="w-5 h-5 text-[#8AC926]" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Big Four Acumen</h4>
                <p className="text-xs text-gray-600 leading-normal">
                  Partners bringing rich background from leading multinational institutions like Deloitte.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-[#8AC926] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#8AC926]/15 flex items-center justify-center text-[#8AC926] mb-4">
                  <Users className="w-5 h-5 text-[#8AC926]" />
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-1">Client Centricity</h4>
                <p className="text-xs text-gray-600 leading-normal">
                  Personalized attention with direct partner access on critical statutory matters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VISION, MISSION & VALUES (The Triad of Institutional Excellence) */}
      <section className="bg-gray-100/70 py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
              Our Vision, Mission & Values
            </h2>
            <p className="text-gray-600 text-sm">
              The foundational pillars that govern our professional standards, client relationships, and fiduciary stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="h-1.5 w-full bg-[#8AC926] absolute top-0 left-0"></div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pillar I</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Vision</h3>
                <p className="text-sm font-semibold  mb-3">
                    To be a trusted professional partner in our clients’ growth and success.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed space-y-2">
                  We aspire to build enduring relationships founded on trust, technical excellence, and integrity, while continuously evolving with changes in business, taxation, regulation, and technology. Our vision is to provide comprehensive, customized solutions that address our clients' financial, taxation, and business needs throughout their journey.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8AC926]" />
                <span>One-Stop Professional Advisory</span>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="h-1.5 w-full bg-[#8AC926] absolute top-0 left-0"></div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pillar II</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Mission</h3>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  To deliver quality, customized, and technology-enabled professional solutions.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We adopt a proactive and technology-driven approach to taxation, compliance, and enterprise requirements, supported by timely and transparent communication. By combining professional expertise with automation and AI-enabled processes, we strive to deliver high-quality services while upholding the highest ethical benchmarks.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8AC926]" />
                <span>Engineered Audit Standards</span>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="h-1.5 w-full bg-[#8AC926] absolute top-0 left-0"></div>
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pillar III</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Our Values</h3>
                <p className="text-sm font-semibold  mb-3">
                  Integrity, Quality & Client-Centricity.
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  At Singhal Rakesh & Co., our values define how we work and the relationships we build. We are guided by strict integrity, confidentiality, and professional ethics. We embrace continuous learning and innovation to enhance the quality and efficiency of our services, creating meaningful, lasting value for every client we serve.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8AC926]" />
                <span>Absolute Confidentiality & Ethics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR CORE SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
           
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">
              Our Core Services
            </h2>
           
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-black hover:text-[#8AC926] transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.slice(0, 8).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#8AC926] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-black mb-2">
                  {service.title}
                </h3>
                

                {/* Top 3 Micro-services preview */}
                <ul className="space-y-1.5 border-t border-gray-100 pt-3">
                  {service.microServices.map((micro, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="text-[#8AC926] font-bold">•</span>
                      <span className="truncate">{micro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#8AC926] transition-colors"
                >
                  <span>Know more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
          <div className='my-5 flex justify-between '>
            <p className='text-gray-600'>
            <strong className='text-black'> Also offering: </strong> &nbsp;Virtual CFO Services &nbsp;· &nbsp;Startup & MSME Advisory&nbsp; ·&nbsp; FCRA &nbsp;· &nbsp;FEMA&nbsp; · &nbsp;IEC ·&nbsp; Trademark
            </p>
             <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#8AC926] transition-colors"
                >
                  <span>Know more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
             </Link>

            </div>
      </section>

      {/* 5. WHY CHOOSE US (What Sets Us Apart) */}
      <section className="bg-[#111827] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold pb-2">
              Why Choose Singhal Rakesh & Co.
            </h2>
            <p className="text-gray-300 text-sm">
              At SRC, we combine decades of professional experience with technical expertise and a practical understanding of business. Our approach is built around delivering reliable, customized and commercially relevant solutions, rather than simply addressing routine compliance requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <Clock className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">29+ Years of Professional Experience</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                A strong foundation of professional experience across taxation, audit, accounting and business advisory.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <TrendingUp className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">Multi-Disciplinary Expertise</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
              Integrated capabilities across Audit, Domestic & International Taxation, Accounting and Corporate & Business Advisory         
             </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <Award className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">Big Four & MNC Exposure</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Our team brings experience from leading professional firms and MNC environments, adding international perspectives and robust professional practices.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <Briefcase className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">Business-Focused Approach</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                We understand the business context behind financial and regulatory matters and provide practical solutions aligned with each client’s objectives.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <Cpu className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">Technology & Innovation</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                We embrace technology, automation and AI-enabled processes to improve efficiency, accuracy and service delivery.
              </p>
            </div>

            <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8AC926]/20 flex items-center justify-center text-[#8AC926]">
                <Users className="w-5 h-5 text-[#8AC926]" />
              </div>
              <h4 className="text-lg font-bold text-white">Client-Centric Service</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                  We focus on timely communication, personalized attention and long-term relationships, with the objective of becoming a trusted professional partner to our clients.
              </p>
            </div>
          </div>

          <div className="mt-14 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-[#8AC926]/40 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-3">
            <h3 className="text-2xl font-bold text-white">
              "Your business evolves. <span className="text-[#8AC926]">So do we.</span>"
            </h3>
            <p className="text-xs text-gray-300">
              We continuously invest in professional knowledge, technology, and capabilities to stay aligned with changing regulations, economic environments, and client needs.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-[#8AC926] via-[#7ab421] to-[#8AC926] rounded-2xl p-8 sm:p-12 text-black shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Solidify Your Compliance Framework?
            </h3>
            <p className="text-sm font-medium text-gray-950 max-w-xl">
              Connect directly with our partners for an audit readiness assessment or taxation strategy review.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <Link
              to="/contactUs"
              className="bg-black hover:bg-gray-900 text-white font-bold px-6 py-3.5 rounded-lg shadow transition-all text-sm"
            >
              <a
            href="mailto:rakeshca.singhal25@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#8AC926] transition-colors"
          >
            <span>rakeshca.singhal25@gmail.com</span>
          </a>
            </Link>
            <a
              href="tel:+91 9811526208"
              className="bg-white hover:bg-gray-100 text-black font-bold px-6 py-3.5 rounded-lg shadow transition-all text-sm"
            >
              Call +91 9811526208
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
