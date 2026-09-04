"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface ClientRecord {
    id: string;
    email: string;
    plan_tier: string;
    subscription_status: string;
    created_at: string;
    razorpay_subscription_id?: string;
}

export default function AdminClientsDashboard() {
    const [clients, setClients] = useState<ClientRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchClients() {
            try {
                const res = await fetch("/api/admin/clients");
                if (res.ok) {
                    const data = await res.json();
                    setClients(data.clients || []);
                }
            } catch (err) {
                console.error("Failed to load client audit list", err);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, []);

    const filteredClients = clients.filter((c) => {
        const matchesFilter =
            filter === "all" ||
            (filter === "active" && c.subscription_status === "active") ||
            (filter === "inactive" && c.subscription_status !== "active") ||
            (filter === "premium" && (c.plan_tier === "premium" || c.plan_tier === "yearly"));

        const matchesSearch =
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.razorpay_subscription_id?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

                {/* Header Breadcrumb & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Subscriber Management & Activity
                            </h1>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                                Admin Console
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            Live audit of user subscriptions, AutoPay states, and plan authorizations.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/costing"
                            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors"
                        >
                            Open Costing Calculator ➔
                        </Link>
                    </div>
                </div>

                {/* High-Contrast Light Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Total Accounts
                        </span>
                        <div className="text-3xl font-black text-slate-900 mt-2">{clients.length}</div>
                        <p className="text-[11px] text-slate-400 mt-1">Registered users</p>
                    </div>

                    <div className="p-5 bg-white border border-emerald-200 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                            Active AutoPay
                        </span>
                        <div className="text-3xl font-black text-emerald-600 mt-2">
                            {clients.filter((c) => c.subscription_status === "active").length}
                        </div>
                        <p className="text-[11px] text-emerald-700 mt-1">Verified recurring debits</p>
                    </div>

                    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Premium / Yearly
                        </span>
                        <div className="text-3xl font-black text-slate-900 mt-2">
                            {clients.filter((c) => c.plan_tier === "premium" || c.plan_tier === "yearly").length}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">Multi-garment tier</p>
                    </div>

                    <div className="p-5 bg-white border border-amber-200 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                            Basic Plan
                        </span>
                        <div className="text-3xl font-black text-amber-700 mt-2">
                            {clients.filter((c) => c.plan_tier === "basic").length}
                        </div>
                        <p className="text-[11px] text-amber-700 mt-1">Single-garment tier</p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        {[
                            { label: "All Users", key: "all" },
                            { label: "Active Subscriptions", key: "active" },
                            { label: "Premium Tiers", key: "premium" },
                            { label: "Inactive / Pending", key: "inactive" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setFilter(tab.key)}
                                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${filter === tab.key
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search by email or subscription ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
                        />
                    </div>
                </div>

                {/* Client Ledger Table */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-16 text-center text-xs text-slate-500">
                            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                            Loading client profiles...
                        </div>
                    ) : filteredClients.length === 0 ? (
                        <div className="p-16 text-center text-xs text-slate-400">
                            No matching client profiles found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                    <tr>
                                        <th className="px-6 py-4">Client User Email</th>
                                        <th className="px-6 py-4">Subscription Plan</th>
                                        <th className="px-6 py-4">AutoPay Status</th>
                                        <th className="px-6 py-4">Razorpay Sub ID</th>
                                        <th className="px-6 py-4">Registered Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {filteredClients.map((client) => (
                                        <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-slate-900">{client.email}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider ${client.plan_tier === "premium" || client.plan_tier === "yearly"
                                                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                                            : client.plan_tier === "basic"
                                                                ? "bg-sky-100 text-sky-800 border border-sky-200"
                                                                : "bg-slate-100 text-slate-600 border border-slate-200"
                                                        }`}
                                                >
                                                    {client.plan_tier || "None"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 font-bold ${client.subscription_status === "active"
                                                            ? "text-emerald-700"
                                                            : "text-slate-400"
                                                        }`}
                                                >
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${client.subscription_status === "active"
                                                                ? "bg-emerald-600"
                                                                : "bg-slate-300"
                                                            }`}
                                                    />
                                                    {client.subscription_status === "active" ? "Active (AutoPay)" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                                                {client.razorpay_subscription_id || "—"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(client.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
} 