import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TopBar } from './components/TopBar.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { BackToTop } from './components/BackToTop.js';

import { Home } from './pages/Home.js';
import { OurTeam } from './pages/OurTeam.js';
import { Clients } from './pages/Clients.js';
import { Services } from './pages/Services.js';
import { Insights } from './pages/Insights.js';
import { Careers } from './pages/Careers.js';
import { ContactUs } from './pages/ContactUs.js';
import { AdminInsights } from './pages/AdminInsights.js';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans">
      
      <div className='sticky top-0 z-50'>
        {/* Top Header Bar */}
        <TopBar />
        {/* Main Sticky Navbar */}
        <Navbar />
      </div>

      {/* Page Routing */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          
          {/* About Us sub-routes */}
          <Route path="/aboutUs/ourTeam" element={<OurTeam />} />
          <Route path="/aboutUs/client" element={<Clients />} />
          
          {/* Other Core Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/insight" element={<Insights />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contactUs" element={<ContactUs />} />

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminInsights />} />
          <Route path="/admin/insights" element={<AdminInsights />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* 5-Segment Footer */}
      <Footer />

      {/* Bottom Right Floating Back-to-Top Button */}
      <BackToTop />
    </div>
  );
};
