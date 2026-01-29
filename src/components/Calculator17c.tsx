import { useState } from 'react';

interface CalculatorResult {
  diminishedValue: number;
  breakdown: {
    baseValue: number;
    tenPercentCap: number;
    damageMultiplier: number;
    mileageMultiplier: number;
  };
}

const damageOptions = [
  { label: 'Severe Structural Damage', value: 1.0, description: 'Frame damage, airbag deployment' },
  { label: 'Major Damage', value: 0.75, description: 'Significant body/mechanical damage' },
  { label: 'Moderate Damage', value: 0.5, description: 'Visible damage, multiple panels' },
  { label: 'Minor Damage', value: 0.25, description: 'Small dents, paint damage' },
  { label: 'No Structural Damage', value: 0.0, description: 'Cosmetic only' },
];

const mileageRanges = [
  { label: '0 - 19,999 miles', min: 0, max: 19999, value: 1.0 },
  { label: '20,000 - 39,999 miles', min: 20000, max: 39999, value: 0.8 },
  { label: '40,000 - 59,999 miles', min: 40000, max: 59999, value: 0.6 },
  { label: '60,000 - 79,999 miles', min: 60000, max: 79999, value: 0.4 },
  { label: '80,000 - 99,999 miles', min: 80000, max: 99999, value: 0.2 },
  { label: '100,000+ miles', min: 100000, max: Infinity, value: 0.0 },
];

