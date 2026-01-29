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
  { label: 'Severe Structural Damage', value: 1.0 },
  { label: 'Major Damage (Frame/Airbag)', value: 0.75 },
  { label: 'Moderate Damage', value: 0.5 },
  { label: 'Minor Damage', value: 0.25 },
  { label: 'No Structural Damage', value: 0.0 },
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          17c Diminished Value Calculator
        </h1>
        <p className="text-gray-600 mb-8">
          Calculate what insurance companies don't want you to know
        </p>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded ${
                s <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Vehicle Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Step 1: Vehicle Details</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Camry"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-Accident Value (KBB/NADA Estimate)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="25000"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Use{' '}
                <a
                  href="https://www.kbb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Kelley Blue Book
                </a>{' '}
                or{' '}
                <a
                  href="https://www.nada.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  NADA Guides
                </a>{' '}
                for accurate valuation
              </p>
            </div>

            {/* Ad Placement #1 - Sidebar */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
              [Ad Space 300x250 - Sidebar Display]
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!baseValue || !vehicleYear || !vehicleMake || !vehicleModel}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue to Damage Assessment →
            </button>
          </div>
        )}

        {/* Step 2: Damage Assessment */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Step 2: Damage Assessment</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Damage Severity
              </label>
              <select
                value={damageMultiplier}
                onChange={(e) => setDamageMultiplier(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                {damageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} (Multiplier: {option.value})
                  </option>
                ))}
              </select>
            </div>

            {/* Ad Placement #2 - Below Damage Dropdown */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
              [Ad Space - Responsive Banner 728x90]
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Mileage
              </label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="45000"
              />
              <p className="text-sm text-gray-500 mt-2">
                Mileage multiplier: {getMileageMultiplier(parseFloat(mileage) || 0)}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300"
              >
                ← Back
              </button>
              <button
                onClick={calculate}
                disabled={!mileage}
                className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate My Value
              </button>
            </div>

            {/* Legal Disclaimer */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-sm text-gray-700">
                ⚠️ <strong>DISCLAIMER:</strong> This calculator provides an ESTIMATE based on the
                17c formula commonly used by insurance adjusters. Results are for informational
                purposes only and do not constitute legal or financial advice. Actual diminished
                value may vary. Consult a qualified attorney or appraiser for formal valuation.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Your Estimated Diminished Value</h2>

            <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-2">Estimated Claim Amount</p>
              <p className="text-5xl font-bold text-blue-600">
                ${result.diminishedValue.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Calculation Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pre-Accident Value:</span>
                  <span className="font-medium">${result.breakdown.baseValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">10% Cap:</span>
                  <span className="font-medium">${result.breakdown.tenPercentCap.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Damage Multiplier:</span>
                  <span className="font-medium">{result.breakdown.damageMultiplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mileage Multiplier:</span>
                  <span className="font-medium">{result.breakdown.mileageMultiplier}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Final Diminished Value:</span>
                  <span className="text-blue-600">${result.diminishedValue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Ad Placement #3 - In-Feed */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
              [Ad Space - In-Feed Native Ad Unit]
            </div>

            <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Fight for Your Money?</h3>
              <p className="text-gray-700 mb-4">
                Connect with a diminished value attorney who can help you recover what you're owed.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700">
                Find a Diminished Value Attorney →
              </button>
            </div>

            <button
              onClick={() => {
                setStep(1);
                setResult(null);
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-300"
            >
              Calculate Another Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
