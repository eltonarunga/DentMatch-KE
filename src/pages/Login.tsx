import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Login() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'dentist';

  const handleVerify = () => {
    if (role === 'clinic') {
      navigate('/browse');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md flex flex-col min-h-screen">
      <header className="bg-surface text-primary font-headline-sm text-headline-sm shadow-sm flex justify-between items-center w-full px-margin-mobile py-2 z-50 sticky top-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="active:scale-95 transition-transform duration-200 p-1 hover:bg-surface-container-high rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <span className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</span>
        </div>
        <div className="flex items-center">
          <span className="material-symbols-outlined text-primary">medical_services</span>
        </div>
      </header>

      <main className="flex-grow flex flex-col auth-bg-gradient px-margin-mobile pt-8 pb-6">
        {step === 1 ? (
          <section className="max-w-md mx-auto w-full space-y-8" id="phone-entry">
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight text-balance">Welcome Back</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant text-pretty">Enter your mobile number to receive a secure login code.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="phone">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="font-body-lg text-body-lg text-primary font-bold">+254</span>
                  </div>
                  <input className="block w-full pl-20 pr-4 py-4 bg-surface-container-lowest border-outline-variant border rounded-xl text-body-lg font-body-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none" id="phone" name="phone" placeholder="700 000 000" type="tel"/>
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-primary text-on-primary py-4 px-6 rounded-xl font-headline-sm text-headline-sm hover:bg-primary-container active:scale-95 transition-all duration-200 shadow-sm flex justify-center items-center gap-2">
                Send Verification Code
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-1 pt-8 opacity-60">
              <span className="material-symbols-outlined text-label-md">verified_user</span>
              <span className="font-label-md text-label-md">Secure login via Africa's Talking</span>
            </div>
          </section>
        ) : (
          <section className="max-w-md mx-auto w-full mt-8 space-y-8" id="otp-entry">
            <div className="space-y-2 text-center">
              <h2 className="font-headline-md text-headline-md text-primary">Verify Identity</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We sent a 6-digit code to <span className="font-bold text-on-surface">+254 700 000 000</span>
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} className="w-12 h-14 text-center text-headline-md font-bold bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" maxLength={1} type="text"/>
                ))}
              </div>
              <button 
                onClick={handleVerify}
                className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-headline-sm text-headline-sm hover:bg-on-secondary-fixed-variant active:scale-95 transition-all duration-200">
                Verify and Continue
              </button>
              <div className="flex flex-col items-center gap-4 pt-4">
                <button className="text-primary font-label-md text-label-md hover:underline decoration-2 underline-offset-4">Resend Code</button>
                <button 
                  onClick={() => setStep(1)}
                  className="text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Change Number
                </button>
              </div>
            </div>
          </section>
        )}
        
        <div className="mt-auto pt-8">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-6xl opacity-50">dentistry</span>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-on-primary font-label-md text-label-md italic">"Connecting Kenya's finest dental talent with top-tier clinics."</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
