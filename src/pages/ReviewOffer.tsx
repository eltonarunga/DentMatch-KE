import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ReviewOffer() {
  const navigate = useNavigate();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleAccept = () => {
    setIsAccepting(true);
    // Simulate accepting logic then navigate to WhatsApp
    setTimeout(() => {
      // Directs to a WhatsApp chat based on Kenyan phone formats
      window.open('https://wa.me/254700000000?text=' + encodeURIComponent('Hello Starlight Dental, I am accepting your locum offer on DentMatch KE. Let\'s coordinate!'), '_blank');
      setIsAccepting(false);
      navigate('/dashboard');
    }, 1200);
  };

  const handleDecline = () => {
    setIsDeclining(true);
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
          <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">Offer Details</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-margin-mobile py-8 md:py-12">
        {/* Clinic Header */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">apartment</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Starlight Dental</h2>
                <span className="material-symbols-outlined text-secondary text-[20px]" title="Verified Clinic" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="font-body-md text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Kilimani, Nairobi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-tertiary-container/30 text-tertiary px-4 py-2 rounded-lg font-label-md">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span>Expires in 24 hours</span>
          </div>
        </div>

        {/* Offer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4">Position Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-label-sm text-on-surface-variant mb-1">Role Type</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-md text-label-md font-bold">Locum</span>
                </div>
              </div>
              
              <div>
                <p className="font-label-sm text-on-surface-variant mb-1">Dates & Time</p>
                <p className="font-body-md text-on-surface font-semibold">15th Oct - 17th Oct, 2026</p>
                <p className="font-body-sm text-on-surface-variant">08:00 AM - 05:00 PM</p>
              </div>

              <div>
                <p className="font-label-sm text-on-surface-variant mb-1">Proposed Compensation</p>
                <p className="font-headline-sm text-primary font-bold">KES 15,000 <span className="text-body-md font-normal text-on-surface-variant">/ day</span></p>
                <p className="font-body-sm text-on-surface-variant mt-1">Total: KES 45,000</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4">Clinic Setup</h3>
            
            <div className="space-y-5">
              <div>
                <p className="font-label-sm text-on-surface-variant mb-2">Available Equipment</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md border border-outline-variant/50">Digital X-Ray</span>
                  <span className="bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md border border-outline-variant/50">Rotary Endo</span>
                  <span className="bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md border border-outline-variant/50">Autoclave B-Class</span>
                </div>
              </div>
              
              <div>
                <p className="font-label-sm text-on-surface-variant mb-2">Support Staff</p>
                <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-primary">group</span>
                  <div>
                    <p className="font-body-md font-semibold text-on-surface">1 Dental Assistant</p>
                    <p className="font-body-sm text-on-surface-variant">Available for chairside assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message from clinic */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 relative">
          <span className="material-symbols-outlined absolute top-4 right-6 text-primary/20 text-[48px]">format_quote</span>
          <h3 className="font-label-md text-label-md uppercase tracking-wider text-primary mb-3">Additional Notes</h3>
          <p className="font-body-md text-on-surface italic relative z-10">
            "Looking forward to having you join us for the busy weekend schedule. We have a lot of pediatric patients booked on Saturday. Please ensure you are comfortable with pediatric extractions and restorative work."
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-outline-variant pt-8">
          <button 
            onClick={handleDecline} 
            disabled={isDeclining || isAccepting}
            className="w-full sm:w-auto px-8 py-4 font-label-md font-bold text-on-surface-variant border-2 border-outline-variant hover:border-error hover:text-error rounded-xl transition-colors flex items-center justify-center"
          >
            {isDeclining ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
            ) : "Decline Offer"}
          </button>
          
          <button 
            onClick={handleAccept} 
            disabled={isAccepting || isDeclining}
            className="w-full sm:flex-1 px-8 py-4 bg-primary text-on-primary font-label-md font-bold rounded-xl active:scale-[0.98] hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isAccepting ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
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
