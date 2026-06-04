import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DataStore, Offer } from '../lib/dataStore';

export default function ReviewOffer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const offerId = searchParams.get('offerId') || 'offer-1';
  const offer = DataStore.getOffer(offerId) || DataStore.getOffers()[0];

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-surface">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-outline">error</span>
          <h2 className="text-headline-md font-bold">Offer Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="bg-primary text-on-primary px-4 py-2 rounded-lg">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAccept = () => {
    setIsAccepting(true);
    // Persist Accepted state instantly
    DataStore.updateOffer(offer.id, { status: 'Accepted' });

    setTimeout(() => {
      // Directs to a WhatsApp chat with localized message
      const text = `Hello Smilecare Dental, I have accepted your locum offer on DentMatch KE. Let's align on the dates and chairs schedule coordinates!`;
      window.open(`https://wa.me/254700000000?text=${encodeURIComponent(text)}`, '_blank');
      setIsAccepting(false);
      navigate('/dashboard');
    }, 1200);
  };

  const handleDecline = () => {
    setIsDeclining(true);
    // Persist Declined state instantly
    DataStore.updateOffer(offer.id, { status: 'Declined' });

    setTimeout(() => {
      setIsDeclining(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface shadow-sm sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-3 md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Clinical Offer Details</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-margin-mobile py-8 md:py-12">
        {/* Clinic Header */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary-container text-primary flex items-center justify-center shrink-0 border border-outline-variant">
              <span className="material-symbols-outlined text-[32px]">apartment</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface text-xl md:text-2xl">{offer.clinicName}</h2>
                <span className="material-symbols-outlined text-secondary text-[20px]" title="Verified Clinic" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="font-body-md text-on-surface-variant flex items-center gap-1 text-sm font-medium">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {offer.clinicLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-bold text-body-sm shadow-sm">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>Expires in 24 hours</span>
          </div>
        </div>

        {/* Offer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4 font-bold text-sm">Contract Terms</h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-label-sm text-on-surface-variant mb-1 text-[11px] uppercase tracking-wider font-semibold">Role Type</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-md text-label-md font-bold text-sm">
                    {offer.role}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="font-label-sm text-on-surface-variant mb-1 text-[11px] uppercase tracking-wider font-semibold">Planned Schedule</p>
                <p className="font-body-md text-on-surface font-bold text-lg">{offer.dates}</p>
                <p className="font-body-sm text-on-surface-variant">Selected days: {offer.selectedDays?.join(', ') || 'Mon - Fri'}</p>
              </div>

              <div>
                <p className="font-label-sm text-on-surface-variant mb-1 text-[11px] uppercase tracking-wider font-semibold">Compensation</p>
                <p className="font-headline-sm text-primary font-bold text-xl md:text-2xl">{offer.rate}</p>
                <p className="font-body-sm text-on-surface-variant mt-1">Status: <strong className="uppercase">{offer.status}</strong></p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4 font-bold text-sm">Clinical Setup</h3>
            
            <div className="space-y-5">
              <div>
                <p className="font-label-sm text-on-surface-variant mb-2 text-[11px] uppercase tracking-wider font-semibold">Required Equipment Proficiency</p>
                <div className="flex flex-wrap gap-2">
                  {offer.equipment?.map((eq, i) => (
                    <span key={i} className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-body-sm font-semibold border border-outline-variant">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-label-sm text-on-surface-variant mb-2 text-[11px] uppercase tracking-wider font-semibold">Chairside Support Staff</p>
                <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-primary text-3xl">group</span>
                  <div>
                    <span className="font-body-md font-bold text-on-surface text-sm block">1 Dental Assistant</span>
                    <span className="font-body-sm text-on-surface-variant text-xs">Assigned for fully synchronized clinical assistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message from clinic */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 relative">
          <span className="material-symbols-outlined absolute top-4 right-6 text-primary/20 text-[48px]">format_quote</span>
          <h3 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-3 font-semibold text-xs tracking-widest">Additional Clinic Notes</h3>
          <p className="font-body-md text-on-surface italic relative z-10 text-sm">
            "{offer.additionalNotes}"
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-outline-variant pt-8">
          <button 
            type="button"
            onClick={handleDecline} 
            disabled={isDeclining || isAccepting || offer.status === 'Accepted' || offer.status === 'Declined'}
            className="w-full sm:w-auto px-8 py-4 font-bold text-on-surface-variant border-2 border-outline-variant hover:border-error hover:text-error rounded-xl transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isDeclining ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : offer.status === 'Declined' ? "Declined" : "Decline Offer"}
          </button>
          
          <button 
            type="button"
            onClick={handleAccept} 
            disabled={isAccepting || isDeclining || offer.status === 'Accepted' || offer.status === 'Declined'}
            className="w-full sm:flex-1 px-8 py-4 bg-primary text-on-primary font-bold rounded-xl active:scale-[0.98] hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAccepting ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : offer.status === 'Accepted' ? (
              "Accepted (Chat Connected)"
            ) : (
              <>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Accept & Chat on WhatsApp
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
