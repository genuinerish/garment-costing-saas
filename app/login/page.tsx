'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setInfoMsg] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setInfoMsg('');

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { emailRedirectTo: `${window.location.origin}/dashboard/costing` }
                });
                if (error) throw error;
                setInfoMsg('Verification email sent! Please check your inbox.');
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                router.push('/dashboard/costing');
                router.refresh();
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-lg font-black">
                        ₹
                    </div>
                    <div>
                        <h1 className="text-base font-black text-white">GARCOS ENTERPRISE</h1>
                        <p className="text-xs text-slate-400">Sign in to your garment merchandising suite</p>
                    </div>
                </div>

                <form onSubmit={handleAuth} className="space-y-4 text-xs">
                    <div>
                        <label className="block font-bold text-slate-400 uppercase mb-1">Work Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="merchandiser@company.com"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-400 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                        />
                    </div>

                    {errorMsg && <p className="text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">{errorMsg}</p>}
                    {infoMsg && <p className="text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">{infoMsg}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
                    >
                        {loading ? 'Processing...' : isSignUp ? 'Create SaaS Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); setInfoMsg(''); }}
                        className="text-xs text-slate-400 hover:text-emerald-400 font-medium"
                    >
                        {isSignUp ? 'Already registered? Sign In' : 'Need an account? Register'}
                    </button>
                </div>
            </div>
        </div>
    );
}