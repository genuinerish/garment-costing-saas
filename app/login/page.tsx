'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { Calculator, ArrowRight, Layers, CreditCard, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [errorText, setErrorText] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorText(null)
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const res = isLogin ? await login(formData) : await signup(formData)
            if (res && res.error) {
                setErrorText(res.error)
                setIsLoading(false)
            }
        } catch (err: any) {
            setErrorText('An unexpected error occurred. Please try again.')
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex font-sans text-neutral-100 selection:bg-emerald-500/30 overflow-hidden relative">
            {/* Background Orbs & Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

            {/* Left side / Decoration */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 pr-0 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 group w-fit">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Calculator className="w-5 h-5 text-neutral-950" />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                        Garcos
                        <span className="text-emerald-500 ml-1">.</span>
                    </span>
                </Link>

                <div className="space-y-8 max-w-lg mb-20">
                    <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400">
                        Master your manufacturing costs globally.
                    </h1>
                    <p className="text-lg text-neutral-400 leading-relaxed font-light">
                        Unlock the premier platform for garment logic, multi-currency quotation, and pristine tech pack generation.
                    </p>

                    <div className="flex flex-col gap-4 pt-4">
                        <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <Layers className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span>Infinite complex BOM layering with visual breakdowns.</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-300">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                <CreditCard className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span>Transparent SaaS model. Access everywhere.</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enterprise-grade security via Supabase.</span>
                </div>
            </div>

            {/* Right side / Authenticator */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">

                {/* Mobile Header (Shows only on mobile) */}
                <div className="absolute top-6 left-6 lg:hidden">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <Calculator className="w-4 h-4 text-neutral-950" />
                        </div>
                        <span className="text-xl font-black text-white">Garcos</span>
                    </Link>
                </div>

                {/* Login Form Box */}
                <div className="w-full max-w-md">
                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                        {/* Tiny accent line top */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />

                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold mb-2 tracking-tight text-white">
                                {isLogin ? 'Welcome back' : 'Create an account'}
                            </h2>
                            <p className="text-neutral-400 text-sm">
                                {isLogin
                                    ? 'Enter your credentials to access your dashboard.'
                                    : 'Get started with Garcos SaaS today.'}
                            </p>
                        </div>

                        {errorText && (
                            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                {errorText}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all group-hover:border-neutral-700"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400" htmlFor="password">
                                        Password
                                    </label>
                                    {isLogin && (
                                        <a href="#" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative group">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                                        required
                                        className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all group-hover:border-neutral-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-neutral-950/20 border-t-neutral-950 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? 'Sign In' : 'Sign Up'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-400 text-sm">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin)
                                        setErrorText(null)
                                    }}
                                    className="text-white font-medium hover:text-emerald-400 transition-colors cursor-pointer"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8 text-xs text-neutral-600 font-medium">
                        <p className="mb-2">Garcos Pro is protected by Supabase Auth.</p>
                        <div className="flex items-center justify-center gap-4">
                            <Link href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}