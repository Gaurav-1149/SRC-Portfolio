import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
// import {logo} from "../../public/images/logo"

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const isAboutActive = location.pathname.startsWith('/aboutUs');

  return (
    <header className=" top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          {/* <Logo /> */}

        <NavLink
              to="/home"
            >
                    <img src="/images/logo.png" alt="Logo" className='h-20'/>
            </NavLink>
          

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 ">
            {/* 1. Home */}
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. About Us with Hover Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isAboutActive
                    ? 'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-1 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                  aboutDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link
                  to="/aboutUs/ourTeam"
                  onClick={() => setAboutDropdownOpen(false)}
                  className="block px-4 py-2.5 text-m text-gray-700 hover:bg-[#8AC926]/15 hover:text-black font-medium transition-colors"
                >
                  <div className="font-semibold text-gray-900">Our Team</div>
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link
                  to="/aboutUs/client"
                  onClick={() => setAboutDropdownOpen(false)}
                  className="block px-4 py-2.5 text-m text-gray-700 hover:bg-[#8AC926]/15 hover:text-black font-medium transition-colors"
                >
                  <div className="font-semibold text-gray-900">Clients</div>
                </Link>
              </div>
            </div>

            {/* 3. Services */}
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`
              }
            >
              Services
            </NavLink>

            {/* 4. Insights */}
            <NavLink
              to="/insight"
              className={({ isActive }) =>
                `px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isActive
                    ?'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`
              }
            >
              Insights
            </NavLink>

            {/* 5. Career */}
            <NavLink
              to="/careers"
              className={({ isActive }) =>
                `px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`
              }
            >
              Careers
            </NavLink>

            {/* 6. Contact Us */}
            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                `px-3.5 py-2 text-m font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'text-[#78b31f]'
                    : 'text-gray-700 hover:text-black hover:bg-gray-50'
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Action Consultation Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/contactUs"
              className="inline-flex items-center gap-2 border-[#8AC926] border-2 text-gray-950 font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all text-sm group"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#8AC926]/15"
          >
            Home
          </Link>
          <div className="border-l-2 border-[#8AC926] pl-3 my-2 space-y-1">
            <div className="text-xs uppercase font-bold text-gray-400 tracking-wider">About Us</div>
            <Link
              to="/aboutUs/ourTeam"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-medium text-gray-700 hover:text-black"
            >
              Our Team
            </Link>
            <Link
              to="/aboutUs/client"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-sm font-medium text-gray-700 hover:text-black"
            >
              Clients & Industries
            </Link>
          </div>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#8AC926]/15"
          >
            Services
          </Link>
          <Link
            to="/insight"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#8AC926]/15"
          >
            Insights
          </Link>
          <Link
            to="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#8AC926]/15"
          >
            Careers
          </Link>
          <Link
            to="/contactUs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-[#8AC926]/15"
          >
            Contact Us
          </Link>
          <div className="pt-2">
            <Link
              to="/contactUs"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center gap-2 bg-[#8AC926] text-black font-bold px-4 py-2.5 rounded-lg text-sm"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
