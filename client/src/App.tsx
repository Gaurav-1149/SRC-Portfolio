import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { AdminProtectedRoute } from './components/AdminProtectedRoute.js';
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
import { AdminLogin } from './pages/AdminLogin.js';
import { AdminInsights } from './pages/AdminInsights.js';

export const App: React.FC = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthProvider>
      <div className={`min-h-screen flex flex-col font-sans ${isAdminRoute ? 'bg-slate-950 text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
        
        {/* Render Public TopBar and Navbar only for client-facing pages */}
        {!isAdminRoute && (
          <div className="sticky top-0 z-50">
            <TopBar />
            <Navbar />
          </div>
        )}

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

            {/* Admin Authentication & Management Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminInsights />
                </AdminProtectedRoute>
              }
            />
            <Route path="/admin/insights" element={<Navigate to="/admin" replace />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>

        {/* Render Public Footer and Floating Back-to-Top only for client-facing pages */}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <BackToTop />}
      </div>
    </AuthProvider>
  );
};
