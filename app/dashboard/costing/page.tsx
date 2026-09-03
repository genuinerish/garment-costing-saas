'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { LogOut, User, ShieldCheck } from 'lucide-react';

export default function CostingDashboard() {
    const router = useRouter();
    const supabase = createClient();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verifyAuth() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                setUserEmail(session.user.email);
            }
            setLoading(false);
        }
        verifyAuth();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-3">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Garment Costing Pro...</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 w-screen h-screen flex flex-col bg-slate-100 overflow-hidden">
            {/* Top SaaS Enterprise Bar */}
            <header className="h-11 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-50">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    <span className="text-xs font-black text-white tracking-wide uppercase">
                        GARCOS <span className="text-emerald-400 font-bold">Cloud Enterprise</span>
                    </span>
                    <span className="ml-2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Active Monthly Plan
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="hidden sm:inline">{userEmail || 'Active Workspace'}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-2.5 py-0.5 bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 rounded-lg text-xs font-bold border border-slate-700 transition-all"
                        title="Sign Out"
                    >
                        <LogOut className="w-3 h-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            {/* Embedded Fullscreen Application */}
            <div className="w-full flex-1 relative bg-slate-50">
                <iframe
                    src="/app.html"
                    className="absolute inset-0 w-full h-full border-none"
                    title="Garment Costing Application Engine"
                />
            </div>
        </div>
    );
}