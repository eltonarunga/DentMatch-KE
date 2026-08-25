import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DataStore, Offer } from '../lib/dataStore';
import { ApiService } from '../lib/api';

export default function ReviewOffer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [isCountering, setIsCountering] = useState(false);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterRate, setCounterRate] = useState('18000');
  const [counterNote, setCounterNote] = useState('I am available for the requested shift but my standard specialist rate for orthos is KES 18,000.');

  const offerId = searchParams.get('offerId') || 'offer-1';
  const [offer, setOffer] = useState<Offer>(() => {
    return DataStore.getOffer(offerId) || DataStore.getOffers()[0];
  });

  useEffect(() => {
    async function loadOffer() {
      try {
        const res = await fetch(`/api/offers/${offerId}`);
        if (res.ok) {
          const data = await res.json();
          setOffer(data);
        }
      } catch (err) {
        console.warn("Using local offer store", err);
      }
    }
    loadOffer();
  }, [offerId]);

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-surface text-on-surface">
        <div className="text-center space-y-4 max-w-sm">
          <span className="material-symbols-outlined text-5xl text-outline">error</span>
          <h2 className="text-xl font-bold">Offer Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAccept = async () => {
    setIsAccepting(true);
    // 1. Update API
    await ApiService.updateOfferStatus(offer.id, 'Accepted');
    // 2. Update local DataStore
    DataStore.updateOffer(offer.id, { status: 'Accepted' });
    setOffer(prev => ({ ...prev, status: 'Accepted' }));

    setTimeout(() => {
      const text = `Habari ${offer.clinicName}, this is Dr. David Omondi (KMPDC Verified). I have formally accepted your clinical locum offer (${offer.rate}) on DentMatch KE. Let's synchronize patient appointments!`;
      window.open(`https://wa.me/254700000000?text=${encodeURIComponent(text)}`, '_blank');
      setIsAccepting(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    await ApiService.updateOfferStatus(offer.id, 'Declined');
    DataStore.updateOffer(offer.id, { status: 'Declined' });
    setOffer(prev => ({ ...prev, status: 'Declined' }));

    setTimeout(() => {
      setIsDeclining(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleCounterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCountering(true);
    await ApiService.counterOffer(offer.id, {
      proposedRate: `KES ${Number(counterRate).toLocaleString()} / day`,
      proposedDays: offer.selectedDays || ['Mon', 'Tue', 'Wed'],
      note: counterNote
    });

    DataStore.updateOffer(offer.id, {
      rate: `KES ${Number(counterRate).toLocaleString()} / day (Countered)`,
      status: 'Pending'
    });

    setIsCountering(false);
    setShowCounterModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface shadow-sm sticky top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="w-9 h-9 border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-base md:text-lg font-bold text-on-surface">Contract Handshake Review</h1>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">verified</span> KMPDC Standard
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        {/* Clinic Header */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 mb-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-primary-container text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-3xl">domain</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-lg font-bold text-on-surface">{offer.clinicName}</h2>
                <span className="material-symbols-outlined text-secondary text-base" title="Verified Clinic" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-error">location_on</span>
                {offer.clinicLocation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-tertiary-container/60 text-on-tertiary-container px-3.5 py-1.5 rounded-xl font-bold text-xs self-start sm:self-auto">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Active Contract Offer</span>
          </div>
        </div>

        {/* Offer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-bold">1. Contract Terms</h3>
            
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-on-surface-variant mb-1 font-semibold">Position Role</p>
                <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container rounded-md font-bold text-xs">
                  {offer.role}
                </span>
              </div>
              
              <div>
                <p className="text-on-surface-variant mb-1 font-semibold">Planned Shift Schedule</p>
                <p className="text-sm text-on-surface font-bold">{offer.dates}</p>
                <p className="text-on-surface-variant mt-0.5">Days: {offer.selectedDays?.join(', ') || 'Mon - Fri'}</p>
              </div>

              <div>
                <p className="text-on-surface-variant mb-1 font-semibold">Offered Compensation</p>
                <p className="text-xl text-primary font-bold">{offer.rate}</p>
                <p className="text-on-surface-variant mt-0.5">Current Status: <strong className="uppercase text-secondary">{offer.status}</strong></p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs uppercase tracking-wider text-on-surface-variant mb-4 font-bold">2. Clinical Equipment & Support</h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <p className="text-on-surface-variant mb-2 font-semibold">Equipped Facilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {offer.equipment?.map((eq, i) => (
                    <span key={i} className="bg-surface-container text-on-surface px-2.5 py-1 rounded-lg font-medium border border-outline-variant/60">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-on-surface-variant mb-1 font-semibold">Chairside Dental Assistant</p>
                <div className="flex items-center gap-2.5 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/50">
                  <span className="material-symbols-outlined text-primary text-2xl">group</span>
                  <div>
                    <span className="font-bold text-on-surface text-xs block">Certified Nursing Assistant Provided</span>
                    <span className="text-on-surface-variant text-[11px]">Chairside preparation, sterilization & charting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message from clinic */}
        {offer.additionalNotes && (
          <div className="bg-primary-container/20 border border-primary/30 rounded-2xl p-4 mb-6 relative">
            <h3 className="text-xs font-bold text-primary mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">chat</span>
              Message from Clinic Medical Director
            </h3>
            <p className="text-xs text-on-surface leading-relaxed italic">
              "{offer.additionalNotes}"
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-center border-t border-outline-variant/60 pt-6">
          <button 
            type="button"
            onClick={handleDecline} 
            disabled={isDeclining || isAccepting || offer.status === 'Accepted' || offer.status === 'Declined'}
            className="w-full sm:w-auto px-5 py-3.5 font-bold text-error border border-outline-variant hover:bg-error/10 rounded-xl transition-colors text-xs disabled:opacity-50"
          >
            {isDeclining ? "Processing..." : offer.status === 'Declined' ? "Declined" : "Decline Offer"}
          </button>

          <button
            type="button"
            onClick={() => setShowCounterModal(true)}
            disabled={offer.status === 'Accepted' || offer.status === 'Declined'}
            className="w-full sm:w-auto px-5 py-3.5 font-bold text-on-surface border border-outline-variant hover:bg-surface-container rounded-xl transition-colors text-xs disabled:opacity-50"
          >
            Counter-Offer Rate
          </button>
          
          <button 
            type="button"
            onClick={handleAccept} 
            disabled={isAccepting || isDeclining || offer.status === 'Accepted'}
            className="w-full sm:flex-1 py-3.5 px-6 bg-primary text-on-primary font-bold rounded-xl active:scale-98 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-xs shadow-sm"
          >
            {isAccepting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                <span>Connecting WhatsApp...</span>
              </>
            ) : offer.status === 'Accepted' ? (
              "Contract Accepted ✓"
            ) : (
              <>
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Accept & Open WhatsApp Chat</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 border border-outline-variant animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-primary text-base">Submit Counter-Offer</h3>
              <button onClick={() => setShowCounterModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCounterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-on-surface-variant block mb-1">Your Proposed Daily Rate (KES)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-primary">KES</span>
                  <input 
                    type="number"
                    value={counterRate}
                    onChange={(e) => setCounterRate(e.target.value)}
                    className="w-full pl-14 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm font-bold text-on-surface outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-on-surface-variant block mb-1">Clinical Note / Reason for Counter</label>
                <textarea 
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-xl text-xs text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowCounterModal(false)}
                  className="flex-1 py-2.5 border border-outline-variant font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isCountering}
                  className="flex-1 py-2.5 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  {isCountering ? 'Submitting...' : 'Send Counter-Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
