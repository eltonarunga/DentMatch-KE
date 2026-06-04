import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DataStore } from '../lib/dataStore';

export default function SendOffer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const dentistId = searchParams.get('dentistId') || 'dentist-842';
  const dentist = DataStore.getDentist(dentistId) || DataStore.getDentists()[0];

  const [positionType, setPositionType] = useState('locum');
  const [salary, setSalary] = useState(positionType === 'locum' ? '15000' : '200000');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [equipment, setEquipment] = useState(['Digital X-Ray (RVG)', 'Class B Autoclave', 'Rotary Endo Motor']);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [clinicLocation, setClinicLocation] = useState('Valley Arcade Shopping Centre, Lavington, Nairobi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salary || Number(salary) <= 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new offer representation
    const newOffer = {
      dentistId: dentist.id,
      dentistName: dentist.name,
      clinicName: "Smilecare Dental Clinic",
      clinicLocation: clinicLocation,
      role: positionType === 'locum' ? 'Locum' : 'Permanent',
      dates: positionType === 'locum' ? '15th Oct - 17th Oct, 2026' : 'Full Time',
      rate: positionType === 'locum' 
        ? `KES ${Number(salary).toLocaleString()} / day` 
        : `KES ${Number(salary).toLocaleString()} / month`,
      salaryValue: Number(salary),
      positionType: positionType as 'locum' | 'permanent',
      selectedDays,
      equipment,
      additionalNotes: additionalNotes || "Looking forward to having you join us support team. Let's touch base on details!"
    };

    setTimeout(() => {
      DataStore.addOffer(newOffer);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 900);
  };

  // Safe WhatsApp Link Generator
  const getWhatsAppLink = () => {
    const text = `Hello ${dentist.name}, I am matching you for the clinical role at Smilecare Dental Clinic: ${positionType === 'locum' ? 'Locum' : 'Permanent'} position starting mid-October with daily rate KES ${Number(salary).toLocaleString()}. Let's coordinate details on DentMatch KE!`;
    return `https://wa.me/254700000000?text=${encodeURIComponent(text)}`;
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

      <main className="pt-24 pb-32 px-margin-mobile max-w-5xl mx-auto">
        {showSuccess ? (
          <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-md mx-auto text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="space-y-2">
              <h1 className="font-headline-md text-headline-md text-primary font-bold">Offer Sent Safely!</h1>
              <p className="text-body-md text-on-surface-variant">
                Your offer has been submitted to <span className="font-bold text-on-surface">{dentist.name}</span> in Mombasa/Nairobi and stored in your profile list.
              </p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant space-y-2">
              <p className="text-body-sm text-on-surface flex justify-between">
                <span>Position Type:</span> <strong className="uppercase">{positionType}</strong>
              </p>
              <p className="text-body-sm text-on-surface flex justify-between">
                <span>Proposed Rate:</span> <strong>KES {Number(salary).toLocaleString()}</strong>
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:shadow-md transition active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">chat</span> Notify on WhatsApp
              </a>
              <button 
                onClick={() => navigate('/profile/clinic')}
                className="w-full py-3 border border-outline-variant hover:bg-surface-container text-on-surface-variant font-bold rounded-lg transition"
              >
                Go to Clinic Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-4">
              <button onClick={() => navigate('/browse')} className="p-2 border border-outline-variant rounded-full flex items-center justify-center hover:bg-surface-container-high transition">
                 <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary mb-1">Sending Offer to {dentist.name}</h1>
                <p className="font-body-md text-on-surface-variant">Setup precise, compliant daily or monthly packages for maximum responses.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form className="lg:col-span-8 space-y-6" onSubmit={handleSubmit}>
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 font-bold text-primary">
                    <span className="material-symbols-outlined text-secondary">assignment</span>
                    Job Fundamentals
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Position Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          type="button"
                          onClick={() => {
                            setPositionType('locum');
                            setSalary('15000');
                          }}
                          className={`flex items-center justify-center p-4 border rounded-xl transition-all font-bold ${
                            positionType === 'locum' 
                              ? 'border-primary bg-primary text-on-primary shadow-sm' 
                              : 'border-outline hover:bg-surface-container-high'
                          }`}
                        >
                          Locum Position
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setPositionType('permanent');
                            setSalary('200000');
                          }}
                          className={`flex items-center justify-center p-4 border rounded-xl transition-all font-bold ${
                            positionType === 'permanent' 
                              ? 'border-primary bg-primary text-on-primary shadow-sm' 
                              : 'border-outline hover:bg-surface-container-high'
                          }`}
                        >
                          Permanent Role
                        </button>
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
                          required
                          min="1"
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-on-surface-variant">Verified salaries improve dentist feedback intervals by 45%.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 font-bold text-primary">
                    <span className="material-symbols-outlined text-secondary">calendar_month</span> Work Schedule
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map(day => (
                      <button 
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-4 py-2 rounded-full border transition-colors font-label-md text-label-md ${
                          selectedDays.includes(day)
                            ? 'border-primary bg-primary-container text-on-primary-container shadow-sm font-bold'
                            : 'border-outline-variant hover:bg-surface-container-high text-on-surface'
                        }`}
                        type="button"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 font-bold text-primary">
                    <span className="material-symbols-outlined text-secondary">biotech</span> Available Equipment
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {EQUIPMENT_LIST.map((item) => (
                      <button 
                        key={item}
                        type="button"
                        onClick={() => handleEquipmentToggle(item)}
                        className={`flex items-center gap-3 p-3 border rounded-xl transition-all text-left ${
                          equipment.includes(item)
                            ? 'bg-secondary-container text-on-secondary-container border-secondary font-bold'
                            : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {equipment.includes(item) ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span className="font-body-md">{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 font-bold text-primary">
                    <span className="material-symbols-outlined text-secondary">location_on</span> Clinic Location
                  </h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <input 
                        className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body-md" 
                        type="text" 
                        value={clinicLocation}
                        onChange={(e) => setClinicLocation(e.target.value)}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">edit</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant">
                  <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 font-bold text-primary">
                    <span className="material-symbols-outlined text-secondary">chat</span> Additional Notes
                  </h2>
                  <textarea 
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    placeholder="We have a pediatric specialist booked on Saturday so pediatric surgery experience is a plus."
                    className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-primary transition-all duration-200 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-50" 
                    type="submit"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Send Handshake Offer <span className="material-symbols-outlined">send</span>
                      </>
                    )}
                  </button>
                  <p className="text-center mt-3 text-label-md text-on-surface-variant">The dentist can accept and automatically initialize a WhatsApp chat.</p>
                </div>
              </form>

              <aside className="lg:col-span-4 space-y-6">
                <div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-xl border border-outline-variant">
                  <h3 className="font-headline-sm font-bold flex items-center gap-2 mb-2 text-primary">
                    <span className="material-symbols-outlined">shield</span> Integrity Model
                  </h3>
                  <p className="text-body-md opacity-90 mb-4">DentMatch KE operates with KMPDC verification compliance. Offers are pre-checked for fair clinical locum practices.</p>
                  <div className="flex items-center gap-2 bg-on-secondary/15 p-2.5 rounded-lg text-body-sm">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>Verified Payment Handshake</span>
                  </div>
                </div>
                
                <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
                  <h3 className="font-headline-sm text-primary font-bold mb-4">Candidate Profile</h3>
                  <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-surface-container-high border border-outline-variant">
                    <span className="material-symbols-outlined text-4xl text-secondary">account_circle</span>
                    <div>
                      <p className="font-bold text-on-surface">{dentist.name}</p>
                      <p className="text-body-sm text-on-surface-variant">{dentist.specialty}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[20px]">school</span> 
                      <span>{dentist.education.degree}</span>
                    </li>
                    <li className="flex items-center gap-2 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[20px]">star</span> 
                      <span>{dentist.rating} / 5 Rating</span>
                    </li>
                    <li className="flex items-center gap-2 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-[20px]">badge</span> 
                      <span>KMPDC Lic. {dentist.license}</span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}
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
