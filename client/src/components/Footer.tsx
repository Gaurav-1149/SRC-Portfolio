import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { NavLink} from 'react-router-dom';


import { GoogleMapEmbed } from './GoogleMapEmbed.js';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5 Distinct Segments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-gray-800">
          
          {/* Segment 1: Logo & Small Description */}
          <div className="lg:col-span-1 space-y-4">
              <NavLink
                            to="/home"
                          >
                                  <img src="/images/logo_dark.png" alt="Logo" className='h-28'/>
                          </NavLink>

            <p className="text-sm text-gray-400 leading-relaxed mt-3">
              Singhal Rakesh & Co. (SRC) is a premier Chartered Accountancy firm delivering 29+ years of technical excellence in Audit, Taxation, Accounting and Corporate Advisory.
            </p>
           
          </div>

          {/* Segment 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#8AC926] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/home" className="hover:text-[#8AC926] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/aboutUs/ourTeam" className="hover:text-[#8AC926] transition-colors">Our Leadership Team</Link>
              </li>
              <li>
                <Link to="/aboutUs/client" className="hover:text-[#8AC926] transition-colors">Clients & Industries</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Practice Verticals</Link>
              </li>
              <li>
                <Link to="/insight" className="hover:text-[#8AC926] transition-colors">Regulatory Insights</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#8AC926] transition-colors">Careers & Articleship</Link>
              </li>
              <li>
                <Link to="/contactUs" className="hover:text-[#8AC926] transition-colors">Contact Us</Link>
              </li>
              
            </ul>
          </div>

          {/* Segment 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#8AC926] pl-2.5">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Registration</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Corporate Services</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Indirect Tax</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Income Tax</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">International Taxation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Audit & Assurance</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Global Accounting & Compliance Services</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#8AC926] transition-colors">Outsource Payroll Accounting</Link>
              </li>
            </ul>
          </div>

          {/* Segment 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#8AC926] pl-2.5">
              Contact Info
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8AC926] shrink-0 mt-0.5" />
                <span>
                   301-302, S.G. Plaza, Opp. Richmond Global School, Inder Enclave, Mianwali Nagar, New Delhi-110087
                </span>
              </div>
              <a
                href="tel:+919811526208"
                className="flex items-center gap-1.5 hover:text-[#8AC926] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8AC926]" />
                <span>+91 9811526208</span>
              </a>
                <a
                  href="mailto:rakeshca.singhal25@gmail.com"
                  className="flex items-center gap-1.5 hover:text-[#8AC926] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8AC926]" />
                  <span>rakeshca.singhal25@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Segment 5: Small Map */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-l-2 border-[#8AC926] pl-2.5">
              Location Map
            </h4>
            <GoogleMapEmbed height="h-44" />
            <div className="text-[11px] text-gray-400">
              Adj. Barakhamba Metro (Gate No. 2)
            </div>
          </div>

        </div>

       
      </div>
    </footer>
  );
};
