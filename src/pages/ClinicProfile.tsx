import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const [sentOffers, setSentOffers] = useState([
    {
      id: 1,
      name: "Dr. Omondi",
      status: "Pending",
      role: "Locum",
      dates: "15th-17th Oct",
      rate: "KES 15,000/day",
      timeAgo: "Sent 2 hours ago"
    },
    {
      id: 2,
      name: "Dr. Sarah Kimani",
      status: "Accepted",
      role: "Permanent",
      dates: "Full Time",
      rate: "KES 250,000/mo",
      timeAgo: "Accepted 2 days ago"
    }
  ]);

  const handleDeleteOffer = (id: number) => {
    setSentOffers(prev => prev.filter(offer => offer.id !== id));
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
            <Link to="/profile/clinic" className="text-primary font-bold font-label-md text-label-md hover:bg-surface-container-high px-2 py-1 rounded transition-colors">Profile</Link>
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
                    <p className="font-body-lg text-on-surface-variant flex items-center gap-1">
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
                      Verified Clinic
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
              <h2 className="font-headline-md text-primary flex items-center gap-2">
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
                  <p className="text-label-md text-on-surface-variant mb-1">Clinic Registration</p>
                  <p className="font-body-md">{detailsData.kmpdc}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1">Number of chairs</p>
                  <p className="font-body-md">{detailsData.chairs}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1">Equipment Available</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {detailsData.equipment.split(',').map((eq, i) => (
                      <span key={i} className="bg-surface-container-high px-2 py-1 rounded text-body-sm">{eq.trim()}</span>
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
              <h2 className="font-headline-md text-primary flex items-center gap-2">
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
                  <p className="text-body-sm text-on-surface-variant">Lead Dentist</p>
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
            
            <button onClick={() => navigate('/browse')} className="mt-4 w-full bg-primary-container text-on-primary-container py-2 rounded-lg font-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Recruit Member
            </button>
          </section>
        </div>

        {/* Sent Offers Section */}
        <section className="mt-6 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">send</span> Sent Offers
            </h2>
          </div>
          
          <div className="space-y-4">
            {sentOffers.length === 0 ? (
              <p className="text-on-surface-variant text-body-md py-4 text-center">No sent offers found.</p>
            ) : (
              sentOffers.map(offer => (
                <div key={offer.id} className={`border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${offer.status === 'Accepted' ? 'opacity-75' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-label-lg font-bold text-on-surface">{offer.name}</h3>
                      <span className={`${offer.status === 'Accepted' ? 'bg-success/20 text-success' : 'bg-secondary-container text-on-secondary-container'} px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider`}>
                        {offer.status}
                      </span>
                    </div>
                    <p className="text-body-sm text-on-surface-variant mb-2">{offer.role} • {offer.dates} • {offer.rate}</p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {offer.timeAgo}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      disabled={offer.status === 'Accepted'} 
                      onClick={() => navigate('/send-offer')} 
                      className={`${offer.status === 'Accepted' ? 'text-on-surface-variant/50 cursor-not-allowed' : 'text-primary hover:bg-primary/10'} px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-label-md`}
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                    </button>
                    <button 
                      disabled={offer.status === 'Accepted'} 
                      onClick={() => handleDeleteOffer(offer.id)} 
                      className={`${offer.status === 'Accepted' ? 'text-on-surface-variant/50 cursor-not-allowed' : 'text-error hover:bg-error/10'} px-3 py-2 rounded-lg transition-colors flex items-center gap-1 font-label-md`}
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
