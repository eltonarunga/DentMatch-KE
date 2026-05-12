import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DentistProfile() {
  const navigate = useNavigate();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Omondi",
    specialty: "General Dentist",
    yearsOfPractice: 5,
    kmpdc: "A1234",
    location: "Nairobi HQ"
  });

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [preferencesData, setPreferencesData] = useState({
    locumRate: 15000,
    permanentRate: 250000
  });

  const handleProfileSave = () => {
    setIsEditingProfile(false);
  };

  const handlePreferencesSave = () => {
    setIsEditingPreferences(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface shadow-sm sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-2">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-headline-sm">medical_services</span>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high px-2 py-1 rounded transition-colors">Dashboard</Link>
            <Link to="/profile/dentist" className="font-label-md text-label-md text-primary font-bold hover:bg-surface-container-high px-2 py-1 rounded transition-colors">Profile</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-margin-mobile pt-8 md:pt-12">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            <div className="shrink-0 relative">
              <div className="w-24 h-24 rounded-full bg-primary-container border-4 border-surface shadow-sm overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary">person</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                {!isEditingProfile ? (
                  <div>
                    <h1 className="font-headline-lg text-headline-lg text-primary">{profileData.name}</h1>
                    <p className="font-body-lg text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">dentistry</span>
                      {profileData.specialty} ({profileData.yearsOfPractice}+ Years)
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="bg-surface-container-high px-3 py-1 rounded-md text-label-md">KMPDC: {profileData.kmpdc}</span>
                      <span className="bg-surface-container-high px-3 py-1 rounded-md text-label-md">{profileData.location}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 w-full max-w-md">
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Name</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Specialty</label>
                      <input 
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.specialty}
                        onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-label-sm text-on-surface-variant">Years of Practice</label>
                      <input 
                        type="number"
                        className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={profileData.yearsOfPractice}
                        onChange={(e) => setProfileData({...profileData, yearsOfPractice: Number(e.target.value)})}
                      />
                    </div>
                  </div>
                )}

                {!isEditingProfile ? (
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-md font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Verified
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
                      onClick={handleProfileSave}
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
                <span className="material-symbols-outlined">description</span> Documents
              </h2>
              <button className="text-secondary hover:bg-secondary/10 p-1.5 rounded-full transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <div className="flex-1">
                  <p className="font-label-md font-bold">KMPDC License</p>
                  <p className="text-body-sm text-on-surface-variant">Validated 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <div className="flex-1">
                  <p className="font-label-md font-bold">National ID</p>
                  <p className="text-body-sm text-on-surface-variant">Verified</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-md text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">payments</span> Preferences
              </h2>
              {!isEditingPreferences ? (
                <button 
                  onClick={() => setIsEditingPreferences(true)}
                  className="text-secondary hover:bg-secondary/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 text-label-md font-bold"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditingPreferences(false)} className="text-on-surface-variant text-label-md font-bold hover:bg-surface-container-high px-3 py-1.5 rounded-lg">Cancel</button>
                  <button onClick={handlePreferencesSave} className="bg-primary text-white text-label-md font-bold px-3 py-1.5 rounded-lg">Save</button>
                </div>
              )}
            </div>
            
            {!isEditingPreferences ? (
              <div className="space-y-4">
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1">Locum Rate (Daily)</p>
                  <p className="font-headline-sm">KES {preferencesData.locumRate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-label-md text-on-surface-variant mb-1">Permanent Rate (Monthly)</p>
                  <p className="font-headline-sm">KES {preferencesData.permanentRate.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Locum Rate (Daily KES)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    value={preferencesData.locumRate}
                    onChange={(e) => setPreferencesData({...preferencesData, locumRate: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface-variant mb-1 block">Permanent Rate (Monthly KES)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    value={preferencesData.permanentRate}
                    onChange={(e) => setPreferencesData({...preferencesData, permanentRate: Number(e.target.value)})}
                  />
                </div>
              </div>
            )}
          </section>
        </div>
        
        <div className="mt-8 flex justify-center">
            <button onClick={() => navigate('/')} className="text-error font-label-md px-4 py-2 hover:bg-error/10 rounded-lg transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">logout</span>
                Log Out
            </button>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface shadow-sm border-t border-outline-variant">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md">Dashboard</span>
        </Link>
        <Link to="/profile/dentist" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          <span className="font-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
