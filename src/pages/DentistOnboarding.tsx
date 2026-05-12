import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DentistOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [yearsOfPractice, setYearsOfPractice] = useState(5);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 3;

  const handleFileUpload = async (file: File) => {
    // Basic validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    
    // Simulate upload delay and future database integration
    setIsUploading(true);
    try {
      // Future integration: 
      // const formData = new FormData();
      // formData.append('document', file);
      // await supabase.storage.from('credentials').upload(`kmpdc/${file.name}`, file);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadedFile(file);
    } catch (error) {
      console.error("Failed to upload document", error);
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

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else navigate('/dashboard');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-20 md:pb-0">
      <header className="bg-surface shadow-sm fixed w-full top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile py-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">medical_services</span>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
              <span className="font-label-md text-label-md text-primary font-bold cursor-pointer">Onboarding</span>
              <span className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high px-2 py-1 rounded transition-colors cursor-pointer">Help</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden active:scale-95 transition-transform duration-200">
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-margin-mobile max-w-2xl mx-auto flex flex-col min-h-screen">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-md text-label-md text-primary font-bold">
              Step {step}: {step === 1 ? 'Professional Details' : step === 2 ? 'Documents & Preferences' : 'Profile Preview'}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant">{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="space-y-6 flex-grow">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <section className="mb-6">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Build Your Professional Profile</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Help Kenyan clinics find you by providing your dental credentials and preferences.</p>
              </section>

              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant mb-6">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2 block">Primary Specialty</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 text-body-md focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
                    <option value="">Select your primary specialty</option>
                    <option value="General Dentistry">General Dentistry</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="Oral & Maxillofacial Surgery">Oral & Maxillofacial Surgery</option>
                    <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                    <option value="Periodontics">Periodontics</option>
                    <option value="Prosthodontics">Prosthodontics</option>
                    <option value="Endodontics">Endodontics</option>
                    <option value="Restorative Dentistry">Restorative Dentistry</option>
                    <option value="Public Health Dentistry">Public Health Dentistry</option>
                    <option value="Oral Medicine & Pathology">Oral Medicine & Pathology</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Years of Practice</label>
                    <span className="font-headline-sm text-headline-sm text-primary">{yearsOfPractice}{yearsOfPractice === 40 ? '+' : ''} Years</span>
                  </div>
                  <input 
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
                    max="40" 
                    min="0" 
                    type="range" 
                    value={yearsOfPractice}
                    onChange={(e) => setYearsOfPractice(Number(e.target.value))}
                  />
                </div>
                <div className="pt-2">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1 block">KMPDC License Number</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">badge</span>
                      <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md" placeholder="e.g., A1234" type="text"/>
                    </div>
                    <button className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-md text-label-md font-bold active:scale-95 transition-transform flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">verified</span> Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <section className="mb-6">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Documents & Preferences</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Uploading your credentials makes clinical matches much faster.</p>
              </section>

              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant mb-6">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4 block">Required Documents</label>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                
                {!uploadedFile && !isUploading ? (
                  <div 
                    className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-[28px]">upload_file</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface font-semibold mb-1 text-center">Click or Drag to Upload KMPDC License / National ID</p>
                    <p className="font-label-md text-label-md text-on-surface-variant text-center">PDF, JPG or PNG (Max. 5MB)</p>
                  </div>
                ) : isUploading ? (
                  <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant flex flex-col items-center justify-center space-y-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-label-md text-on-surface">Uploading document, please wait...</p>
                  </div>
                ) : uploadedFile ? (
                  <div className="mt-4 flex items-center gap-4 p-2 bg-surface-container-low rounded-lg border border-outline-variant">
                    <span className="material-symbols-outlined text-secondary text-[24px]">check_circle</span>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-label-md text-label-md text-on-surface font-bold truncate">{uploadedFile.name}</p>
                      <p className="font-label-md text-label-md text-on-surface-variant">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded</p>
                    </div>
                    <button onClick={handleRemoveFile} className="text-error hover:bg-error/10 p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4 block">Salary Expectations (KES)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface">Locum (Per Day)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label-md text-on-surface-variant">KES</span>
                      <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary font-body-md text-body-md" type="number" defaultValue="15000"/>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-md text-label-md text-on-surface">Permanent (Per Month)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label-md text-on-surface-variant">KES</span>
                      <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary font-body-md text-body-md" type="number" defaultValue="250000"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <section className="mb-6">
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Almost Ready!</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Review your matching profile before opening it up to clinics.</p>
              </section>
              <div className="bg-primary overflow-hidden rounded-xl h-48 relative shadow-lg mb-6">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-headline-md text-headline-md text-white mb-1">Your profile is looking great</h3>
                  <p className="font-body-md text-body-md text-white/90">Your profile will be visible to top dental clinics across Kenya once verified.</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant flex items-center justify-between">
                <div>
                  <h4 className="font-headline-sm text-on-surface">Profile Visibility</h4>
                  <p className="text-body-md text-on-surface-variant max-w-sm">Allow verified clinics to view your profile and send you interview requests.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4 mt-auto">
            {step > 1 && (
              <button onClick={prevStep} className="flex-1 py-4 border border-outline text-on-surface font-headline-sm text-headline-sm rounded-xl active:scale-95 transition-transform bg-surface-container-lowest">
                Back
              </button>
            )}
            {step === 1 && (
              <button disabled className="flex-1 py-4 border border-outline text-outline font-headline-sm text-headline-sm rounded-xl cursor-not-allowed bg-surface-container-low opacity-50">
                Back
              </button>
            )}
            <button onClick={nextStep} className="flex-[2] py-4 bg-primary text-on-primary font-headline-sm text-headline-sm font-bold rounded-xl shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2">
              {step === totalSteps ? 'Complete Profile' : 'Continue'}
              {step !== totalSteps && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
