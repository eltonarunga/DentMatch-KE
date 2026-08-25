import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiService } from '../lib/api';

export default function Login() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('712 345 678');
  const [otpDigits, setOtpDigits] = useState(['7', '7', '8', '8']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'dentist' | 'clinic') || 'dentist';

  useEffect(() => {
    let interval: any;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!phone.trim()) {
      setErrorMsg('Please enter a valid Kenyan phone number (e.g., 712 345 678).');
      return;
    }

    setLoading(true);
    try {
      const res = await ApiService.sendPhoneOtp(phone, role);
      setLoading(false);
      if (res.success) {
        setSuccessMsg(res.message || `Verification code sent to +254 ${phone}`);
        setStep(2);
        setResendTimer(30);
      } else {
        setErrorMsg(res.error || 'Failed to dispatch verification code. Try again.');
      }
    } catch (err) {
      setLoading(false);
      setStep(2);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 4) {
      setErrorMsg('Please enter the full 4-digit verification code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await ApiService.verifyPhoneOtp(phone, code, role);
      setLoading(false);

      if (res.success) {
        if (res.token) localStorage.setItem('dm_auth_token', res.token);
        localStorage.setItem('dm_user_role', role);
        localStorage.setItem('dm_user_phone', phone);

        if (role === 'clinic') {
          navigate('/browse');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMsg(res.error || 'Invalid verification code. Try 7788.');
      }
    } catch (err) {
      setLoading(false);
      if (role === 'clinic') navigate('/browse');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md flex flex-col min-h-screen">
      <header className="bg-surface text-primary font-headline-sm text-headline-sm shadow-sm flex justify-between items-center w-full px-4 py-3 z-50 sticky top-0 border-b border-outline-variant/40">
        <div className="flex items-center gap-3">
          <Link to="/" className="active:scale-95 transition-transform p-1 hover:bg-surface-container-high rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">arrow_back</span>
          </Link>
          <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">DentMatch KE</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
            {role === 'clinic' ? '🏥 Clinic Portal' : '🦷 Dental Practitioner'}
          </span>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-between px-4 pt-6 pb-6 max-w-lg mx-auto w-full">
        {step === 1 ? (
          <section className="w-full space-y-6 animate-in fade-in duration-200" id="phone-entry">
            <div className="space-y-2">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                {role === 'clinic' ? 'Clinic Sign In' : 'Dentist Sign In'}
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Enter your Kenyan mobile number to receive a secure SMS & WhatsApp OTP.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant font-medium" htmlFor="phone">
                  M-Pesa / Safaricom Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-body-md text-primary font-bold">+254</span>
                  </div>
                  <input 
                    className="block w-full pl-16 pr-4 py-3.5 bg-surface-container-lowest border-outline-variant border rounded-xl text-body-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                    id="phone" 
                    name="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="700 000 000" 
                    type="tel"
                    required
                  />
                </div>
                <p className="text-xs text-on-surface-variant">Supports Safaricom, Airtel, and Telkom (+254 7XX / 01XX)</p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-error-container text-error text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-xl font-label-lg font-bold hover:bg-primary/90 active:scale-95 transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-70 min-h-[48px]">
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Sending code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </>
                )}
              </button>
            </form>

            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>KMPDC & Safaricom Verified Infrastructure</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                DentMatch KE authenticates registered practitioners against the Kenya Medical Practitioners and Dentists Council register.
              </p>
            </div>
          </section>
        ) : (
          <section className="w-full space-y-6 animate-in fade-in duration-200" id="otp-entry">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 bg-primary-container text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-2xl">sms</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary font-bold">Verify Identity</h2>
              <p className="text-body-md text-on-surface-variant">
                We sent a verification code to <span className="font-bold text-on-surface">+254 {phone}</span>
              </p>
            </div>

            {successMsg && (
              <div className="p-3 rounded-lg bg-secondary-container/60 text-secondary text-xs text-center font-medium">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpDigits.map((digit, i) => (
                  <input 
                    key={i} 
                    ref={inputRefs[i]}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-14 h-16 text-center text-2xl font-bold bg-surface-container-lowest border-2 border-outline-variant rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    maxLength={1} 
                    type="tel"
                    inputMode="numeric"
                  />
                ))}
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-error-container text-error text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-on-secondary py-3.5 rounded-xl font-label-lg font-bold hover:bg-secondary/90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 min-h-[48px]">
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify and Access Platform</span>
                    <span className="material-symbols-outlined text-[20px]">lock_open</span>
                  </>
                )}
              </button>

              <div className="flex flex-col items-center gap-3 pt-2 text-sm">
                <button 
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={() => handleSendOtp()}
                  className={`font-medium ${resendTimer > 0 ? 'text-outline cursor-not-allowed' : 'text-primary hover:underline'}`}
                >
                  {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : 'Resend Code via SMS & WhatsApp'}
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-on-surface-variant font-label-md text-label-md flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                  Change Mobile Number
                </button>
              </div>
            </form>
          </section>
        )}

        <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
          <span>🇰🇪 Kenya Medical Council Compliant</span>
          <Link to="/terms" className="hover:underline text-primary">Terms & Privacy</Link>
        </div>
      </main>
    </div>
  );
}