export default function Calculator17c() {
  const [step, setStep] = useState(1);
  const [baseValue, setBaseValue] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [damageMultiplier, setDamageMultiplier] = useState(0.5);
  const [mileage, setMileage] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const getMileageMultiplier = (miles: number): number => {
    const range = mileageRanges.find(r => miles >= r.min && miles <= r.max);
    return range?.value ?? 0;
  };

  const calculate = () => {
    const base = parseFloat(baseValue);
    const miles = parseFloat(mileage);
    
    if (isNaN(base) || isNaN(miles)) return;

    const tenPercentCap = base * 0.1;
    const mileageMultiplier = getMileageMultiplier(miles);
    const diminishedValue = tenPercentCap * damageMultiplier * mileageMultiplier;

    setResult({
      diminishedValue: Math.round(diminishedValue),
      breakdown: {
        baseValue: base,
        tenPercentCap,
        damageMultiplier,
        mileageMultiplier,
      },
    });
    setStep(3);
  };

  return (
    <div className="min-h-screen py-16 px-4" id="calculator">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mb-6 shadow-lg shadow-blue-500/40">
            <span className="text-3xl">💎</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              17c Calculator
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Discover your vehicle's diminished value using the industry-standard formula trusted by insurance professionals
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="relative">
          <div className="glow-effect"></div>
          <div className="premium-card relative z-10">
            
            {/* Visual Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === 1 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' : 
                  step > 1 ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white' : 
                  'bg-slate-700/50 text-slate-400 border border-slate-600'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <span className={`ml-2 text-xs font-semibold ${step >= 1 ? 'text-slate-300' : 'text-slate-500'}`}>
                  Vehicle
                </span>
              </div>
              
              <div className={`h-px flex-1 mx-3 ${step > 1 ? 'bg-emerald-600' : 'bg-slate-700'}`}></div>
              
              <div className="flex items-center flex-1 justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === 2 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' : 
                  step > 2 ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white' : 
                  'bg-slate-700/50 text-slate-400 border border-slate-600'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </div>
                <span className={`ml-2 text-xs font-semibold ${step >= 2 ? 'text-slate-300' : 'text-slate-500'}`}>
                  Damage
                </span>
              </div>
              
              <div className={`h-px flex-1 mx-3 ${step > 2 ? 'bg-emerald-600' : 'bg-slate-700'}`}></div>
              
              <div className="flex items-center flex-1 justify-end">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === 3 ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' : 
                  'bg-slate-700/50 text-slate-400 border border-slate-600'
                }`}>
                  3
                </div>
                <span className={`ml-2 text-xs font-semibold ${step >= 3 ? 'text-slate-300' : 'text-slate-500'}`}>
                  Results
                </span>
              </div>
            </div>

            {/* Step 1: Vehicle Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Vehicle Information</h2>
                    <p className="text-slate-400 text-sm">Tell us about your vehicle</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Year</label>
                    <input
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="2020"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Make</label>
                    <input
                      type="text"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="Camry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Pre-Accident Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-semibold">$</span>
                    <input
                      type="number"
                      value={baseValue}
                      onChange={(e) => setBaseValue(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl pl-10 pr-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="25,000"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Use{' '}
                    <a href="https://www.kbb.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      KBB
                    </a>{' '}
                    or{' '}
                    <a href="https://www.nada.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                      NADA
                    </a>{' '}
                    for accurate valuation
                  </div>
                </div>

                {/* Sponsored Content Ad */}
                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-center border border-slate-800 mt-6">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Sponsored Content</span>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!baseValue || !vehicleYear || !vehicleMake || !vehicleModel}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 w-full transition-all"
                >
                  Continue to Damage Assessment →
                </button>
              </div>
            )}

            {/* Step 2: Damage Assessment */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">💥</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Damage Assessment</h2>
                    <p className="text-slate-400 text-sm">Evaluate the extent of damage</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Damage Severity</label>
                    <select
                      value={damageMultiplier}
                      onChange={(e) => setDamageMultiplier(parseFloat(e.target.value))}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl px-4 py-3 w-full text-white cursor-pointer transition-all"
                    >
                      {damageOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-900">
                          {option.label} (×{option.value}) - {option.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/40">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm font-medium">Damage Factor</span>
                      <span className="text-blue-400 font-bold text-xl">{damageMultiplier.toFixed(2)}×</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Current Mileage</label>
                    <input
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="45,000"
                    />
                  </div>

                  <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/40 md:col-start-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm font-medium">Mileage Factor</span>
                      <span className="text-blue-400 font-bold text-xl">
                        {getMileageMultiplier(parseFloat(mileage) || 0).toFixed(2)}×
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sponsored Content Ad */}
                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-center border border-slate-800 mt-6">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Sponsored Content</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 py-3 px-6 rounded-xl transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={calculate}
                    disabled={!mileage}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                  >
                    Calculate Value
                  </button>
                </div>

                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl mt-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-yellow-400">DISCLAIMER:</strong> Estimates are for informational purposes only and do not constitute legal advice. Consult a qualified attorney for formal valuation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results - Financial Dashboard */}
            {step === 3 && result && (
              <div className="space-y-8 animate-fadeIn">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full mb-6">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-400 text-sm font-semibold">Calculation Complete</span>
                  </div>
                  
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-4 font-semibold">Your Estimated Diminished Value</p>
                  <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-3">
                    ${result.diminishedValue.toLocaleString()}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {vehicleYear} {vehicleMake} {vehicleModel}
                  </p>
                </div>

                {/* Financial Dashboard Card */}
                <div className="bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700 p-8">
                  <h3 className="font-bold text-lg mb-6 text-white flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    17c Formula Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                      <span className="text-slate-400 text-sm">Pre-Accident Value</span>
                      <span className="font-semibold text-white text-lg">${result.breakdown.baseValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                      <span className="text-slate-400 text-sm">10% Base Loss Cap</span>
                      <span className="font-semibold text-white text-lg">${result.breakdown.tenPercentCap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                      <span className="text-slate-400 text-sm">Damage Severity Factor</span>
                      <span className="font-semibold text-blue-400 text-lg">×{result.breakdown.damageMultiplier}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                      <span className="text-slate-400 text-sm">Mileage Adjustment Factor</span>
                      <span className="font-semibold text-blue-400 text-lg">×{result.breakdown.mileageMultiplier}</span>
                    </div>
                    <div className="flex justify-between items-center py-5 mt-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl px-6 border border-green-500/30">
                      <span className="font-bold text-white text-base">Total Diminished Value</span>
                      <span className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        ${result.diminishedValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sponsored Content Ad */}
                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-center border border-slate-800">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Sponsored Content</span>
                </div>

                {/* Attorney CTA - Pulsing */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-indigo-600/50 animate-pulse"></div>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Ready to File Your Claim?</h3>
                    <p className="text-blue-100 mb-8 max-w-md mx-auto text-lg">
                      Connect with experienced diminished value attorneys who can help you recover ${result.diminishedValue.toLocaleString()}
                    </p>
                    <button className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 text-lg">
                      Find an Attorney →
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep(1);
                    setResult(null);
                    setBaseValue('');
                    setVehicleYear('');
                    setVehicleMake('');
                    setVehicleModel('');
                    setMileage('');
                  }}
                  className="bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 py-3 px-6 rounded-xl w-full transition-all"
                >
                  ← Calculate Another Vehicle
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Industry Standard</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
