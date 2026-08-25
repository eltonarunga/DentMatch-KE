import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DataStore, Dentist } from '../lib/dataStore';
import { ApiService } from '../lib/api';

export default function SendOffer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const dentistId = searchParams.get('dentistId') || 'dentist-842';
  const [dentist, setDentist] = useState<Dentist>(() => {
    return DataStore.getDentist(dentistId) || DataStore.getDentists()[0];
  });

  useEffect(() => {
    async function loadDentist() {
      const data = await ApiService.getDentistById(dentistId);
      if (data) setDentist(data);
    }
    loadDentist();
  }, [dentistId]);

  const [positionType, setPositionType] = useState<'locum' | 'permanent'>('locum');
  const [salary, setSalary] = useState('15000');
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [equipment, setEquipment] = useState(['Digital X-Ray (RVG)', 'Class B Autoclave', 'Rotary Endo Motor']);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [clinicLocation, setClinicLocation] = useState('Valley Arcade Shopping Centre, Lavington, Nairobi');
  const [enableEscrow, setEnableEscrow] = useState(true);
  const [mpesaPhone, setMpesaPhone] = useState('0712345678');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stkStatus, setStkStatus] = useState<'idle' | 'prompted' | 'completed'>('idle');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salary || Number(salary) <= 0) return;
    
    setIsSubmitting(true);

    const offerPayload = {
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
      positionType: positionType,
      selectedDays,
      equipment,
      additionalNotes: additionalNotes || "We provide clinical support assistants, all PPE, and modern dental instrumentation.",
      enableEscrow
    };

    try {
      // 1. If escrow enabled, trigger Safaricom STK Push simulation
      if (enableEscrow && positionType === 'locum') {
        setStkStatus('prompted');
        await ApiService.initiateMpesaStkPush(mpesaPhone, Number(salary), dentist.id);
        // Wait 1.2s to simulate user entering M-Pesa PIN
        await new Promise(r => setTimeout(r, 1200));
        setStkStatus('completed');
      }

      // 2. Dispatch to Backend
      const apiRes = await ApiService.createOffer(offerPayload);
      if (!apiRes || !apiRes.success) {
        // Fallback to local DataStore
        DataStore.addOffer(offerPayload);
      } else {
        DataStore.addOffer(apiRes.offer);
      }

      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (err) {
      DataStore.addOffer(offerPayload);
      setIsSubmitting(false);
      setShowSuccess(true);
    }
  };

  // WhatsApp Dispatch Link Generator
  const getWhatsAppLink = () => {
    const text = `Habari ${dentist.name}, Smilecare Dental Clinic (Nairobi) has sent you a formal reverse-recruitment offer on DentMatch KE for a ${positionType.toUpperCase()} role at KES ${Number(salary).toLocaleString()}${positionType === 'locum' ? '/day' : '/month'}. Please review and confirm your availability on DentMatch KE: https://dentmatch.co.ke/review-offer`;
    return `https://wa.me/254712345678?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      {/* Top Header */}
      <header className="bg-surface shadow-sm flex justify-between items-center w-full px-4 md:px-8 py-3 z-50 fixed top-0 left-0 border-b border-outline-variant/40">
        <Link to="/browse" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-container rounded-lg flex items-center justify-center text-primary font-bold">
            <span className="material-symbols-outlined text-[22px]">medical_services</span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">DentMatch KE</span>
            <span className="text-[10px] block text-on-surface-variant leading-none">Contract Offer Engine</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/browse" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Browse</Link>
          <Link to="/profile/clinic" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Clinic Profile</Link>
        </div>
      </header>

      <main className="pt-20 pb-28 px-4 md:px-8 max-w-5xl mx-auto">
        {showSuccess ? (
          <div className="bg-surface border border-outline-variant rounded-2xl p-8 max-w-lg mx-auto text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-200 mt-6">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto shadow-xs">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div className="space-y-2">
              <h1 className="font-headline-md text-2xl text-primary font-bold">Binding Offer Dispatched!</h1>
              <p className="text-body-md text-on-surface-variant">
                Your offer has been officially registered and dispatched to <strong className="text-on-surface">{dentist.name}</strong>.
              </p>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl text-left border border-outline-variant space-y-2.5 text-sm">
              <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                <span className="text-on-surface-variant">Target Practitioner:</span>
                <span className="font-bold text-on-surface">{dentist.name} (KMPDC {dentist.license})</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                <span className="text-on-surface-variant">Position Type:</span>
                <span className="font-bold uppercase text-secondary">{positionType}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/40 pb-2">
                <span className="text-on-surface-variant">Offer Compensation:</span>
                <span className="font-bold text-primary">KES {Number(salary).toLocaleString()} {positionType === 'locum' ? '/ day' : '/ month'}</span>
              </div>
              {enableEscrow && (
                <div className="flex justify-between pt-1 text-xs text-secondary font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    M-Pesa Escrow Status:
                  </span>
                  <span>KES {Number(salary).toLocaleString()} Held Securely</span>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-95 shadow-md active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                <span>Send WhatsApp Instant Alert to Doctor</span>
              </a>
              <button 
                onClick={() => navigate('/profile/clinic')}
                className="w-full py-3 border border-outline-variant hover:bg-surface-container-high text-on-surface font-semibold rounded-xl transition-colors text-sm"
              >
                View in Clinic Sent Offers
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <button 
                onClick={() => navigate('/browse')} 
                className="w-9 h-9 border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container-high transition-colors"
                title="Go back"
              >
                 <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <div>
                <h1 className="font-headline-lg text-2xl text-primary font-bold">Draft Offer for {dentist.name}</h1>
                <p className="text-xs text-on-surface-variant">KMPDC Verified Specialist • {dentist.specialty}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <form className="lg:col-span-8 space-y-6" onSubmit={handleSubmit}>
                {/* 1. Job Fundamentals */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-xs">
                  <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-secondary text-xl">assignment</span>
                    1. Position & Compensation
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant block mb-2">Position Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button"
                          onClick={() => {
                            setPositionType('locum');
                            setSalary('15000');
                          }}
                          className={`p-3.5 border-2 rounded-xl transition-all font-bold text-sm flex flex-col items-center gap-1 ${
                            positionType === 'locum' 
                              ? 'border-primary bg-primary-container/20 text-primary shadow-xs' 
                              : 'border-outline-variant/60 hover:bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">event_available</span>
                          <span>Locum (Per Day)</span>
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            setPositionType('permanent');
                            setSalary('220000');
                          }}
                          className={`p-3.5 border-2 rounded-xl transition-all font-bold text-sm flex flex-col items-center gap-1 ${
                            positionType === 'permanent' 
                              ? 'border-primary bg-primary-container/20 text-primary shadow-xs' 
                              : 'border-outline-variant/60 hover:bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">badge</span>
                          <span>Permanent (Monthly)</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                        {positionType === 'permanent' ? 'Proposed Monthly Salary (KES)' : 'Daily Locum Rate (KES)'}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">KES</span>
                        <input 
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className="w-full pl-16 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-bold text-xl text-on-surface" 
                          placeholder="15,000" 
                          type="number"
                          required
                          min="1000"
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-secondary">insights</span>
                        Market benchmark for {dentist.specialty} in Nairobi is ~KES 15,000 – 18,000/day.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Schedule */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-xs">
                  <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-secondary text-xl">calendar_month</span>
                    2. Shift Schedule / Working Days
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map(day => (
                      <button 
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                          selectedDays.includes(day)
                            ? 'border-primary bg-primary text-on-primary shadow-xs'
                            : 'border-outline-variant/80 hover:bg-surface-container text-on-surface'
                        }`}
                        type="button"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Clinical Equipment */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-xs">
                  <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-secondary text-xl">biotech</span>
                    3. Equipment Available at Clinic
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EQUIPMENT_LIST.map((item) => (
                      <button 
                        key={item}
                        type="button"
                        onClick={() => handleEquipmentToggle(item)}
                        className={`flex items-center gap-2.5 p-3 border rounded-xl transition-all text-left text-xs font-medium ${
                          equipment.includes(item)
                            ? 'bg-secondary-container/40 text-on-secondary-container border-secondary font-bold'
                            : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/60'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base text-secondary">
                          {equipment.includes(item) ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Location & Clinic Notes */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-xs space-y-4">
                  <h2 className="text-base font-bold flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-secondary text-xl">location_on</span>
                    4. Practice Location & Clinical Notes
                  </h2>
                  <div>
                    <label className="text-xs font-semibold text-on-surface-variant block mb-1">Clinic Branch Address</label>
                    <input 
                      className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm text-on-surface" 
                      type="text" 
                      value={clinicLocation}
                      onChange={(e) => setClinicLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-on-surface-variant block mb-1">Special Notes / Case Mix Requirements</label>
                    <textarea 
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                      placeholder="e.g., We have 4 fixed appliance reviews and 2 impactions scheduled."
                      className="w-full p-3 bg-surface-container-low border border-outline-variant rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm text-on-surface"
                    />
                  </div>
                </div>

                {/* 5. Safaricom M-Pesa Escrow Option */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border-2 border-secondary/40 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-2xl">account_balance_wallet</span>
                      <div>
                        <h3 className="font-bold text-sm text-on-surface">Safaricom Lipa Na M-Pesa Escrow Guarantee</h3>
                        <p className="text-xs text-on-surface-variant">Holds locum fee in escrow to guarantee 100% practitioner turnout.</p>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={enableEscrow}
                      onChange={(e) => setEnableEscrow(e.target.checked)}
                      className="w-5 h-5 accent-secondary cursor-pointer"
                    />
                  </div>

                  {enableEscrow && (
                    <div className="pt-2 border-t border-outline-variant/40 space-y-2">
                      <label className="text-xs font-semibold text-on-surface-variant block">M-Pesa Phone Number for STK Push</label>
                      <input 
                        className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary outline-none text-sm"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        placeholder="0712345678"
                      />
                      <p className="text-[11px] text-secondary">
                        An STK Push prompt will be dispatched to your phone upon sending this offer. Funds are only released after clinical shift completion.
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-on-primary hover:bg-primary/90 transition-all py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 disabled:opacity-50 text-base" 
                    type="submit"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                        <span>{stkStatus === 'prompted' ? 'Awaiting M-Pesa PIN Verification...' : 'Submitting Offer...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Direct Offer</span>
                        <span className="material-symbols-outlined text-xl">send</span>
                      </>
                    )}
                  </button>
                  <p className="text-center mt-2.5 text-xs text-on-surface-variant">
                    Offers adhere to KMPDC ethical guidelines and standard Kenyan dental locum agreements.
                  </p>
                </div>
              </form>

              {/* Right Sidebar: Doctor Overview */}
              <aside className="lg:col-span-4 space-y-5">
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-xs">
                  <h3 className="font-bold text-sm text-primary mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">person</span>
                    Practitioner Summary
                  </h3>
                  <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-surface-container-low border border-outline-variant/60">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold text-base shrink-0">
                      {dentist.avatarInitials || "DR"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-on-surface truncate">{dentist.name}</p>
                      <p className="text-xs text-secondary font-bold uppercase truncate">{dentist.specialty}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">verified</span>
                      <span>KMPDC License: <strong>{dentist.license}</strong></span>
                    </li>
                    <li className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">school</span>
                      <span className="truncate">{dentist.education.degree}</span>
                    </li>
                    <li className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">star</span>
                      <span>Rating: <strong>{dentist.rating} / 5.0</strong></span>
                    </li>
                    <li className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-base">payments</span>
                      <span>Rate Expectations: <strong>{dentist.expectedSalary}</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-secondary-container/30 p-5 rounded-2xl border border-secondary/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                    <span>Direct WhatsApp & SMS Integration</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Once submitted, the doctor receives an instant notification on their registered Kenyan line (+254) with a direct link to accept or counter.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
