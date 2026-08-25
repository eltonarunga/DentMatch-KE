import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dentist } from '../lib/dataStore';
import { ApiService } from '../lib/api';

const SPECIALTIES = [
  "General Dentistry",
  "Orthodontics Specialist",
  "Oral & Maxillofacial Surgery",
  "Pediatric Dentistry",
  "Periodontics & Implantology",
  "Prosthodontics",
  "Endodontics"
];
const LOCATIONS = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];

export default function TalentBrowser() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  
  const [selectedCv, setSelectedCv] = useState<Dentist | null>(null);

  const specRef = useRef<HTMLDivElement>(null);
  const locRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [dentistList, analyticsData] = await Promise.all([
          ApiService.getDentists(),
          ApiService.getMarketAnalytics()
        ]);
        setDentists(dentistList);
        if (analyticsData) setAnalytics(analyticsData);
      } catch (err) {
        console.error("Error loading talent browser data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredDentists = dentists.filter(dentist => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" || 
      dentist.name.toLowerCase().includes(query) ||
      dentist.specialty.toLowerCase().includes(query) ||
      dentist.location.toLowerCase().includes(query) ||
      dentist.license.toLowerCase().includes(query) ||
      dentist.equipment.some(eq => eq.toLowerCase().includes(query));

    const matchesSpecialty = selectedSpecialties.length === 0 || 
      selectedSpecialties.some(spec => dentist.specialty.toLowerCase().includes(spec.toLowerCase()));

    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.some(loc => dentist.location.toLowerCase().includes(loc.toLowerCase()));

    return matchesSearch && matchesSpecialty && matchesLocation;
  });

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
    setSearchQuery('');
  };

  const hasActiveFilters = selectedSpecialties.length > 0 || selectedLocations.length > 0 || searchQuery !== '';

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      {/* Top Bar */}
      <header className="bg-surface shadow-sm flex justify-between items-center w-full px-4 md:px-8 py-3 z-50 fixed top-0 border-b border-outline-variant/40">
        <Link to="/browse" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary-container rounded-lg flex items-center justify-center text-primary font-bold">
            <span className="material-symbols-outlined text-[22px]">medical_services</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">DentMatch KE</h1>
            <p className="text-[10px] text-on-surface-variant leading-none font-medium">Clinic Recruitment Portal</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-4 items-center">
            <Link to="/browse" className="text-sm font-bold text-primary bg-primary-container/40 px-3.5 py-1.5 rounded-full transition-colors">Browse Doctors</Link>
            <Link to="/profile/clinic" className="text-sm font-medium text-on-surface-variant hover:bg-surface-container-high px-3.5 py-1.5 rounded-full transition-colors">Clinic Profile & Offers</Link>
          </div>
          <Link to="/profile/clinic" className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center border border-secondary/20 hover:scale-105 transition-transform" title="Clinic Profile">
            <span className="material-symbols-outlined text-[20px]">domain</span>
          </Link>
        </div>
      </header>

      <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero / Header Section */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Kenyan Dental Talent Network</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  KMPDC Verified
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Direct reverse-recruitment: Browse verified dental surgeons and send direct, binding contracts.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/profile/clinic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl font-label-md font-semibold text-primary shadow-sm hover:bg-surface-container-low transition-all active:scale-95 text-sm"
              >
                <span className="material-symbols-outlined text-sm">history_edu</span>
                <span>Track Sent Offers</span>
              </Link>
            </div>
          </div>

          {/* Quick Specialty Chips */}
          <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
            {["All", "Orthodontics Specialist", "General Practitioner", "Oral & Maxillofacial Surgery", "Pediatric Dentistry"].map((chip) => {
              const isActive = chip === "All" ? selectedSpecialties.length === 0 : selectedSpecialties.includes(chip);
              return (
                <button
                  key={chip}
                  onClick={() => {
                    if (chip === "All") setSelectedSpecialties([]);
                    else toggleSpecialty(chip);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 border ${
                    isActive 
                      ? 'bg-primary text-on-primary border-primary shadow-xs' 
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:flex-1 relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low border border-transparent rounded-xl focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 text-body-md outline-none transition-all" 
                  placeholder="Search by doctor name, specialty, KMPDC number, or equipment (e.g. Itero, CBCT)..." 
                  type="text"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
              <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap gap-2 z-10">
                {/* Specialty Dropdown */}
                <div className="relative flex-1 md:flex-initial" ref={specRef}>
                  <button 
                    onClick={() => setIsSpecOpen(!isSpecOpen)}
                    className="w-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary flex items-center gap-2 justify-between min-w-[190px]"
                  >
                    <span className="font-medium text-sm">Specialties {selectedSpecialties.length > 0 && `(${selectedSpecialties.length})`}</span>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{isSpecOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {isSpecOpen && (
                    <div className="absolute top-full mt-1 left-0 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-2 flex flex-col max-h-64 overflow-y-auto w-[260px] z-50">
                      {SPECIALTIES.map(spec => (
                        <label key={spec} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container-low cursor-pointer text-sm">
                          <input 
                            type="checkbox" 
                            checked={selectedSpecialties.includes(spec)}
                            onChange={() => toggleSpecialty(spec)}
                            className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                          />
                          <span className="font-body-md text-on-surface">{spec}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Dropdown */}
                <div className="relative flex-1 md:flex-initial" ref={locRef}>
                  <button 
                    onClick={() => setIsLocOpen(!isLocOpen)}
                    className="w-full bg-surface-container-low hover:bg-surface-container border border-outline-variant/60 rounded-xl px-4 py-3 text-body-md focus:ring-2 focus:ring-primary flex items-center gap-2 justify-between min-w-[160px]"
                  >
                    <span className="font-medium text-sm">Locations {selectedLocations.length > 0 && `(${selectedLocations.length})`}</span>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{isLocOpen ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {isLocOpen && (
                    <div className="absolute top-full mt-1 left-0 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-2 flex flex-col max-h-60 overflow-y-auto w-[210px] z-50">
                      {LOCATIONS.map(loc => (
                        <label key={loc} className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container-low cursor-pointer text-sm">
                          <input 
                            type="checkbox" 
                            checked={selectedLocations.includes(loc)}
                            onChange={() => toggleLocation(loc)}
                            className="w-4 h-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                          />
                          <span className="font-body-md text-on-surface">{loc}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/40 text-xs">
                <span className="text-on-surface-variant font-bold uppercase tracking-wider mr-1">Filters:</span>
                
                {selectedSpecialties.map(spec => (
                  <span key={spec} className="inline-flex items-center gap-1 bg-primary-container text-on-primary-container font-semibold px-2.5 py-1 rounded-full border border-primary/20">
                    {spec}
                    <button onClick={() => toggleSpecialty(spec)} className="hover:bg-primary/20 rounded-full w-4 h-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                ))}

                {selectedLocations.map(loc => (
                  <span key={loc} className="inline-flex items-center gap-1 bg-tertiary-container text-on-tertiary-container font-semibold px-2.5 py-1 rounded-full border border-tertiary/20">
                    {loc}
                    <button onClick={() => toggleLocation(loc)} className="hover:bg-tertiary/20 rounded-full w-4 h-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </span>
                ))}

                <button 
                  onClick={clearAllFilters}
                  className="ml-auto font-bold text-error hover:underline px-2 py-0.5"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Talent Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            <div className="col-span-full py-16 text-center text-on-surface-variant">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary mb-2">progress_activity</span>
              <p className="text-body-md font-medium">Loading verified Kenyan dental talent...</p>
            </div>
          ) : filteredDentists.length === 0 ? (
            <div className="col-span-full py-16 text-center text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant p-8">
              <span className="material-symbols-outlined text-5xl opacity-40 mb-3 text-primary">person_search</span>
              <h3 className="font-headline-sm text-on-surface font-bold mb-1">No dentists match your criteria</h3>
              <p className="text-body-md text-on-surface-variant max-w-md mx-auto mb-4">Try clearing some filters or searching for different specialties or equipment.</p>
              <button onClick={clearAllFilters} className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm">
                Clear Filters
              </button>
            </div>
          ) : (
            filteredDentists.map(dentist => (
              <div 
                key={dentist.id} 
                className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-5 flex flex-col hover:shadow-lg hover:border-primary/40 transition-all duration-200 relative overflow-hidden group"
              >
                {/* Header tag */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary-container/60 text-secondary text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span>KMPDC {dentist.license}</span>
                  </div>
                  <span className="bg-primary-container/80 text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                    {dentist.status || "Available for Locum"}
                  </span>
                </div>

                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 text-primary flex items-center justify-center border border-primary/20 shrink-0 font-bold text-lg">
                    {dentist.avatarInitials || "DR"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-headline-sm text-base text-on-surface font-bold truncate">{dentist.name}</h3>
                    <p className="text-xs text-secondary font-bold uppercase tracking-wider truncate">{dentist.specialty}</p>
                    <div className="flex items-center gap-1 mt-1 text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-[15px] text-error">location_on</span> 
                      <span className="truncate">{dentist.location}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-surface-container-low/70 rounded-xl border border-outline-variant/40">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block">Clinical Experience</span>
                    <span className="text-sm text-on-surface font-bold">{dentist.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block">Locum Rate</span>
                    <span className="text-sm text-primary font-bold">
                      {dentist.locumDailyRate ? `KES ${dentist.locumDailyRate.toLocaleString()} / day` : dentist.expectedSalary}
                    </span>
                  </div>
                </div>

                {dentist.bio && (
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-3 leading-relaxed">
                    {dentist.bio}
                  </p>
                )}

                <div className="mb-4">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold block mb-1.5">Equipped & Proficient</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dentist.equipment.slice(0, 3).map(eq => (
                      <span key={eq} className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[11px] font-medium border border-outline-variant/50">{eq}</span>
                    ))}
                    {dentist.equipment.length > 3 && (
                      <span className="text-[11px] text-primary font-semibold px-1 py-0.5">+{dentist.equipment.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedCv(dentist)}
                    className="w-full border border-outline-variant text-on-surface py-2.5 rounded-xl font-bold text-xs hover:bg-surface-container-high transition-colors active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>View CV</span>
                  </button>
                  <Link 
                    to={`/send-offer?dentistId=${dentist.id}`} 
                    className="w-full bg-primary text-on-primary py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 active:scale-95 transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Send Offer</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Market Rate Insights Section */}
        {analytics && (
          <section className="mt-10 mb-8 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
                  <h3 className="font-headline-sm text-on-surface font-bold">Kenyan Dental Market Benchmarks</h3>
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  Median locum and full-time compensations calculated across verified dental clinics.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="px-3 py-1 bg-surface-container-low rounded-lg border border-outline-variant">
                  ⚡ Avg. Response Time: <strong>{analytics.averageTimeToMatchHours}h</strong>
                </span>
                <span className="px-3 py-1 bg-surface-container-low rounded-lg border border-outline-variant">
                  🦷 Active Offers: <strong>{analytics.activeOffersCount}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {analytics.benchmarks?.map((bm: any) => (
                <div key={bm.county} className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/60">
                  <p className="text-xs font-bold text-on-surface truncate mb-1">{bm.county}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Locum / day</span>
                      <span className="font-bold text-primary">KES {bm.locumDailyMedian.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Monthly</span>
                      <span className="font-semibold text-on-surface">KES {(bm.permanentMonthlyMedian / 1000).toFixed(0)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* CV Modal */}
      {selectedCv && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">medical_information</span>
                <h2 className="font-headline-sm font-bold text-primary text-base md:text-lg">Practitioner Profile & Credentials</h2>
              </div>
              <button onClick={() => setSelectedCv(null)} className="text-on-surface-variant hover:bg-surface-container-high p-1.5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary-container text-primary flex items-center justify-center border border-primary/20 shrink-0 font-bold text-xl">
                  {selectedCv.avatarInitials || "DR"}
                </div>
                <div>
                  <h3 className="font-headline-md text-xl text-on-surface font-bold flex items-center gap-2">
                    {selectedCv.name}
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </h3>
                  <p className="font-label-lg text-secondary font-bold uppercase tracking-wide text-xs">{selectedCv.specialty}</p>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-error">location_on</span> {selectedCv.location}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/60">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Experience</p>
                  <p className="text-base font-bold text-on-surface">{selectedCv.experience}</p>
                </div>
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/60">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">KMPDC License</p>
                  <p className="text-base font-bold text-secondary">{selectedCv.license}</p>
                </div>
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/60 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Locum Expectation</p>
                  <p className="text-base font-bold text-primary">{selectedCv.expectedSalary}</p>
                </div>
              </div>

              {selectedCv.bio && (
                <div>
                  <h4 className="font-bold text-sm text-on-surface mb-1">Clinical Statement</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
                    {selectedCv.bio}
                  </p>
                </div>
              )}
              
              <div>
                <h4 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2 border-b border-outline-variant/60 pb-2">
                  <span className="material-symbols-outlined text-primary text-sm">school</span> Academic Qualifications
                </h4>
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <p className="font-bold text-sm text-on-surface">{selectedCv.education.degree}</p>
                  <p className="text-xs text-on-surface-variant">{selectedCv.education.school} • Graduated {selectedCv.education.year}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2 border-b border-outline-variant/60 pb-2">
                  <span className="material-symbols-outlined text-primary text-sm">work</span> Clinical Practice History
                </h4>
                <div className="space-y-2">
                  {selectedCv.history.map((job: any, idx: number) => (
                    <div key={idx} className="p-3 bg-surface-container-low rounded-xl">
                      <p className="font-bold text-sm text-on-surface">{job.role}</p>
                      <p className="text-xs text-on-surface-variant">{job.clinic} • {job.duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-2 border-b border-outline-variant/60 pb-2">
                  <span className="material-symbols-outlined text-primary text-sm">precision_manufacturing</span> Equipment & Technical Proficiencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCv.equipment.map((eq: string) => (
                    <span key={eq} className="bg-surface-container text-on-surface px-2.5 py-1 rounded-lg text-xs font-medium border border-outline-variant">{eq}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex gap-3">
              <button 
                onClick={() => setSelectedCv(null)} 
                className="flex-1 py-3 text-on-surface font-bold border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors text-sm"
              >
                Close
              </button>
              <Link 
                to={`/send-offer?dentistId=${selectedCv.id}`} 
                className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-98 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send Binding Offer</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2.5 bg-surface shadow-lg md:hidden border-t border-outline-variant">
        <Link to="/browse" className="flex flex-col items-center justify-center bg-primary-container text-primary rounded-xl px-5 py-1.5 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_search</span>
          <span className="text-[11px] font-bold">Talent</span>
        </Link>
        <Link to="/profile/clinic" className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1.5 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-xl">domain</span>
          <span className="text-[11px] font-medium">My Clinic</span>
        </Link>
      </nav>
    </div>
  );
}
