import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SendOffer() {
  const navigate = useNavigate();

  const [positionType, setPositionType] = useState('permanent');
  const [salary, setSalary] = useState('');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [equipment, setEquipment] = useState(['Digital X-Ray (RVG)', 'Class B Autoclave', 'Rotary Endo Motor']);

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const EQUIPMENT_LIST = [
    'Digital X-Ray (RVG)', 
    'Class B Autoclave', 
    'CBCT Scanner',
    'Rotary Endo Motor', 
    'Apex Locator', 
    'Intraoral Scanner',
    'Dental Implant Motor', 
    'Soft Tissue Laser'
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleEquipmentToggle = (item: string) => {
    setEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <header className="bg-surface shadow-sm flex justify-between items-center w-full px-margin-mobile py-2 z-50 fixed top-0 left-0">
        <Link to="/browse" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">medical_services</span>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse" className="text-primary font-bold font-label-md text-label-md">Browse</Link>
            <Link to="/profile/clinic" className="text-on-surface-variant hover:bg-surface-container-high px-2 py-1 rounded transition-colors font-label-md text-label-md">Profile</Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-margin-mobile max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button onClick={() => navigate('/browse')} className="p-2 border border-outline-variant rounded-full flex items-center justify-center hover:bg-surface-container-high transition">
             <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline-lg text-headline-lg text-primary mb-1">Sending Offer to Dentist #402</h1>
            <p className="font-body-md text-on-surface-variant">Review clinic details and set transparent terms to attract high-quality candidates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form className="lg:col-span-8 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Offer Sent! Dentist notified on WhatsApp."); navigate('/browse'); }}>
            <div className="bg-surface-container-lowest p-6 rounded-xl form-shadow border border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">assignment</span>
                Job Fundamentals
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Position Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="cursor-pointer" onClick={() => setPositionType('locum')}>
                      <input className="hidden peer" name="position_type" type="radio" value="locum" checked={positionType === 'locum'} readOnly/>
                      <div className="flex items-center justify-center p-4 border border-outline peer-checked:border-primary peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed-variant rounded-lg transition-all font-bold">
                          Locum
                      </div>
                    </label>
                    <label className="cursor-pointer" onClick={() => setPositionType('permanent')}>
                      <input className="hidden peer" name="position_type" type="radio" value="permanent" checked={positionType === 'permanent'} readOnly/>
                      <div className="flex items-center justify-center p-4 border border-outline peer-checked:border-primary peer-checked:bg-primary-fixed peer-checked:text-on-primary-fixed-variant rounded-lg transition-all font-bold">
                          Permanent
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant block mb-1">
                    {positionType === 'permanent' ? 'Salary Offer (Fixed Monthly)' : 'Salary Offer (Per Day)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">KES</span>
                    <input 
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="w-full pl-14 pr-4 py-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-bold text-headline-sm" 
                      placeholder="0.00" 
                      type="number"
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-on-surface-variant">Transparency increases application rates by 45% in the Nairobi metro area.</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl form-shadow border border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">calendar_month</span> Work Schedule
              </h2>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(day => (
                  <button 
                    key={day}
                    onClick={() => handleDayToggle(day)}
                    className={`px-4 py-2 rounded-full border transition-colors font-label-md text-label-md ${
                      selectedDays.includes(day)
                        ? 'border-primary bg-primary text-on-primary shadow-sm'
                        : 'border-outline-variant hover:bg-surface-container-high text-on-surface'
                    }`}
                    type="button"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl form-shadow border border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">biotech</span> Available Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {EQUIPMENT_LIST.map((item) => (
                  <label key={item} className="flex items-center gap-4 p-3 bg-surface-container-lowest hover:bg-surface-container-low border border-outline-variant rounded-xl transition-colors cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        className="w-5 h-5 rounded border-outline appearance-none checked:bg-secondary checked:border-secondary transition-colors" 
                        type="checkbox"
                        checked={equipment.includes(item)}
                        onChange={() => handleEquipmentToggle(item)}
                      />
                      <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-on-secondary text-[16px] pointer-events-none opacity-0 peer-checked:opacity-100" style={{ opacity: equipment.includes(item) ? 1 : 0 }}>check</span>
                    </div>
                    <span className="font-body-md font-medium text-on-surface group-hover:text-primary transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl form-shadow border border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">location_on</span> Clinic Location
              </h2>
              <div className="space-y-4">
                <div className="relative">
                  <input className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" type="text" defaultValue="Valley Arcade Shopping Centre, Lavington, Nairobi"/>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">edit</span>
                </div>
                <div className="w-full h-48 bg-surface-container-high rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-2 rounded-full shadow-lg">
                      <span className="material-symbols-outlined text-primary text-3xl">location_pin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button className="w-full bg-primary-container text-on-primary-container hover:bg-primary transition-all duration-200 py-6 rounded-xl font-headline-sm flex items-center justify-center gap-4 shadow-lg active:scale-[0.98]" type="submit">
                Send Transparent Offer <span className="material-symbols-outlined">send</span>
              </button>
              <p className="text-center mt-4 text-label-md text-on-surface-variant">The candidate will be notified instantly via the DentMatch mobile app.</p>
            </div>
          </form>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-tertiary text-on-tertiary p-6 rounded-xl shadow-md">
              <h3 className="font-headline-sm mb-2">Offer Integrity</h3>
              <p className="text-body-md opacity-90 mb-4">DentMatch KE operates on a "True Value" model. Offers sent through this portal are considered final binding figures once accepted.</p>
              <div className="flex items-center gap-2 bg-on-tertiary/10 p-2 rounded-lg">
                <span className="material-symbols-outlined">verified_user</span>
                <span className="font-label-md">Verified Payment Escrow Enabled</span>
              </div>
            </div>
            
            <div className="bg-surface-container p-6 rounded-xl border border-outline-variant">
              <h3 className="font-headline-sm text-primary mb-4">Candidate Preview</h3>
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="font-headline-sm">Dentist #402</p>
                  <span className="bg-secondary-container text-on-secondary-container px-2 py-[2px] rounded text-[10px] font-bold uppercase tracking-wider">Specialist</span>
                </div>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-body-md">
                  <span className="material-symbols-outlined text-outline text-lg">school</span> BDS University of Nairobi
                </li>
                <li className="flex items-center gap-2 text-body-md">
                  <span className="material-symbols-outlined text-outline text-lg">history</span> 6 Years Experience
                </li>
                <li className="flex items-center gap-2 text-body-md">
                  <span className="material-symbols-outlined text-outline text-lg">star</span> 4.9/5 Average Rating
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface shadow-sm md:hidden border-t border-outline-variant">
        <Link to="/browse" className="flex flex-col items-center justify-center text-primary bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
          <span className="font-label-md text-label-md">Browse</span>
        </Link>
        <Link to="/profile/clinic" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">domain</span>
          <span className="font-label-md text-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
