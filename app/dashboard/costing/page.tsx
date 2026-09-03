import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-black">
            {/* Navbar */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 font-bold text-lg tracking-wider text-emerald-400">
                    <span className="p-2 bg-emerald-950 border border-emerald-500/30 rounded-lg">🧮</span>
                    GARCOS ENTERPRISE
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="text-center px-4 pt-16 pb-12 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    Precision Garment Costing & Quotation Suite
                </h1>
                <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Streamline yarn costing, fabric consumption, dyeing, trims, and CM calculations.
                    Generate export-ready quotation sheets in seconds.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/login"
                        className="px-6 py-3 font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
                    >
                        Sign Up / Login
                    </Link>
                    <a
                        href="#pricing"
                        className="px-6 py-3 font-semibold text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-900 transition-colors text-sm sm:text-base"
                    >
                        Learn More & Plans
                    </a>
                </div>
            </section>

            {/* Pricing Cards */}
            <section id="pricing" className="py-16 border-t border-slate-900 bg-slate-900/40">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
                    <p className="mt-2 text-slate-400 text-sm sm:text-base">Equip your merchandising workflow with enterprise accuracy.</p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">

                        {/* Monthly */}
                        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">Monthly Plan</h3>
                                <p className="text-slate-400 text-sm mt-1">Flexible month-to-month access.</p>
                                <div className="mt-6 text-4xl font-extrabold text-white">
                                    ₹699 <span className="text-base text-slate-400 font-normal">/ month</span>
                                </div>

                                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">✓ Dynamic Knitting, Dyeing & CM Costing</li>
                                    <li className="flex items-center gap-2">✓ Automated Trims & Accessories Breakdowns</li>
                                    <li className="flex items-center gap-2">✓ Currency Conversion & Export PDF Generation</li>
                                    <li className="flex items-center gap-2">✓ Cloud Autosave & Multiple Revisions</li>
                                </ul>
                            </div>

                            <Link
                                href="/login?plan=monthly"
                                className="mt-8 block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center transition-colors border border-slate-700 text-sm"
                            >
                                Choose Monthly (₹699)
                            </Link>
                        </div>

                        {/* Annual */}
                        <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative flex flex-col justify-between">
                            <span className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Save 17% (2 Months Free)
                            </span>

                            <div>
                                <h3 className="text-xl font-bold text-white">Annual Plan</h3>
                                <p className="text-slate-400 text-sm mt-1">Best value for active merchandising teams.</p>
                                <div className="mt-6 text-4xl font-extrabold text-white">
                                    ₹6,990 <span className="text-base text-slate-400 font-normal">/ year</span>
                                </div>
                                <p className="text-xs text-emerald-400 mt-1">Equivalent to ₹582 / month</p>

                                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">✓ Everything in Monthly</li>
                                    <li className="flex items-center gap-2">✓ Priority Support & Feature Requests</li>
                                    <li className="flex items-center gap-2">✓ Continuous Cloud Backup</li>
                                    <li className="flex items-center gap-2">✓ Yearly Rate Lock</li>
                                </ul>
                            </div>

                            <Link
                                href="/login?plan=yearly"
                                className="mt-8 block w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-center transition-colors shadow-lg shadow-emerald-500/20 text-sm"
                            >
                                Choose Annual (₹6,990)
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}