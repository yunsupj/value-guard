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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg shadow-blue-500/50">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            17c Diminished Value Calculator
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Calculate what insurance companies don't want you to know using the industry-standard <span className="text-blue-400 font-semibold">17c Formula</span>
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="premium-card">
          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {[
                { num: 1, label: 'Vehicle Details' },
                { num: 2, label: 'Damage Assessment' },
                { num: 3, label: 'Your Results' }
              ].map((item, idx) => (
                <div key={item.num} className="flex items-center flex-1">
                  <div className={`flex items-center ${idx < 2 ? 'flex-1' : ''}`}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                      ${step >= item.num 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50' 
                        : 'bg-slate-700/50 text-gray-400 border border-slate-600'}
                    `}>
                      {step > item.num ? '✓' : item.num}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${step >= item.num ? 'text-gray-200' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={`h-0.5 flex-1 mx-4 transition-all duration-300 ${
                      step > item.num ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Vehicle Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Vehicle Information</h2>
                <p className="text-gray-400 text-sm">Enter your vehicle details to begin the calculation</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-semibold">$</span>
                  <input
                    type="number"
                    value={baseValue}
                    onChange={(e) => setBaseValue(e.target.value)}
                    className="premium-input pl-10"
                    placeholder="25,000"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
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
                </p>
              </div>

              {/* Ad Placement #1 */}
              <div className="ad-container">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs opacity-60">[Premium Ad Space 300x250]</div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!baseValue || !vehicleYear || !vehicleMake || !vehicleModel}
                className="premium-button w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Continue to Damage Assessment →
              </button>
            </div>
          )}

          {/* Step 2: Damage Assessment */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Damage Assessment</h2>
                <p className="text-gray-400 text-sm">Select the severity of damage and current mileage</p>
              </div>

              <div>
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
                <div className="mt-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Damage Multiplier:</span>
                    <span className="text-blue-400 font-bold text-lg">{damageMultiplier.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Ad Placement #2 */}
              <div className="ad-container">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs opacity-60">[Responsive Banner 728x90]</div>
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
                <div className="mt-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Mileage Multiplier:</span>
                    <span className="text-blue-400 font-bold text-lg">
                      {getMileageMultiplier(parseFloat(mileage) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="premium-button-secondary flex-1"
                >
                  ← Back
                </button>
                <button
                  onClick={calculate}
                  disabled={!mileage}
                  className="premium-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Calculate My Value
                </button>
              </div>

              {/* Legal Disclaimer */}
              <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <strong className="text-yellow-400">DISCLAIMER:</strong> This calculator provides an ESTIMATE based on the 17c formula commonly used by insurance adjusters. Results are for informational purposes only and do not constitute legal or financial advice. Actual diminished value may vary. Consult a qualified attorney or appraiser for formal valuation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && result && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Your Estimated Diminished Value</h2>
                <p className="text-gray-400 text-sm">Based on the industry-standard 17c formula</p>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-2 border-blue-500/50 rounded-2xl p-10 text-center">
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-3">Estimated Claim Amount</p>
                  <p className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    ${result.diminishedValue.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {vehicleYear} {vehicleMake} {vehicleModel}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculation Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400">Pre-Accident Value</span>
                    <span className="font-semibold text-white">${result.breakdown.baseValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400">10% Base Cap</span>
                    <span className="font-semibold text-white">${result.breakdown.tenPercentCap.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400">Damage Multiplier</span>
                    <span className="font-semibold text-blue-400">×{result.breakdown.damageMultiplier}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400">Mileage Multiplier</span>
                    <span className="font-semibold text-blue-400">×{result.breakdown.mileageMultiplier}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 mt-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg px-4">
                    <span className="font-bold text-white">Final Diminished Value</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      ${result.diminishedValue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ad Placement #3 */}
              <div className="ad-container">
                <div className="text-sm font-medium mb-1">Advertisement</div>
                <div className="text-xs opacity-60">[In-Feed Native Ad Unit]</div>
              </div>

              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-green-600/30 to-emerald-600/30 backdrop-blur-sm border-2 border-green-500/50 rounded-2xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-full mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Fight for Your Money?</h3>
                  <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                    Connect with a diminished value attorney who can help you recover what you're owed. Don't let insurance companies shortchange you.
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:scale-105">
                    Find a Diminished Value Attorney →
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

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Trusted calculation method used by insurance professionals</p>
          <div className="flex items-center justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Secure Calculation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Industry Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Free Tool</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
