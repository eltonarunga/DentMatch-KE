import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Landing() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      <header className="bg-surface shadow-sm sticky top-0 w-full z-50 flex justify-between items-center px-margin-mobile py-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-headline-sm">medical_services</span>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden active:scale-95 transition-transform duration-200 flex items-center"
          >
            <span className="material-symbols-outlined text-on-surface-variant">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/#how-it-works" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors px-2 py-1 rounded">How it Works</Link>
            <Link to="/login?role=dentist" className="font-label-md text-label-md text-primary font-bold hover:underline">Dentist Login</Link>
            <Link to="/login?role=clinic" className="bg-primary text-on-primary font-label-md px-4 py-2 rounded-lg hover:shadow-md transition-shadow">Clinic Login</Link>
          </div>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-surface border-b border-outline-variant shadow-lg z-40 px-margin-mobile py-4 flex flex-col gap-4">
          <Link to="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="font-label-md text-label-lg text-on-surface hover:text-primary py-2 border-b border-outline-variant/30">How it Works</Link>
          <Link to="/login?role=dentist" onClick={() => setIsMobileMenuOpen(false)} className="font-label-md text-label-lg text-on-surface hover:text-primary py-2 border-b border-outline-variant/30">Dentist Login</Link>
          <Link to="/login?role=clinic" onClick={() => setIsMobileMenuOpen(false)} className="font-label-md text-label-lg text-on-surface hover:text-primary py-2">Clinic Login</Link>
        </div>
      )}

      <main>
        <section className="hero-gradient px-margin-mobile pt-12 pb-20 md:flex md:items-center md:justify-between md:gap-12 md:px-24">
          <div className="md:max-w-xl">
            <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full mb-6">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-label-md text-label-md font-semibold">KMPDC Verified Platform</span>
            </div>
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-primary mb-6 leading-tight text-balance">The First Reverse Recruitment Platform for Kenya's Dental Talent.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed text-pretty">
              <span className="font-bold text-on-surface mr-1">Stop searching for jobs.</span> Let the best dental clinics in Kenya apply to hire you based on your verified credentials and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login?role=dentist" className="bg-primary text-on-primary font-headline-sm px-8 py-4 rounded-lg shadow-sm active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">person</span> I'm a Dentist
              </Link>
              <Link to="/login?role=clinic" className="bg-surface-container text-primary font-headline-sm px-8 py-4 rounded-lg border border-outline-variant hover:bg-surface-container-high active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">apartment</span> I'm a Clinic
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute -z-10 w-64 h-64 bg-secondary-fixed-dim rounded-full blur-3xl opacity-20 -top-10 -right-10"></div>
          </div>
        </section>

        <section className="bg-surface-container-low py-8 overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="font-label-md text-label-md text-outline uppercase tracking-widest">Trusted by Professionals</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
              <span className="font-headline-md font-bold text-primary">KMPDC Verified</span>
              <span className="font-headline-md font-bold text-primary">KDA</span>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-margin-mobile py-20 bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant">
              <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white">apartment</span>
              </div>
              <h3 className="font-display-lg text-primary">100+</h3>
              <p className="font-body-md text-on-surface-variant">Top-Tier Dental Clinics actively hiring through our platform.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-on-secondary-container">groups</span>
              </div>
              <h3 className="font-display-lg text-secondary">500+</h3>
              <p className="font-body-md text-on-surface-variant">Verified Dentists and Technicians with live professional profiles.</p>
            </div>
            <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-lg md:row-span-1 flex flex-col justify-between">
              <div>
                <h3 className="font-headline-lg mb-4">Fast-Track Your Career</h3>
                <p className="font-body-md opacity-90 mb-6">Our algorithm matches your specific specialization to clinics that actually value your skills.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-md">Average time to interview:</span>
                <span className="font-label-md font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded">48 Hours</span>
              </div>
            </div>
          </div>
        </section>

        <section id="for-dentists" className="px-margin-mobile py-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1 px-4 h-12 bg-primary rounded-full"></div>
                <h2 className="font-headline-lg text-primary leading-tight">For Dental Practitioners</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary shrink-0">check_circle</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Verified Roles Only</h4>
                    <p className="font-body-md text-on-surface-variant">No phantom listings. Every clinic is vetted for KMPDC compliance before posting.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary shrink-0">payments</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Salary Transparency</h4>
                    <p className="font-body-md text-on-surface-variant">See remuneration packages upfront. No more "negotiable" guesswork during interviews.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-secondary shrink-0">history_edu</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Expertise-Led Profile</h4>
                    <p className="font-body-md text-on-surface-variant">Highlight your specialty certifications in Orthodontics, Surgery, or Pediatric care.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div id="for-clinics" className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1 px-4 h-12 bg-secondary rounded-full"></div>
                <h2 className="font-headline-lg text-secondary leading-tight">For Dental Clinics</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary shrink-0">person_search</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Access Vetted Talent</h4>
                    <p className="font-body-md text-on-surface-variant">Skip the manual screening. Access a pool of pre-verified practitioners with proven records.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary shrink-0">speed</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Efficient Hiring</h4>
                    <p className="font-body-md text-on-surface-variant">Reduce time-to-hire by 70% with direct outreach to candidates who fit your criteria.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary shrink-0">shield</span>
                  <div>
                    <h4 className="font-headline-sm text-on-surface">Credential Verification</h4>
                    <p className="font-body-md text-on-surface-variant">We verify dental council registration and indemnity status for every applicant.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="success-stories" className="bg-surface-container-low px-margin-mobile py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-headline-lg text-primary mb-4">Sample Practitioner Profile</h2>
            <p className="font-body-lg text-on-surface-variant">This is how clinics see your profile—clean, professional, and credential-focused.</p>
          </div>
          <div className="max-w-md mx-auto bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant p-8 relative overflow-hidden group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Available</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 mt-2">
              <div>
                <h3 className="font-headline-md text-on-surface mb-1">Dr. Amara Kamau</h3>
                <p className="font-label-md text-secondary font-bold uppercase tracking-wider mb-2">Orthodontics Specialist</p>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-md">
                  <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-body-md font-medium text-on-surface">4.9</span> (12 Recommendations)
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="font-label-md text-on-surface-variant uppercase mb-1">Experience</p>
                <p className="font-headline-sm text-on-surface">8 Years</p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <p className="font-label-md text-on-surface-variant uppercase mb-1">KMPDC License</p>
                <div className="flex items-center gap-1 font-body-md font-semibold text-secondary">
                  <span className="material-symbols-outlined text-[18px]">verified</span> <span className="font-headline-sm">Active</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-label-md text-on-surface-variant uppercase mb-3">Core Competencies</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-label-md">Invisalign® Certified</span>
                <span className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-label-md">Oral Surgery</span>
                <span className="bg-primary/5 text-primary border border-primary/20 px-4 py-2 rounded-lg font-label-md">Implantology</span>
              </div>
            </div>

            <button className="w-full bg-primary text-on-primary font-headline-sm py-4 rounded-xl active:scale-95 transition-transform shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">forum</span> Request to Interview
            </button>
          </div>
        </section>

        <section className="bg-primary text-on-primary py-24 text-center px-margin-mobile relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 gap-4 h-full">
              <div className="border-r border-on-primary"></div><div className="border-r border-on-primary"></div><div className="border-r border-on-primary"></div><div className="border-r border-on-primary"></div>
            </div>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display-lg-mobile md:text-display-lg mb-6 leading-tight text-white text-balance">Ready to find your perfect match?</h2>
            <p className="font-body-lg mb-10 text-white/90 leading-relaxed max-w-xl mx-auto text-pretty">Join the community of elite dental professionals and clinics across Kenya transforming how medical recruitment works.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/login?role=dentist" className="bg-secondary-fixed text-on-secondary-fixed font-headline-sm px-10 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">person</span> Create My Profile
              </Link>
              <Link to="/login?role=clinic" className="bg-transparent border-2 border-on-primary font-headline-sm px-10 py-4 rounded-lg hover:bg-on-primary/10 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">apartment</span> Register Clinic
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
