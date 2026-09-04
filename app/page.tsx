import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-black">
      {/* Navbar */}
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
            Create Account
          </Link>
        </div>
      </header>

      {/* Hero Welcome */}
      <section className="text-center px-4 pt-16 pb-12 max-w-4xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
          Textile Merchandising & Costing Suite
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Precision Garment Costing Engine
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Say goodbye to spreadsheet errors. Automate fabric consumption, yarn price volatility,
          knitting & dyeing losses, CM overheads, and trim allocations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/login?mode=signup"
            className="px-6 py-3 font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
          >
            Get Started Free
          </Link>
          <a
            href="#plans"
            className="px-6 py-3 font-semibold text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-900 transition-colors text-sm sm:text-base"
          >
            View Pricing Plans
          </a>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="py-14 border-t border-slate-900 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">🧵</div>
            <h3 className="text-lg font-bold text-white">Yarn & Fabric Consumption</h3>
            <p className="text-slate-400 text-sm mt-2">
              Calculate GSM, loop length, knitting loss, and dyeing shrinkage in exact grams per piece.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">✂️</div>
            <h3 className="text-lg font-bold text-white">Cut & Make (CM) Engine</h3>
            <p className="text-slate-400 text-sm mt-2">
              Factor SAM (Standard Allowed Minutes), line efficiency, stitching, and finishing overheads.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">📦</div>
            <h3 className="text-lg font-bold text-white">Trims & Quotation Exports</h3>
            <p className="text-slate-400 text-sm mt-2">
              Itemize buttons, labels, cartons, freight margins, and multi-currency quotation summaries.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Pricing Plans */}
      <section id="plans" className="py-20 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Transparent Subscription Plans</h2>
          <p className="mt-2 text-slate-400 text-sm">Choose single-garment drafting or multi-garment batch costing.</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Basic ₹299 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Basic Plan</h3>
                <p className="text-slate-400 text-xs mt-1">Single garment calculation.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹299 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 text-emerald-400">✓ Single Garment Costing at a Time</li>
                  <li className="flex items-center gap-2 text-emerald-400">✓ Save Up to 3 Costing Histories</li>
                  <li className="flex items-center gap-2">✓ Full Yarn, Knit, Dye & CM Formulas</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through">✕ Photo & Tech Pack Upload</li>
                  <li className="flex items-center gap-2 text-slate-500 line-through">✕ Custom Components & Extra Rows</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-xs border border-slate-700"
              >
                Choose Basic (₹299)
              </Link>
            </div>

            {/* Premium ₹499 */}
            <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl">
              <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Premium Plan</h3>
                <p className="text-slate-400 text-xs mt-1">Multi-garment simultaneous costing.</p>
                <div className="mt-5 text-3xl font-extrabold text-emerald-400">
                  ₹499 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-bold text-white">✓ Multi-Garment Simultaneous Costing</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Unlimited Saved Costing History</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Upload Garment Photos & Sketches</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Add Unlimited Components & Rows</li>
                  <li className="flex items-center gap-2">✓ Multi-Currency Quotation Sheets</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center text-xs shadow-lg shadow-emerald-500/20"
              >
                Choose Premium (₹499)
              </Link>
            </div>

            {/* Yearly ₹6000 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Save ₹1,188 / Year
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Yearly Enterprise</h3>
                <p className="text-slate-400 text-xs mt-1">For buying houses & exporters.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹6,000 <span className="text-xs text-slate-400 font-normal">/ year</span>
                </div>
                <p className="text-[11px] text-emerald-400 mt-1">Equivalent to ₹500 / month</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2 font-bold text-white">✓ All Premium Multi-Garment Features</li>
                  <li className="flex items-center gap-2 font-bold text-emerald-400">✓ Unlimited Saved Costing History</li>
                  <li className="flex items-center gap-2">✓ Continuous Cloud Backup</li>
                  <li className="flex items-center gap-2">✓ 1-Year Price Lock Guarantee</li>
                </ul>
              </div>
              <Link
                href="/login?mode=signup"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-xs border border-slate-700"
              >
                Choose Yearly (₹6,000)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}