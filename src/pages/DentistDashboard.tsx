import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataStore, Offer } from '../lib/dataStore';

export default function DentistDashboard() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>(() => DataStore.getOffers());

  const activeCount = offers.filter(o => o.status === 'Pending').length;

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24 animate-in fade-in duration-200">
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

      <main className="max-w-7xl mx-auto px-margin-mobile pt-6 md:pt-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-[0px_2px_8px_rgba(13,71,161,0.05)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1 font-bold">Welcome back, Dr. Omondi</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-md font-label-md font-bold">
                  <span className="material-symbols-outlined text-[14px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  Status: KMPDC Verified (A4930)
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-primary font-bold text-3xl md:text-5xl">{activeCount}</span>
              <span className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider font-bold">Active Offers</span>
            </div>
          </div>
          
          <div className="bg-primary-container text-on-primary-container p-6 rounded-xl flex flex-col justify-between border border-outline-variant">
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-1 font-bold">Profile Strength</h3>
              <div className="w-full bg-primary/20 rounded-full h-2 mb-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="font-body-md text-body-md opacity-90 text-sm">Almost there! Your KMPDC is validated. Complete premium equipment preferences to attract higher locum offers.</p>
            </div>
            <Link to="/profile/dentist" className="mt-4 bg-white text-primary font-bold py-2.5 rounded-lg w-full active:scale-95 transition-transform text-center block border border-outline shadow-sm hover:bg-surface-container-low text-sm">Update Profile</Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Incoming Clinic Opportunities</h2>
            <div className="flex items-center gap-2 px-3 py-1 text-on-surface-variant font-bold border border-outline-variant rounded-lg text-body-sm bg-surface-container-low">
              <span className="material-symbols-outlined text-[18px]">verified_user</span> Escrow Guard Active
            </div>
          </div>

          <div className="space-y-4">
            {offers.length === 0 ? (
              <div className="py-12 text-center bg-surface-container-low border border-outline-variant rounded-xl text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl mb-1">dashboard_customize</span>
                <p>No active offers at this moment. Turn on Profile Visibility to get noticed!</p>
              </div>
            ) : (
              offers.map(offer => (
                <div key={offer.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 md:border-r border-outline-variant md:pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant shrink-0">
                          <span className="material-symbols-outlined text-primary">apartment</span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm font-bold text-on-surface">{offer.clinicName}</h4>
                          <p className="text-label-md font-label-md text-on-surface-variant">{offer.clinicLocation}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className="inline-block px-2 py-1 bg-tertiary-container text-on-tertiary-container rounded-md text-[11px] font-bold uppercase">
                          {offer.role}
                        </span>
                        <span className={`inline-block px-2 py-1 rounded-md text-[11px] font-bold uppercase ${
                          offer.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          offer.status === 'Declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {offer.status}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1 text-[11px] font-bold tracking-wider">Salary Terms</p>
                        <p className="font-headline-sm text-primary font-bold text-lg md:text-2xl">{offer.rate}</p>
                        <p className="text-body-sm text-on-surface-variant font-medium mt-0.5">Dates: {offer.dates}</p>
                      </div>
                      <div>
                        <p className="text-label-md font-label-md text-on-surface-variant uppercase mb-1 text-[11px] font-bold tracking-wider">Requested Equipment</p>
                        <div className="flex flex-wrap gap-1">
                          {offer.equipment.slice(0, 3).map(eq => (
                            <span key={eq} className="bg-secondary-container/40 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold">{eq.toUpperCase()}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-1 flex items-center justify-end">
                      <Link 
                        to={`/review-offer?offerId=${offer.id}`} 
                        className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-primary font-bold py-3 px-4 rounded-lg active:scale-95 transition-transform text-center inline-block"
                      >
                        Review Offer
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <span className="material-symbols-outlined text-secondary">trending_up</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Market Insights</h4>
            <p className="text-body-md text-on-surface-variant text-sm">The average Locum rate in Lavington and Kilimani increased by 12% this quarter.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <span className="material-symbols-outlined text-tertiary">tips_and_updates</span>
            <h4 className="font-headline-sm text-headline-sm font-bold text-primary">Career Catalyst</h4>
            <p className="text-body-md text-on-surface-variant text-sm">Clinics utilizing Rotary Endo and OPG scanners are matching fast with 15% rate upgrades.</p>
          </div>
          <div className="bg-inverse-surface text-inverse-on-surface p-6 rounded-xl shadow-sm relative overflow-hidden group">
            <div className="z-10 relative">
              <h4 className="font-headline-sm text-headline-sm text-primary-fixed-dim font-bold">Premium Tier Badge</h4>
              <p className="text-body-md opacity-80 mt-1 text-sm">Get early matches with certified premium private clinic listings before they go online.</p>
              <button className="mt-4 text-primary-fixed-dim font-bold flex items-center gap-1 text-label-md">Learn More <span className="material-symbols-outlined text-[16px]">arrow_forward</span></button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[120px]">diamond</span>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface shadow-sm md:hidden border-t border-outline-variant">
        <Link to="/dashboard" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </Link>
        <Link to="/profile/dentist" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-label-md text-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
