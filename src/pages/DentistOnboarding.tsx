import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataStore } from '../lib/dataStore';
import { ApiService, KMPDCVerificationResult } from '../lib/api';

export default function DentistOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [yearsOfPractice, setYearsOfPractice] = useState(8);
  const [specialty, setSpecialty] = useState("Orthodontics Specialist");
  const [license, setLicense] = useState("A4930");
  const [locumRate, setLocumRate] = useState("15000");
  const [permanentRate, setPermanentRate] = useState("280000");
  const [isVerifying, setIsVerifying] = useState(false);
  const [kmpdcResult, setKmpdcResult] = useState<KMPDCVerificationResult | null>(null);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 3;

  const handleVerifyLicense = async () => {
    if (!license.trim()) {
      setKmpdcResult({ verified: false, message: 'Please enter a valid KMPDC license number (e.g. A4930).' });
      return;
    }
    setIsVerifying(true);
    try {
      const res = await ApiService.verifyKmpdcLicense(license);
      setKmpdcResult(res);
      if (res.verified && res.data?.specialty) {
        setSpecialty(res.data.specialty);
      }
    } catch (err) {
      setKmpdcResult({ verified: false, message: 'KMPDC registry lookup failed.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUploadedFile(file);
    } catch (error) {
      alert("Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const nextStep = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const updates = {
        specialty,
        experience: `${yearsOfPractice} Years`,
        license: license.toUpperCase(),
        expectedSalary: `KSh ${(Number(locumRate) / 1000).toFixed(0)}k+ / day`,
        locumDailyRate: Number(locumRate),
        permanentMonthlyRate: Number(permanentRate),
        isVerified: true
      };

      // 1. Update API
      await ApiService.updateDentistProfile('dentist-842', updates);
      // 2. Update local DataStore
      DataStore.updateDentist('dentist-842', updates);
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-20 md:pb-0">
      <header className="bg-surface shadow-sm fixed w-full top-0 z-50 border-b border-outline-variant/40">
        <div className="flex justify-between items-center w-full px-4 md:px-8 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-[20px]">medical_services</span>
            </div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full">
              Dentist Onboarding
            </span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 max-w-2xl mx-auto flex flex-col min-h-screen">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="font-bold text-primary">
              Step {step}: {step === 1 ? 'KMPDC License & Specialty' : step === 2 ? 'Rate Expectations & Documents' : 'Profile Confirmation'}
            </span>
            <span className="text-on-surface-variant font-semibold">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="space-y-6 flex-grow">
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="font-headline-lg text-2xl text-on-surface font-bold mb-1">Verify Your Clinical Credentials</h2>
                <p className="text-xs text-on-surface-variant">
                  We verify your Kenya Medical Practitioners and Dentists Council (KMPDC) license to establish patient safety & trust.
                </p>
              </div>

              {/* KMPDC License Check Box */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant space-y-3">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                  KMPDC License Number (e.g. A4930, B8304, C5921)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">badge</span>
                    <input 
                      className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm font-bold text-on-surface outline-none uppercase" 
                      placeholder="A4930" 
                      type="text"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleVerifyLicense}
                    disabled={isVerifying}
                    className="bg-secondary text-on-secondary px-5 py-3 rounded-xl text-xs font-bold active:scale-95 transition-transform flex items-center gap-1.5 disabled:opacity-75"
                  >
                    <span className="material-symbols-outlined text-[18px]">{isVerifying ? 'sync' : 'verified'}</span> 
                    {isVerifying ? 'Querying...' : 'Verify KMPDC'}
                  </button>
                </div>

                {kmpdcResult && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
                    kmpdcResult.verified 
                      ? 'bg-secondary-container/40 border-secondary/40 text-on-secondary-container' 
                      : 'bg-error-container/40 border-error/40 text-error'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-base">
                        {kmpdcResult.verified ? 'check_circle' : 'error'}
                      </span>
                      <span>{kmpdcResult.message}</span>
                    </div>
                    {kmpdcResult.data && (
                      <div className="pt-1 text-[11px] text-on-surface-variant grid grid-cols-2 gap-1 border-t border-secondary/20 mt-1">
                        <span>Practitioner: <strong>{kmpdcResult.data.practitionerName}</strong></span>
                        <span>Status: <strong className="text-secondary">{kmpdcResult.data.status}</strong></span>
                        <span>Qualifications: <strong>{kmpdcResult.data.qualifications}</strong></span>
                        <span>County: <strong>{kmpdcResult.data.county}</strong></span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Primary Specialty */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 block">Primary Clinical Specialty</label>
                <div className="relative">
                  <select 
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-on-surface font-medium"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="Orthodontics Specialist">Orthodontics Specialist</option>
                    <option value="General Dentistry">General Dentistry</option>
                    <option value="Oral & Maxillofacial Surgery">Oral & Maxillofacial Surgery</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="Periodontics & Implantology">Periodontics & Implantology</option>
                    <option value="Prosthodontics">Prosthodontics</option>
                    <option value="Endodontics">Endodontics</option>
                    <option value="Restorative Dentistry">Restorative Dentistry</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Years of Active Clinical Practice</label>
                  <span className="text-base font-bold text-primary">{yearsOfPractice} Years</span>
                </div>
                <input 
                  className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
                  max="30" 
                  min="1" 
                  type="range" 
                  value={yearsOfPractice}
                  onChange={(e) => setYearsOfPractice(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="font-headline-lg text-2xl text-on-surface font-bold mb-1">Rate Expectations & Documents</h2>
                <p className="text-xs text-on-surface-variant">Set your daily locum rates and monthly contract preferences.</p>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3 block">Salary Expectations (KES)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface">Locum Shift (Per Day)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-primary">KES</span>
                      <input 
                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-on-surface" 
                        type="number" 
                        value={locumRate}
                        onChange={(e) => setLocumRate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-on-surface">Permanent Position (Per Month)</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-primary">KES</span>
                      <input 
                        className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary text-sm font-bold text-on-surface" 
                        type="number" 
                        value={permanentRate}
                        onChange={(e) => setPermanentRate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3 block">
                  KMPDC Retention Certificate / ID Card (Optional)
                </label>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                
                {!uploadedFile && !isUploading ? (
                  <div 
                    className="border-2 border-dashed border-outline-variant rounded-2xl p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-container/30 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform text-primary">
                      <span className="material-symbols-outlined text-[28px]">upload_file</span>
                    </div>
                    <p className="text-xs text-on-surface font-bold text-center">Click or Drag to Upload KMPDC Certificate</p>
                    <p className="text-[11px] text-on-surface-variant text-center mt-0.5">PDF, JPG or PNG (Max. 5MB)</p>
                  </div>
                ) : isUploading ? (
                  <div className="p-5 bg-surface-container-low rounded-xl border border-outline-variant flex items-center justify-center gap-2 text-xs">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading document...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-secondary-container/30 rounded-xl border border-secondary/30 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-secondary">check_circle</span>
                      <span className="font-bold truncate text-on-surface">{uploadedFile.name}</span>
                    </div>
                    <button onClick={handleRemoveFile} className="text-error hover:bg-error/10 p-1.5 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h2 className="font-headline-lg text-2xl text-on-surface font-bold mb-1">Profile Summary & Activation</h2>
                <p className="text-xs text-on-surface-variant">Review your matching profile details before entering the active talent pool.</p>
              </div>

              <div className="bg-primary text-on-primary rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">KMPDC Ready Profile</span>
                  </div>
                  <h3 className="text-xl font-bold">Dr. David Omondi</h3>
                  <p className="text-xs opacity-90">{specialty} • {yearsOfPractice} Years Experience</p>
                  <p className="text-xs font-bold pt-1 text-secondary">Locum Rate: KES {Number(locumRate).toLocaleString()} / day</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Active Locum Availability</h4>
                  <p className="text-xs text-on-surface-variant">Allow verified Kenyan dental clinics to send you reverse-recruitment offers.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 mt-auto">
            {step > 1 && (
              <button 
                onClick={prevStep} 
                className="flex-1 py-3.5 border border-outline-variant text-on-surface font-bold text-sm rounded-xl active:scale-95 transition-transform bg-surface-container-lowest"
              >
                Back
              </button>
            )}
            <button 
              onClick={nextStep} 
              className="flex-[2] py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-1.5"
            >
              <span>{step === totalSteps ? 'Complete & Go to Dashboard' : 'Continue'}</span>
              {step !== totalSteps && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
