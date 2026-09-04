"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planType: "basic" | "premium" | "yearly") => {
        try {
            setLoading(planType);
            const res = await fetch("/api/razorpay/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planType }),
            });

            const data = await res.json();

            if (!res.ok || !data.subscriptionId) {
                alert(data.error || "Subscription initialization failed. Check your plan IDs in Netlify.");
                setLoading(null);
                return;
            }

            const planLabels = {
                basic: "Basic Monthly (₹299)",
                premium: "Premium Monthly (₹549)",
                yearly: "Annual Enterprise (₹5,999)",
            };

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "GARCOS ENTERPRISE",
                description: `${planLabels[planType]} Subscription`,
                handler: function () {
                    alert("Payment verified! Access granted.");
                    router.push("/dashboard/costing");
                },
                theme: {
                    color: "#10b981",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Error starting checkout: " + err.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12">
            <div className="text-center max-w-xl">
                <h1 className="text-3xl font-bold tracking-tight">Select a Subscription Tier</h1>
                <p className="mt-2 text-slate-400 text-sm">
                    Activate via Google Pay, UPI AutoPay, or Card to unlock the garment costing suite.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {/* Basic ₹299 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Basic Monthly</h2>
                        <p className="text-slate-400 text-xs mt-1">Core calculation toolkit.</p>
                        <div className="mt-5 text-3xl font-extrabold">
                            ₹299 <span className="text-xs font-normal text-slate-400">/ mo</span>
                        </div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li>✓ Dynamic Yarn & Fabric Costing</li>
                            <li>✓ Basic CM & Trim Breakdowns</li>
                            <li>✓ Up to 15 Active Sheets</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("basic")}
                        disabled={loading === "basic"}
                        className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                    >
                        {loading === "basic" ? "Opening..." : "Pay ₹299 / Month"}
                    </button>
                </div>

                {/* Premium ₹549 */}
                <div className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xl">
                    <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Recommended
                    </span>
                    <div>
                        <h2 className="text-lg font-bold">Premium Monthly</h2>
                        <p className="text-slate-400 text-xs mt-1">Complete export suite.</p>
                        <div className="mt-5 text-3xl font-extrabold text-emerald-400">
                            ₹549 <span className="text-xs font-normal text-slate-400">/ mo</span>
                        </div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li>✓ Everything in Basic</li>
                            <li>✓ Unlimited Sheets & Revisions</li>
                            <li>✓ Multi-Currency Quotation Export</li>
                            <li>✓ PDF & Excel Generation</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("premium")}
                        disabled={loading === "premium"}
                        className="mt-8 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50"
                    >
                        {loading === "premium" ? "Opening..." : "Pay ₹549 / Month"}
                    </button>
                </div>

                {/* Yearly ₹5,999 */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Annual Enterprise</h2>
                        <p className="text-slate-400 text-xs mt-1">Billed annually (Save ₹589).</p>
                        <div className="mt-5 text-3xl font-extrabold">
                            ₹5,999 <span className="text-xs font-normal text-slate-400">/ yr</span>
                        </div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li>✓ All Premium Features</li>
                            <li>✓ Priority Formula Customization</li>
                            <li>✓ Continuous Cloud Backup</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("yearly")}
                        disabled={loading === "yearly"}
                        className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                    >
                        {loading === "yearly" ? "Opening..." : "Pay ₹5,999 / Year"}
                    </button>
                </div>
            </div>
        </div>
    );
}