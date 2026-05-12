import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DentistOnboarding from './pages/DentistOnboarding';
import DentistDashboard from './pages/DentistDashboard';
import TalentBrowser from './pages/TalentBrowser';
import SendOffer from './pages/SendOffer';
import DentistProfile from './pages/DentistProfile';
import ClinicProfile from './pages/ClinicProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ReviewOffer from './pages/ReviewOffer';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<DentistOnboarding />} />
        <Route path="/dashboard" element={<DentistDashboard />} />
        <Route path="/browse" element={<TalentBrowser />} />
        <Route path="/send-offer" element={<SendOffer />} />
        <Route path="/review-offer" element={<ReviewOffer />} />
        <Route path="/profile/dentist" element={<DentistProfile />} />
        <Route path="/profile/clinic" element={<ClinicProfile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
