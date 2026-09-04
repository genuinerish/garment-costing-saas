import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
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
          Built for Textile Merchandisers & Exporters
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
            href="#features"
            className="px-6 py-3 font-semibold text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-900 transition-colors text-sm sm:text-base"
          >
            Learn How It Works
          </a>
        </div>
      </section>

      {/* What is Garment Costing Explainer Section */}
      <section id="features" className="py-16 border-t border-slate-900 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Why Precision Costing Matters</h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              A 1% miscalculation in consumption or yarn rate can turn an export order from profitable to loss-making.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <div className="text-2xl mb-3">🧵</div>
              <h3 className="text-lg font-bold text-white">Fabric & Yarn Consumption</h3>
              <p className="text-slate-400 text-sm mt-2">
                Calculate precise GSM, loop length, knitting loss, and dyeing shrinkage in grams per garment.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <div className="text-2xl mb-3">✂️</div>
              <h3 className="text-lg font-bold text-white">Cut & Make (CM) Calculation</h3>
              <p className="text-slate-400 text-sm mt-2">
                Accurately factor SAM (Standard Allowed Minutes), line efficiency, stitching, and finishing overheads.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
              <div className="text-2xl mb-3">🏷️</div>
              <h3 className="text-lg font-bold text-white">Trims, Freight & Profit</h3>
              <p className="text-slate-400 text-sm mt-2">
                Itemize zippers, polybags, cartons, labels, export margins, and multi-currency conversions ($ / € / ₹).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-2 text-slate-400 text-sm">Full access to the calculation engine and quotation generators.</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

            {/* Monthly */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Monthly Access</h3>
                <p className="text-slate-400 text-sm mt-1">Flexible month-to-month access for individual merchandisers.</p>
                <div className="mt-6 text-4xl font-extrabold text-white">
                  ₹299 <span className="text-base text-slate-400 font-normal">/ month</span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">✓ Dynamic Knitting, Dyeing & CM Costing</li>
                  <li className="flex items-center gap-2">✓ Automated Trims & Accessories Breakdowns</li>
                  <li className="flex items-center gap-2">✓ Export Sheet Generation</li>
                  <li className="flex items-center gap-2">✓ Cloud Storage</li>
                </ul>
              </div>

              <Link
                href="/pricing"
                className="mt-8 block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center transition-colors border border-slate-700 text-sm"
              >
                Choose Monthly (₹299)
              </Link>
            </div>

            {/* Annual */}
            <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative flex flex-col justify-between">
              <span className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Save ~16% (₹588 Off)
              </span>

              <div>
                <h3 className="text-xl font-bold text-white">Annual Pro</h3>
                <p className="text-slate-400 text-sm mt-1">Best value for established merchandising teams and buying houses.</p>
                <div className="mt-6 text-4xl font-extrabold text-white">
                  ₹3,000 <span className="text-base text-slate-400 font-normal">/ year</span>
                </div>
                <p className="text-xs text-emerald-400 mt-1">Equivalent to ₹250 / month</p>

                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2">✓ Everything in Monthly</li>
                  <li className="flex items-center gap-2">✓ Unlimited Quotation Revisions</li>
                  <li className="flex items-center gap-2">✓ Continuous Cloud Backup</li>
                  <li className="flex items-center gap-2">✓ Rate Lock Guarantee</li>
                </ul>
              </div>

              <Link
                href="/pricing"
                className="mt-8 block w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-center transition-colors shadow-lg shadow-emerald-500/20 text-sm"
              >
                Choose Annual (₹3,000)
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}