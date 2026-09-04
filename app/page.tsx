import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Garment Costing Software | Apparel Consumption & CM Calculator",
  description:
    "Professional garment costing software for apparel manufacturers, merchandisers, and exporters. Calculate fabric consumption, knitting, dyeing, and CM overheads with accuracy.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 pt-16 pb-14 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
          <span>⚡</span>
          <span>Automated Garment Costing Engine for Knitwear & Woven Apparel</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Precision Garment Costing & Merchandising Engine
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Eliminate manual spreadsheet errors. Instantly calculate yarn price volatility, fabric loop
          lengths, knitting & dyeing loss percentages, cutting, making (CM), and trims.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#plans"
            className="px-6 py-3 font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/25 text-sm sm:text-base"
          >
            Choose Subscription Plan
          </a>
          <Link
            href="/login"
            className="px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-sm sm:text-base shadow-sm"
          >
            Sign In to Dashboard
          </Link>
        </div>
      </section>

      {/* 3 Value Pillars */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              🧵
            </div>
            <h3 className="text-base font-bold text-slate-900">Yarn & Fabric Consumption</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Standardize GSM, loop lengths, yarn counts, and processing shrinkage in grams per piece.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              ✂️
            </div>
            <h3 className="text-base font-bold text-slate-900">Cut & Make (CM) Calculation</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Incorporate SAM, line efficiency, stitch allowances, packing, and factory overheads.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              📊
            </div>
            <h3 className="text-base font-bold text-slate-900">Production Quotations</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Itemize buttons, labels, packaging, freight, and conversion factors for export buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards (Zero Dark Mode, Zero Free Tier) */}
      <section id="plans" className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Subscription Plans</h2>
          <p className="mt-2 text-sm text-slate-600">
            Select recurring AutoPay access to unlock the full calculation suite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Basic Plan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Single Garment
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Basic Plan</h3>
              <p className="text-slate-500 text-xs mt-1">Standard calculation engine for single styles.</p>

              <div className="mt-6 text-3xl font-black text-slate-900">
                ₹299 <span className="text-xs font-semibold text-slate-500">/ month</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">UPI AutoPay / Recurring Card</p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2 text-emerald-700 font-medium">
                  ✓ Single Garment Calculation Suite
                </li>
                <li className="flex items-center gap-2 text-emerald-700 font-medium">
                  ✓ Save Up to 3 Costing Calculations
                </li>
                <li className="flex items-center gap-2">✓ Fabric, Yarn, Dyeing & CM Cost Formula</li>
                <li className="flex items-center gap-2 text-slate-400 line-through">
                  ✕ Photo & Tech Pack Upload
                </li>
                <li className="flex items-center gap-2 text-slate-400 line-through">
                  ✕ Custom Dynamic Rows & Components
                </li>
              </ul>
            </div>

            <Link
              href="/login?mode=signup"
              className="mt-8 block w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-center text-xs transition-colors border border-slate-300"
            >
              Subscribe Basic (₹299/mo)
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
            <span className="absolute -top-3 right-6 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Full Production
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Premium Plan</h3>
              <p className="text-slate-500 text-xs mt-1">Multi-garment calculations with file uploads.</p>

              <div className="mt-6 text-3xl font-black text-emerald-600">
                ₹499 <span className="text-xs font-semibold text-slate-500">/ month</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1 font-medium">UPI AutoPay / Recurring Card</p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-800">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  ✓ Multi-Garment Simultaneous Costing
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  ✓ Unlimited Saved Costing History
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  ✓ Upload Garment Tech Pack Photos
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  ✓ Add Unlimited Dynamic Components & Rows
                </li>
                <li className="flex items-center gap-2">✓ Multi-Currency Quotation Sheets ($ / € / ₹)</li>
              </ul>
            </div>

            <Link
              href="/login?mode=signup"
              className="mt-8 block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center text-xs transition-colors shadow-md shadow-emerald-600/25"
            >
              Subscribe Premium (₹499/mo)
            </Link>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Save ₹1,188 / Year
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Yearly Plan</h3>
              <p className="text-slate-500 text-xs mt-1">Annual license for buying offices & exporters.</p>

              <div className="mt-6 text-3xl font-black text-slate-900">
                ₹6,000 <span className="text-xs font-semibold text-slate-500">/ year</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Equivalent to ₹500 / month</p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2 font-bold text-slate-900">
                  ✓ All Premium Features Included
                </li>
                <li className="flex items-center gap-2 font-bold text-emerald-700">
                  ✓ Unlimited Saved Calculations
                </li>
                <li className="flex items-center gap-2">✓ 1-Year Locked Pricing</li>
                <li className="flex items-center gap-2">✓ Cloud Backup & Storage</li>
              </ul>
            </div>

            <Link
              href="/login?mode=signup"
              className="mt-8 block w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-center text-xs transition-colors border border-slate-300"
            >
              Subscribe Yearly (₹6,000/yr)
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <p>© 2026 Garment Costing Engine. All rights reserved.</p>
      </footer>
    </div>
  );
}