import React from 'react';
import { Link } from 'react-router-dom';

export default function DentistDashboard() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface text-primary font-headline-sm text-headline-sm shadow-sm flex justify-between items-center w-full px-margin-mobile py-2 z-50 sticky top-0">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">medical_services</span>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/dashboard" className="text-primary font-bold font-label-md text-label-md">Dashboard</Link>
            <Link to="/profile/dentist" className="text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high px-2 py-1 rounded transition-transform active:scale-95">Profile</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-margin-mobile pt-6 md:pt-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-[0px_2px_8px_rgba(13,71,161,0.05)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Welcome back, Dr. Omondi</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-md font-label-md">
                  <span className="material-symbols-outlined text-[14px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Status: KMPDC Verified
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary font-display-lg text-display-lg">3</span>
              <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">New Offers</span>
            </div>
          </div>
          
          <div className="bg-primary-container text-on-primary-container p-6 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-1">Profile Strength</h3>
              <div className="w-full bg-primary/20 rounded-full h-2 mb-2">
                <div className="bg-secondary-fixed h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="font-body-md text-body-md opacity-90">Almost there! Complete your equipment preferences to attract more locum offers.</p>
            </div>
            <Link to="/profile/dentist" className="mt-4 bg-white text-primary font-label-md text-label-md py-2 rounded-lg w-full active:scale-95 transition-transform text-center block">Update Profile</Link>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Available Positions</h2>
            <button className="flex items-center gap-2 text-primary font-label-md text-label-md hover:underline">
              <span className="material-symbols-outlined">filter_list</span> Filter
            </button>
          </div>
          <div className="space-y-4">
            <div className="offer-card-gradient border border-outline-variant rounded-xl overflow-hidden shadow-[0px_2px_8px_rgba(13,71,161,0.05)] hover:shadow-md transition-shadow group">
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 border-r border-outline-variant pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">apartment</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm">Starlight...</h4>
                      <p className="text-label-md font-label-md text-on-surface-variant">Kilimani, Nairobi</p>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-md text-label-md font-label-md">Locum Position</span>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1">Proposed Salary</p>
                    <p className="font-headline-md text-headline-md text-primary">KES 180,000 <span className="text-body-md font-normal text-on-surface-variant">/ month</span></p>
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1">Available Equipment</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold">DIGITAL X-RAY</span>
                      <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold">ROTARY ENDO</span>
                      <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold">AUTOCLAVE B-CLASS</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <Link to="/review-offer" className="w-full md:w-auto bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-lg active:scale-95 transition-transform text-center inline-block">Review Offer</Link>
                </div>
              </div>
            </div>

            <div className="offer-card-gradient border border-outline-variant rounded-xl overflow-hidden shadow-[0px_2px_8px_rgba(13,71,161,0.05)] hover:shadow-md transition-shadow">
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 border-r border-outline-variant pr-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">domain</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm">Prime Dent...</h4>
                      <p className="text-label-md font-label-md text-on-surface-variant">Nyali, Mombasa</p>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-1 bg-surface-container text-on-surface-variant rounded-md text-label-md font-label-md">Permanent Role</span>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1">Proposed Salary</p>
                    <p className="font-headline-md text-headline-md text-primary">KES 250,000 <span className="text-body-md font-normal text-on-surface-variant">/ month</span></p>
                  </div>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1">Available Equipment</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold">CBCT SCANNER</span>
                      <span className="bg-secondary-container/30 text-on-secondary-container px-2 py-1 rounded-full text-[10px] font-bold">LASER THERAPY</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <Link to="/review-offer" className="w-full md:w-auto bg-primary text-white font-label-md text-label-md px-8 py-4 rounded-lg active:scale-95 transition-transform text-center inline-block">Review Offer</Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <span className="material-symbols-outlined text-secondary">trending_up</span>
            <h4 className="font-headline-sm text-headline-sm">Market Insights</h4>
            <p className="text-body-md text-on-surface-variant">The average daily rate for Locums in Nairobi has increased by 12% this month.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <span className="material-symbols-outlined text-tertiary">tips_and_updates</span>
            <h4 className="font-headline-sm text-headline-sm">Career Tip</h4>
            <p className="text-body-md text-on-surface-variant">Clinics using Rotary Endo are currently offering 15% higher compensation packages.</p>
          </div>
          <div className="bg-inverse-surface text-inverse-on-surface p-6 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="z-10 relative">
              <h4 className="font-headline-sm text-headline-sm text-primary-fixed-dim">Premium Membership</h4>
              <p className="text-body-md opacity-80 mt-1">Get early access to premium clinic offers before they go public.</p>
              <button className="mt-4 text-primary-fixed-dim font-bold flex items-center gap-1 text-label-md">Learn More <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[120px]">diamond</span>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-surface shadow-sm md:hidden">
        <Link to="/dashboard" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link to="/profile/dentist" className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform duration-200">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-label-md text-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
