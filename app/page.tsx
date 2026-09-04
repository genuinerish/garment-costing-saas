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
            href="/pricing"
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            View Plans
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center px-4 pt-16 pb-12 max-w-4xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
          Built for Textile Merchandisers & Garment Exporters
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Precision Garment Costing & Quotation Suite
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Say goodbye to error-prone spreadsheets. Eliminate cost miscalculations across
          yarn rates, fabric consumption, dyeing, CM overheads, and trim allocations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="px-6 py-3 font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
          >
            Get Started (Sign In / Register)
          </Link>
          <a
            href="#pricing"
            className="px-6 py-3 font-semibold text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-900 transition-colors text-sm sm:text-base"
          >
            Explore Plans
          </a>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-14 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">🧵</div>
            <h3 className="text-lg font-bold text-white">Fabric & Yarn Consumption</h3>
            <p className="text-slate-400 text-sm mt-2">
              Calculate exact GSM, loop length, knitting loss, and dyeing shrinkage in grams per garment.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">✂️</div>
            <h3 className="text-lg font-bold text-white">Cut & Make (CM) Engine</h3>
            <p className="text-slate-400 text-sm mt-2">
              Factor SAM, sewing line efficiency, stitching overheads, and packaging allocations.
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="text-2xl mb-3">🏷️</div>
            <h3 className="text-lg font-bold text-white">Trims & Quotation Export</h3>
            <p className="text-slate-400 text-sm mt-2">
              Itemize accessories, freight, profit margins, and export-grade quotations in multiple currencies.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Tier Pricing Grid */}
      <section id="pricing" className="py-20 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Pick Your Plan</h2>
          <p className="mt-2 text-slate-400 text-sm">Choose the right tier for your merchandising workload.</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

            {/* Basic Plan */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Basic Monthly</h3>
                <p className="text-slate-400 text-xs mt-1">Core calculation toolkit for freelancers.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹299 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ Dynamic Yarn & Fabric Costing</li>
                  <li className="flex items-center gap-2">✓ Basic CM & Trim Breakdowns</li>
                  <li className="flex items-center gap-2">✓ Up to 15 Active Costing Sheets</li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center transition-colors border border-slate-700 text-xs"
              >
                Choose Basic (₹299)
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="bg-slate-900 border-2 border-emerald-500/70 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Premium Monthly</h3>
                <p className="text-slate-400 text-xs mt-1">Full suite for active merchandisers.</p>
                <div className="mt-5 text-3xl font-extrabold text-emerald-400">
                  ₹549 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ Everything in Basic</li>
                  <li className="flex items-center gap-2">✓ Unlimited Costing Sheets & Revisions</li>
                  <li className="flex items-center gap-2">✓ Multi-Currency Quotation Sheets</li>
                  <li className="flex items-center gap-2">✓ Export to PDF & Excel</li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="mt-8 block w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-center transition-colors shadow-lg shadow-emerald-500/20 text-xs"
              >
                Choose Premium (₹549)
              </Link>
            </div>

            {/* Yearly Enterprise */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  Save ₹589 / Year
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Annual Enterprise</h3>
                <p className="text-slate-400 text-xs mt-1">For apparel brands and buying houses.</p>
                <div className="mt-5 text-3xl font-extrabold text-white">
                  ₹5,999 <span className="text-xs text-slate-400 font-normal">/ year</span>
                </div>
                <p className="text-[11px] text-emerald-400 mt-1">Equivalent to ₹499 / month</p>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ All Premium Features Included</li>
                  <li className="flex items-center gap-2">✓ Priority Support & Custom Formula Config</li>
                  <li className="flex items-center gap-2">✓ Continuous Cloud Backup</li>
                  <li className="flex items-center gap-2">✓ 1-Year Rate Lock Guarantee</li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="mt-8 block w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center transition-colors border border-slate-700 text-xs"
              >
                Choose Annual (₹5,999)
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}