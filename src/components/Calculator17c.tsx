import { useState, useEffect } from 'react';

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
  };

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (baseValue && vehicleYear && vehicleMake && vehicleModel && mileage) {
      calculate();
    } else {
      setResult(null);
    }
  }, [baseValue, vehicleYear, vehicleMake, vehicleModel, damageMultiplier, mileage]);

  const isFormComplete = baseValue && vehicleYear && vehicleMake && vehicleModel && mileage;

  return (
    <div className="min-h-screen py-16 px-4" id="calculator">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl mb-6 shadow-lg shadow-emerald-500/40">
            <span className="text-3xl">💎</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              Diminished Value Calculator
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            Calculate your vehicle's diminished value instantly using the industry-standard 17c Formula
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-700">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <h2 className="text-2xl font-bold text-white">Vehicle Information</h2>
                  <p className="text-slate-400 text-sm">Enter your vehicle details below</p>
                </div>
              </div>
              
              {/* Vehicle Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Year</label>
                    <input
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
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
                      className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
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
                      className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl pl-10 pr-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                      placeholder="25,000"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Use{' '}
                    <a href="https://www.kbb.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">
                      KBB
                    </a>{' '}
                    or{' '}
                    <a href="https://www.nada.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">
                      NADA
                    </a>
                  </div>
                </div>

                {/* Damage Assessment */}
                <div className="pt-6 border-t border-slate-700">
                  <div className="flex items-center gap-3 mb-6">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Damage Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Damage Severity</label>
                      <select
                        value={damageMultiplier}
                        onChange={(e) => setDamageMultiplier(parseFloat(e.target.value))}
                        className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl px-4 py-3 w-full text-white cursor-pointer transition-all"
                      >
                        {damageOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-slate-900">
                            {option.label} (×{option.value})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-2 uppercase tracking-wide">Current Mileage</label>
                      <input
                        type="number"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        className="bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 rounded-xl px-4 py-3 w-full text-white placeholder-slate-500 transition-all"
                        placeholder="45,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl mt-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-yellow-400">DISCLAIMER:</strong> Estimates are for informational purposes only. Consult a qualified attorney for formal valuation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Results (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              {!isFormComplete ? (
                <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-xl text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Enter Vehicle Details</h3>
                  <p className="text-slate-500 text-sm">
                    Fill out the form to calculate your diminished value
                  </p>
                </div>
              ) : result ? (
                <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/50 rounded-2xl p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">Your Estimate</span>
                  </div>

                  <div className="text-center mb-8">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-3 font-semibold">Estimated Diminished Value</p>
                    <h2 className="text-6xl font-black text-emerald-400 tracking-tighter mb-2">
                      ${result.diminishedValue.toLocaleString()}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {vehicleYear} {vehicleMake} {vehicleModel}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 mb-6">
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Formula Breakdown
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pre-Accident Value</span>
                        <span className="text-white font-semibold">${result.breakdown.baseValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">10% Base Cap</span>
                        <span className="text-white font-semibold">${result.breakdown.tenPercentCap.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Damage Factor</span>
                        <span className="text-emerald-400 font-semibold">×{result.breakdown.damageMultiplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mileage Factor</span>
                        <span className="text-emerald-400 font-semibold">×{result.breakdown.mileageMultiplier}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all">
                    Find an Attorney →
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
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
