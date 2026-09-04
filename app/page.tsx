import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-lg tracking-wider text-emerald-400">
          <span className="p-2 bg-emerald-950 border border-emerald-500/30 rounded-lg">🧮</span>
          GARCOS ENTERPRISE
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/login?mode=signup"
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Get Subscription
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-4 pt-16 pb-12 max-w-4xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
          Production-Grade Garment Costing Engine
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Precision Costing for Modern Manufacturers
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Standardize fabric consumption, yarn price volatility, knitting/dyeing losses, CM overheads,
          and trims. Subscription-only platform with recurring automated billing.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#plans"
            className="px-6 py-3 font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
          >
            Select a Plan to Start
          </a>
        </div>
      </section>

      {/* Pricing Cards (Zero Free Options) */}
      <section id="plans" className="py-16 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Direct Access Subscription Plans</h2>
          <p className="mt-2 text-slate-400 text-sm">Automated recurring billing via UPI AutoPay & Cards.</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Basic Plan */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Basic Plan</h3>
                <p className="text-slate-400 text-xs mt-1">Single garment costing for small workshops.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹299 <span className="text-xs text-slate-400 font-normal">/ month (AutoPay)</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 text-emerald-400">✓ Single Garment Calculation Suite</li>
                  <li className="flex items-center gap-2 text-emerald-400">✓ Save Up to 3 Costing Histories</li>
                  <li className="flex items-center gap-2">✓ Fabric, Yarn, Dyeing & CM Cost Engine</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through">✕ Photo & Tech Pack Uploads</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through">✕ Custom Rows & Additional Components</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-xs border border-slate-700"
              >
                Subscribe Basic (₹299/mo)
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl">
              <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Full Production Suite
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Premium Plan</h3>
                <p className="text-slate-400 text-xs mt-1">Simultaneous multi-garment costing & uploads.</p>
                <div className="mt-5 text-3xl font-extrabold text-emerald-400">
                  ₹499 <span className="text-xs text-slate-400 font-normal">/ month (AutoPay)</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-bold text-white">✓ Multi-Garment Simultaneous Costing</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Unlimited Saved Costing History</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Upload Garment Tech Pack Photos & Sketches</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Add Unlimited Dynamic Components & Rows</li>
                  <li className="flex items-center gap-2">✓ Currency Conversion Quotations ($ / € / ₹)</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center text-xs shadow-lg shadow-emerald-500/20"
              >
                Subscribe Premium (₹499/mo)
              </Link>
            </div>

            {/* Yearly Plan */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Save ₹1,188 / Year
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Yearly Enterprise</h3>
                <p className="text-slate-400 text-xs mt-1">Annual uninterrupted recurring license.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹6,000 <span className="text-xs text-slate-400 font-normal">/ year (AutoPay)</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-bold text-white">✓ All Premium Features Unlocked</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Unlimited Saved Costing History</li>
                  <li className="flex items-center gap-2">✓ Guaranteed 1-Year Locked Price</li>
                  <li className="flex items-center gap-2">✓ Priority Data Storage & Backups</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-xs border border-slate-700"
              >
                Subscribe Yearly (₹6,000/yr)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}