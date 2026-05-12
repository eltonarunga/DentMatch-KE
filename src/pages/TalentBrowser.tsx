import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SPECIALTIES = [
  "General Dentistry",
  "Orthodontics",
  "Oral & Maxillofacial Surgery",
  "Pediatric Dentistry",
  "Periodontics",
  "Prosthodontics",
  "Endodontics",
  "Restorative Dentistry",
  "Public Health Dentistry",
  "Oral Medicine & Pathology"
];
const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru"];

export default function TalentBrowser() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  
  const [selectedCv, setSelectedCv] = useState<any>(null);

  const specRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (specRef.current && !specRef.current.contains(event.target as Node)) {
        setIsSpecOpen(false);
      }
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setIsLocOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSpecialty = (spec: string) => {
    setSelectedSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);
  };

  const clearAllFilters = () => {
    setSelectedSpecialties([]);
    setSelectedLocations([]);
  };

  const hasActiveFilters = selectedSpecialties.length > 0 || selectedLocations.length > 0;

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      <header className="bg-surface shadow-sm flex justify-between items-center w-full px-margin-mobile py-2 z-50 fixed top-0">
        <Link to="/browse" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">medical_services</span>
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">DentMatch KE</h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/browse" className="font-label-md text-label-md text-primary font-bold transition-colors">Browse</Link>
            <Link to="/profile/clinic" className="font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high px-3 py-1 rounded-full transition-colors">Profile</Link>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline-variant">
          </div>
        </div>
      </header>

      <main className="pt-20 px-margin-mobile max-w-7xl mx-auto">
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Talent Browser</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Access Kenya's premier network of verified dental professionals.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                1,240 Verified Doctors
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary text-body-md" placeholder="Search by ID or Specialty..." type="text"/>
              </div>
              <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap gap-2 z-10">
                {/* Specialty Dropdown */}
                <div className="relative" ref={specRef}>
                  <button 
                    onClick={() => setIsSpecOpen(!isSpecOpen)}
                    className="bg-surface-container-low hover:bg-surface-container border-none rounded-lg px-4 py-3 text-body-md focus:ring-2 focus:ring-primary flex items-center gap-2 justify-between min-w-[200px]"
                  >
                    <span>Specialties {selectedSpecialties.length > 0 && `(${selectedSpecialties.length})`}</span>
                    <span className="material-symbols-outlined text-[20px]">{isSpecOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {isSpecOpen && (
                    <div className="absolute top-full mt-1 left-0 w-full bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-2 flex flex-col max-h-60 overflow-y-auto w-[250px]">
                      {SPECIALTIES.map(spec => (
                        <label key={spec} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedSpecialties.includes(spec)}
                            onChange={() => toggleSpecialty(spec)}
                            className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                          />
                          <span className="font-body-md">{spec}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="relative" ref={locRef}>
                  <button 
                    onClick={() => setIsLocOpen(!isLocOpen)}
                    className="bg-surface-container-low hover:bg-surface-container border-none rounded-lg px-4 py-3 text-body-md focus:ring-2 focus:ring-primary flex items-center gap-2 justify-between min-w-[160px]"
                  >
                    <span>Locations {selectedLocations.length > 0 && `(${selectedLocations.length})`}</span>
                    <span className="material-symbols-outlined text-[20px]">{isLocOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {isLocOpen && (
                    <div className="absolute top-full mt-1 left-0 w-full bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-2 flex flex-col max-h-60 overflow-y-auto w-[200px]">
                      {LOCATIONS.map(loc => (
                        <label key={loc} className="flex items-center gap-3 px-4 py-2 hover:bg-surface-container-low cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedLocations.includes(loc)}
                            onChange={() => toggleLocation(loc)}
                            className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                          />
                          <span className="font-body-md">{loc}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-surface-variant/30">
                <span className="text-body-sm text-on-surface-variant font-bold uppercase tracking-wider mr-1">Active Filters:</span>
                
                {selectedSpecialties.map(spec => (
                  <span key={spec} className="inline-flex items-center gap-1 bg-primary-container text-on-primary-container font-label-md px-3 py-1 rounded-full border border-primary/20">
                    {spec}
                    <button onClick={() => toggleSpecialty(spec)} className="flex items-center justify-center hover:bg-primary/20 rounded-full w-4 h-4 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}

                {selectedLocations.map(loc => (
                  <span key={loc} className="inline-flex items-center gap-1 bg-tertiary-container text-on-tertiary-container font-label-md px-3 py-1 rounded-full border border-tertiary/20">
                    {loc}
                    <button onClick={() => toggleLocation(loc)} className="flex items-center justify-center hover:bg-tertiary/20 rounded-full w-4 h-4 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}

                <button 
                  onClick={clearAllFilters}
                  className="ml-auto text-label-md font-bold text-error flex items-center gap-1 hover:underline px-2 py-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">Locum</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-outline text-3xl">account_circle</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Dentist #842</h3>
                  <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <p className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wide">Orthodontics Specialist</p>
                <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-md">
                  <span className="material-symbols-outlined text-sm">location_on</span> Nairobi, KE
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-surface-container-low rounded-lg">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Experience</span>
                <span className="font-body-md text-on-surface">8 Years</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Expected Salary</span>
                <span className="font-body-md text-on-surface">KSh 180k+</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-2">Proficient Equipment</p>
              <div className="flex flex-wrap gap-1">
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">CBCT Scanner</span>
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Itero Element</span>
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Laser Biolase</span>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <Link to="/send-offer" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-sm">mail</span> Send Offer
              </Link>
              <button 
                onClick={() => setSelectedCv({
                  name: "Dentist #842",
                  specialty: "Orthodontics Specialist",
                  location: "Nairobi, KE",
                  experience: "8 Years",
                  license: "A4930",
                  education: { degree: "Master of Dental Surgery (MDS) in Orthodontics", school: "University of Nairobi", year: "2018" },
                  history: [
                    { role: "Senior Orthodontist", clinic: "Nairobi Dental Hospital", duration: "2020 - Present" },
                    { role: "Resident Dentist", clinic: "Kenyatta National Hospital", duration: "2018 - 2020" }
                  ],
                  equipment: ["CBCT Scanner", "Itero Element", "Laser Biolase"]
                })}
                className="w-full border border-primary text-primary py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors active:scale-95"
              >
                View Full CV
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
              <span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">Permanent</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-outline text-3xl">account_circle</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Dentist #402</h3>
                  <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <p className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wide">General Practitioner</p>
                <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-md">
                  <span className="material-symbols-outlined text-sm">location_on</span> Mombasa, KE
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-surface-container-low rounded-lg">
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Experience</span>
                <span className="font-body-md text-on-surface">4 Years</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">Expected Salary</span>
                <span className="font-body-md text-on-surface">KSh 120k+</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold mb-2">Proficient Equipment</p>
              <div className="flex flex-wrap gap-1">
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Digital X-Ray</span>
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Autoclave Pro</span>
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant">Apex Locator</span>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <Link to="/send-offer" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-sm">send</span> Send Offer
              </Link>
              <button 
                onClick={() => setSelectedCv({
                  name: "Dentist #402",
                  specialty: "General Practitioner",
                  location: "Mombasa, KE",
                  experience: "4 Years",
                  license: "B8304",
                  education: { degree: "Bachelor of Dental Surgery (BDS)", school: "Moi University", year: "2022" },
                  history: [
                    { role: "Dental Officer", clinic: "Coast General Hospital", duration: "2023 - Present" },
                    { role: "Intern Dentist", clinic: "Mombasa Dental Center", duration: "2022 - 2023" }
                  ],
                  equipment: ["Digital X-Ray", "Autoclave Pro", "Apex Locator"]
                })}
                className="w-full border border-primary text-primary py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors active:scale-95"
              >
                View Full CV
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm flex flex-col">
            <div className="p-6">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Regional Availability</h3>
              <p className="text-body-md text-on-surface-variant">Real-time heat map of dental professionals currently available for locum work across Kenya.</p>
            </div>
            <div className="h-64 md:h-full min-h-[300px] bg-surface-container-high relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-surface-container-lowest px-4 py-2 rounded-full border border-outline shadow-lg flex items-center gap-2 font-label-md">
                  <span className="material-symbols-outlined text-primary">map</span> Interactive Region Browser
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-primary-container text-on-primary p-6 rounded-2xl shadow-sm relative overflow-hidden h-full">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl mb-4">bolt</span>
                <h3 className="font-headline-sm text-headline-sm mb-2">Priority Recruitment</h3>
                <p className="text-body-md opacity-90 mb-6">Need a dentist urgently? Get matched with top-rated talent in under 24 hours with our premium sourcing engine.</p>
                <button className="bg-on-primary-container text-primary px-6 py-3 rounded-lg font-bold text-label-md active:scale-95 transition-transform">Start Sourcing</button>
              </div>
            </div>
            <div className="bg-secondary-container text-on-secondary-container p-6 rounded-2xl shadow-sm border border-outline-variant">
              <h4 className="font-label-md text-label-md font-bold uppercase mb-4">Talent Insights</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="text-body-md">Oral Surgeons in high demand</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-body-md">Avg. response time: 2.4 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {selectedCv && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h2 className="font-headline-sm font-bold text-primary">Full Curriculum Vitae</h2>
              <button onClick={() => setSelectedCv(null)} className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant shrink-0">
                  <span className="material-symbols-outlined text-outline text-4xl">account_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface flex items-center gap-2">
                    {selectedCv.name}
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </h3>
                  <p className="font-label-lg text-secondary font-bold uppercase tracking-wide mb-1">{selectedCv.specialty}</p>
                  <p className="text-body-md text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> {selectedCv.location}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">Experience</p>
                  <p className="font-headline-sm text-on-surface">{selectedCv.experience}</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-wider">KMPDC License</p>
                  <p className="font-headline-sm text-on-surface">{selectedCv.license}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-label-lg font-bold mb-3 flex items-center gap-2 border-b border-outline-variant pb-2">
                  <span className="material-symbols-outlined text-primary">school</span> Education
                </h4>
                <ul className="space-y-3">
                  <li>
                    <p className="font-bold text-on-surface">{selectedCv.education.degree}</p>
                    <p className="text-body-md text-on-surface-variant">{selectedCv.education.school} • {selectedCv.education.year}</p>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-label-lg font-bold mb-3 flex items-center gap-2 border-b border-outline-variant pb-2">
                  <span className="material-symbols-outlined text-primary">work</span> Work History
                </h4>
                <ul className="space-y-4">
                  {selectedCv.history.map((job: any, idx: number) => (
                    <li key={idx}>
                      <p className="font-bold text-on-surface">{job.role}</p>
                      <p className="text-body-md text-on-surface-variant">{job.clinic} • {job.duration}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-label-lg font-bold mb-3 flex items-center gap-2 border-b border-outline-variant pb-2">
                  <span className="material-symbols-outlined text-primary">build</span> Equipment Proficiency
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCv.equipment.map((eq: string) => (
                    <span key={eq} className="bg-surface-container text-on-surface px-3 py-1.5 rounded-lg text-label-md border border-outline-variant">{eq}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex gap-4">
              <button onClick={() => setSelectedCv(null)} className="flex-1 py-3 text-on-surface-variant font-bold border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors">Close</button>
              <Link to="/send-offer" className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-md transition-shadow active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px]">send</span> Send Offer
              </Link>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 pb-safe bg-surface shadow-sm md:hidden border-t border-outline-variant">
        <Link to="/browse" className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform duration-200 active:scale-95">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
          <span className="font-label-md text-label-md">Browse</span>
        </Link>
        <Link to="/profile/clinic" className="flex flex-col items-center justify-center text-on-surface-variant transition-transform duration-200 active:scale-95">
          <span className="material-symbols-outlined">domain</span>
          <span className="font-label-md text-label-md">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
