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
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mb-6 shadow-lg shadow-blue-500/40">
            <span className="text-4xl">💎</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              17c Calculator
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Discover your vehicle's diminished value using the industry-standard formula trusted by insurance professionals
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="relative">
          <div className="glow-effect"></div>
          <div className="premium-card relative z-10">
            
            {/* Visual Step Indicator */}
            <div className="step-indicator">
              <div className="flex items-center flex-1">
                <div className={`step-circle ${step === 1 ? 'active' : step > 1 ? 'completed' : 'inactive'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <div className="flex-1 px-3">
                  <div className={`text-xs font-semibold ${step >= 1 ? 'text-slate-300' : 'text-slate-500'}`}>
                    Vehicle
                  </div>
                </div>
              </div>
              
              <div className={`step-line ${step > 1 ? 'completed' : 'inactive'}`}></div>
              
              <div className="flex items-center flex-1">
                <div className="flex-1 px-3 text-right">
                  <div className={`text-xs font-semibold ${step >= 2 ? 'text-slate-300' : 'text-slate-500'}`}>
                    Damage
                  </div>
                </div>
                <div className={`step-circle ${step === 2 ? 'active' : step > 2 ? 'completed' : 'inactive'}`}>
                  {step > 2 ? '✓' : '2'}
                </div>
              </div>
              
              <div className={`step-line ${step > 2 ? 'completed' : 'inactive'}`}></div>
              
              <div className="flex items-center flex-1">
                <div className="flex-1 px-3">
                  <div className={`text-xs font-semibold ${step >= 3 ? 'text-slate-300' : 'text-slate-500'}`}>
                    Results
                  </div>
                </div>
                <div className={`step-circle ${step === 3 ? 'active' : 'inactive'}`}>
                  3
                </div>
              </div>
            </div>

            {/* Step 1: Vehicle Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🚗</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Vehicle Information</h2>
                    <p className="text-slate-400 text-sm">Tell us about your vehicle</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="premium-label">Year</label>
                    <input
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="premium-input"
                      placeholder="2020"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                  <div>
                    <label className="premium-label">Make</label>
                    <input
                      type="text"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      className="premium-input"
                      placeholder="Toyota"
                    />
                  </div>
                  <div>
                    <label className="premium-label">Model</label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="premium-input"
                      placeholder="Camry"
                    />
                  </div>
                </div>

                <div>
                  <label className="premium-label">Pre-Accident Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-semibold">$</span>
                    <input
                      type="number"
                      value={baseValue}
                      onChange={(e) => setBaseValue(e.target.value)}
                      className="premium-input pl-10"
                      placeholder="25,000"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

                <div className="ad-container mt-8">
                  <div className="text-sm font-medium mb-1 text-slate-400">Advertisement</div>
                  <div className="text-xs text-slate-500">[Premium Ad Space]</div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!baseValue || !vehicleYear || !vehicleMake || !vehicleModel}
                  className="premium-button w-full mt-6"
                >
                  Continue to Damage Assessment →
                </button>
              </div>
            )}

            {/* Step 2: Damage Assessment */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">💥</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Damage Assessment</h2>
                    <p className="text-slate-400 text-sm">Evaluate the extent of damage</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="premium-label">Damage Severity</label>
                    <select
                      value={damageMultiplier}
                      onChange={(e) => setDamageMultiplier(parseFloat(e.target.value))}
                      className="premium-input cursor-pointer"
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
                    <label className="premium-label">Current Mileage</label>
                    <input
                      type="number"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      className="premium-input"
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

                <div className="ad-container mt-8">
                  <div className="text-sm font-medium mb-1 text-slate-400">Advertisement</div>
                  <div className="text-xs text-slate-500">[Premium Ad Space]</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="premium-button-secondary"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={calculate}
                    disabled={!mileage}
                    className="premium-button"
                  >
                    Calculate Value
                  </button>
                </div>

                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-xl mt-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-yellow-400">DISCLAIMER:</strong> Estimates are for informational purposes only and do not constitute legal advice. Consult a qualified attorney for formal valuation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && result && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">📊</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Your Estimate</h2>
                    <p className="text-slate-400 text-sm">Based on the 17c formula</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl p-8 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20 blur-2xl"></div>
                  <div className="relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-2xl p-10">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-3 font-semibold">Estimated Diminished Value</p>
                    <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                      ${result.diminishedValue.toLocaleString()}
                    </p>
                    <p className="text-slate-500 text-sm mt-3">
                      {vehicleYear} {vehicleMake} {vehicleModel}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-700/40">
                  <h3 className="font-bold text-lg mb-5 text-white flex items-center gap-2">
                    <span>📋</span> Calculation Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-700/30">
                      <span className="text-slate-400 text-sm">Pre-Accident Value</span>
                      <span className="font-semibold text-white text-right">${result.breakdown.baseValue.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-700/30">
                      <span className="text-slate-400 text-sm">10% Base Cap</span>
                      <span className="font-semibold text-white text-right">${result.breakdown.tenPercentCap.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-700/30">
                      <span className="text-slate-400 text-sm">Damage Factor</span>
                      <span className="font-semibold text-blue-400 text-right">×{result.breakdown.damageMultiplier}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-700/30">
                      <span className="text-slate-400 text-sm">Mileage Factor</span>
                      <span className="font-semibold text-blue-400 text-right">×{result.breakdown.mileageMultiplier}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 mt-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl px-4">
                      <span className="font-bold text-white">Final Value</span>
                      <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-right">
                        ${result.diminishedValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ad-container">
                  <div className="text-sm font-medium mb-1 text-slate-400">Advertisement</div>
                  <div className="text-xs text-slate-500">[Premium Ad Space]</div>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-sm border-2 border-emerald-500/40 rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Claim?</h3>
                    <p className="text-slate-300 mb-6 max-w-md mx-auto">
                      Connect with a diminished value attorney who can help you recover this amount.
                    </p>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105">
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
                  className="premium-button-secondary w-full"
                >
                  ← Calculate Another Vehicle
                </button>
              </div>
            )}
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
