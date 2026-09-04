"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* GarKos Emerald Textile Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-lg tracking-tight text-slate-900">
                                GarKos
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                PRO
                            </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 -mt-0.5">
                            Garment Costing Engine
                        </p>
                    </div>
                </Link>

                {/* Navigation Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors px-3 py-2"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/login?mode=signup"
                        className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}