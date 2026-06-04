import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataStore, Offer, Dentist } from '../lib/dataStore';

export default function ClinicProfile() {
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Smilecare Dental Clinic",
    location: "Westlands, Nairobi",
    phone: "+254 700 000 000",
    email: "admin@smilecare.co.ke"
  });

  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [detailsData, setDetailsData] = useState({
    kmpdc: "FAC-89302",
    chairs: "4 fully equipped dental chairs",
    equipment: "OPG, Intraoral Camera, Rotary Endo"
  });

  // State managed dynamically in LocalStorage
  const [offers, setOffers] = useState<Offer[]>(() => DataStore.getOffers());
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [editSalary, setEditSalary] = useState('');
  const [editDates, setEditDates] = useState('');
  
  // Extra CV viewer inside clinic profile
  const [selectedCv, setSelectedCv] = useState<Dentist | null>(null);

  const handleDeleteOffer = (id: string) => {
    const updated = DataStore.deleteOffer(id);
    setOffers(updated);
  };

  const startEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setEditSalary(offer.salaryValue?.toString() || '');
    setEditDates(offer.dates || '');
  };

  const handleSaveOfferEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    const rateString = editingOffer.positionType === 'locum' 
      ? `KES ${Number(editSalary).toLocaleString()} / day` 
      : `KES ${Number(editSalary).toLocaleString()} / month`;

    const updated = DataStore.updateOffer(editingOffer.id, {
      salaryValue: Number(editSalary),
      dates: editDates,
      rate: rateString
    });

    setOffers(updated);
    setEditingOffer(null);
  };

  const handleOpenCv = (dentistId: string) => {
    const dentist = DataStore.getDentist(dentistId);
    if (dentist) {
      setSelectedCv(dentist);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface shadow-sm flex justify-between items-center w-full px-margin-mobile py-2 z-50 fixed top-0 left-0">
        <Link to="/browse" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">medical_services</span>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse" className="text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high px-2 py-1 rounded transition-colors">Browse</Link>
            <span className="text-primary font-bold font-label-md text-label-md hover:bg-surface-container-high px-2 py-1 rounded transition-colors">Profile</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-margin-mobile pt-24 md:pt-28">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 relative">
              <div className="w-24 h-24 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant">domain</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                {!isEditingProfile ? (
                  <div>
                    <h1 className="font-headline-lg text-headline-lg text-primary">{profileData.name}</h1>
                    <p className="font-body-lg text-on-surface-variant flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {profileData.location}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="bg-surface-container-high px-3 py-1 rounded-md text-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">call</span> {profileData.phone}</span>
                      <span className="bg-surface-container-high px-3 py-1 rounded-md text-label-md flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">mail</span> {profileData.email}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 w-full max-w-md">
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Clinic Name</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Location</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Phone Number</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Email</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                
                {!isEditingProfile ? (
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-md font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      KMPDC Verified
                    </div>
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="text-secondary hover:bg-secondary/10 px-3 py-1 rounded-lg transition-colors flex items-center gap-1 text-label-md font-bold"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-label-md font-bold"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setIsEditingProfile(false)}
                      className="text-on-surface-variant hover:bg-surface-container-high px-4 py-2 rounded-lg text-label-md font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-md text-primary flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined">corporate_fare</span> Clinic Details
              </h2>
              {!isEditingDetails ? (
                <button 
                  onClick={() => setIsEditingDetails(true)}
                  className="text-secondary hover:bg-secondary/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-label-md font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditingDetails(false)} className="text-on-surface-variant text-label-md font-bold hover:bg-surface-container-high px-3 py-1.5 rounded-lg">Cancel</button>
                  <button onClick={() => setIsEditingDetails(false)} className="bg-primary text-white text-label-md font-bold px-3 py-1.5 rounded-lg">Save</button>
                </div>
              )}
            </div>
            
            {!isEditingDetails ? (
              <div className="space-y-4">
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase font-semibold text-[11px] tracking-wider">Clinic Registration</p>
                  <p className="font-body-md font-bold">{detailsData.kmpdc}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase font-semibold text-[11px] tracking-wider">Number of chairs</p>
                  <p className="font-body-md">{detailsData.chairs}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase font-semibold text-[11px] tracking-wider">Equipment Available</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {detailsData.equipment.split(',').map((eq, i) => (
                      <span key={i} className="bg-surface-container-high px-2 py-1 rounded text-body-sm font-medium text-on-surface">{eq.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Clinic Registration (KMPDC)</label>
                  <input 
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    value={detailsData.kmpdc}
                    onChange={(e) => setDetailsData({...detailsData, kmpdc: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Number of Chairs</label>
                  <input 
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    value={detailsData.chairs}
                    onChange={(e) => setDetailsData({...detailsData, chairs: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Equipment Available (comma-separated)</label>
                  <input 
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    value={detailsData.equipment}
                    onChange={(e) => setDetailsData({...detailsData, equipment: e.target.value})}
                  />
                </div>
              </div>
            )}
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-md text-primary flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined">team_dashboard</span> Current Team
              </h2>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                  SK
                </div>
                <div className="flex-1">
                  <p className="font-label-md font-bold">Dr. Sarah Kimani</p>
                  <p className="text-body-sm text-on-surface-variant">Lead GP Dentist</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                  JW
                </div>
                <div className="flex-1">
                  <p className="font-label-md font-bold">Dr. James Wanjohi</p>
                  <p className="text-body-sm text-on-surface-variant">Orthodontist (Visiting)</p>
                </div>
              </div>
            </div>
            
            <button onClick={() => navigate('/browse')} className="mt-4 w-full bg-primary-container text-on-primary-container py-2.5 rounded-lg font-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Recruit Member
            </button>
          </section>
        </div>

        {/* Sent Offers Section */}
        <section className="mt-6 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-md text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined">send</span> Clinician Offers Log
            </h2>
          </div>
          
          <div className="space-y-4">
            {offers.length === 0 ? (
              <div className="py-8 text-center text-on-surface-variant">
                <p>No offers sent out yet.</p>
                <button onClick={() => navigate('/browse')} className="mt-2 text-primary font-bold hover:underline">
                  Browse dentists to send offers
                </button>
              </div>
            ) : (
              offers.map(offer => (
                <div key={offer.id} className="border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest hover:border-primary transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-label-lg font-bold text-on-surface flex items-center gap-1.5">
                        {offer.dentistName}
                        <button 
                          onClick={() => handleOpenCv(offer.dentistId)}
                          className="text-[12px] bg-secondary-container text-on-secondary-container rounded-sm px-1.5 py-0.5 hover:underline"
                        >
                          View CV
                        </button>
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        offer.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mb-2 font-medium">{offer.role} • {offer.dates} • <span className="text-primary font-bold">{offer.rate}</span></p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {offer.timeAgo}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => startEditOffer(offer)} 
                      className="text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-label-md font-bold text-body-sm border border-outline-variant"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteOffer(offer.id)} 
                      className="text-error hover:bg-error/10 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-label-md font-bold text-body-sm border border-outline-variant"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
        <div className="mt-8 flex justify-center">
            <button onClick={() => navigate('/')} className="text-error font-label-md px-4 py-2 hover:bg-error/10 rounded-lg transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">logout</span>
                Log Out
            </button>
        </div>
      </main>

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <form onSubmit={handleSaveOfferEdit} className="bg-surface w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant">
              <h3 className="font-headline-sm font-bold text-primary">Edit Offer Parameters</h3>
              <button type="button" onClick={() => setEditingOffer(null)} className="material-symbols-outlined text-outline">close</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-label-md text-on-surface-variant font-bold mb-1 block">Offer Rate (KES)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">KES</span>
                  <input 
                    type="number" 
                    value={editSalary} 
                    onChange={(e) => setEditSalary(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-surface-container Low border border-outline-variant rounded-lg font-bold"
                  />
                </div>
                <p className="text-[10px] text-on-surface-variant mt-1">Updates daily rate for Locums or monthly salary for permanent staff.</p>
              </div>

              <div>
                <label className="text-label-md text-on-surface-variant font-bold mb-1 block">Fulfillment Dates</label>
                <input 
                  type="text" 
                  value={editDates} 
                  onChange={(e) => setEditDates(e.target.value)}
                  required
                  className="w-full px-3 py-3 bg-surface-container Low border border-outline-variant rounded-lg font-medium"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4 justify-end">
              <button 
                type="button" 
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2 font-bold border border-outline-variant rounded-lg text-on-surface-variant"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container hover:text-primary transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View CV Modal */}
      {selectedCv && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h2 className="font-headline-sm font-bold text-primary">Dentist CV Snapshot</h2>
              <button onClick={() => setSelectedCv(null)} className="text-on-surface-variant p-2 rounded-full transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant">
                  <span className="material-symbols-outlined text-outline text-3xl">account_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface flex items-center gap-2 font-bold">
                    {selectedCv.name}
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </h3>
                  <p className="font-label-lg text-secondary font-bold uppercase tracking-wider">{selectedCv.specialty}</p>
                  <p className="text-body-md text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> {selectedCv.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Experience</p>
                  <p className="font-headline-sm text-on-surface font-bold">{selectedCv.experience}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">KMPDC License</p>
                  <p className="font-headline-sm text-on-surface font-bold">{selectedCv.license}</p>
                </div>
              </div>

              <div>
                <h4 className="font-label-lg font-bold mb-2 pb-1 border-b border-outline-variant text-primary uppercase text-[11px] tracking-wider">Education</h4>
                <p className="font-bold text-on-surface">{selectedCv.education.degree}</p>
                <p className="text-body-md text-on-surface-variant">{selectedCv.education.school} • {selectedCv.education.year}</p>
              </div>

              <div>
                <h4 className="font-label-lg font-bold mb-2 pb-1 border-b border-outline-variant text-primary uppercase text-[11px] tracking-wider">Proficient Equipment</h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedCv.equipment.map((eq) => (
                    <span key={eq} className="bg-surface-container text-on-surface px-2.5 py-1 rounded text-body-sm border border-outline-variant">{eq}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end">
              <button 
                onClick={() => setSelectedCv(null)} 
                className="px-6 py-2.5 font-bold border rounded-xl hover:bg-surface-container"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface shadow-sm border-t border-outline-variant md:hidden">
        <Link to="/browse" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">person_search</span>
          <span className="font-label-md">Browse</span>
        </Link>
        <Link to="/profile/clinic" className="flex flex-col items-center justify-center text-primary bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
          <span className="font-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
