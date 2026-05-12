import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-margin-mobile grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:px-margin-desktop">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary-fixed-dim">medical_services</span>
            <span className="font-headline-sm font-bold text-primary-fixed-dim">DentMatch KE</span>
          </div>
          <p className="font-label-md opacity-70">Empowering Kenyan dental professionals through clinical-grade recruitment technology.</p>
        </div>
        <div>
          <h5 className="font-label-md font-bold mb-4">Platform</h5>
          <ul className="font-label-md space-y-2 opacity-70">
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">How it Works</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">For Dentists</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">For Clinics</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-md font-bold mb-4">Compliance</h5>
          <ul className="font-label-md space-y-2 opacity-70">
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">KMPDC Regulations</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-secondary-fixed transition-colors">Data Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-secondary-fixed transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">Verification Process</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-md font-bold mb-4">Connect</h5>
          <ul className="font-label-md space-y-2 opacity-70">
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">Contact Support</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">WhatsApp Community</Link></li>
            <li><Link to="/" className="hover:text-secondary-fixed transition-colors">LinkedIn</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-margin-mobile mt-12 pt-8 border-t border-surface-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 md:px-margin-desktop">
        <p className="font-label-md opacity-50">© 2026 DentMatch KE. All Rights Reserved.</p>
        <div className="flex gap-4">
          <span className="material-symbols-outlined opacity-50">security</span>
          <span className="material-symbols-outlined opacity-50">health_and_safety</span>
        </div>
      </div>
    </footer>
  );
}
