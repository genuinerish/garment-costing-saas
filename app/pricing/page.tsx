"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingSelectionPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (tier: "basic" | "premium" | "yearly") => {
        try {
            setLoading(tier);
            const res = await fetch("/api/razorpay/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planType: tier }),
            });

            const data = await res.json();

            if (!res.ok || !data.subscriptionId) {
                alert(data.error || "Unable to start Razorpay checkout. Check your Plan IDs in Netlify.");
                setLoading(null);
                return;
            }

            const planLabels: Record<string, string> = {
                basic: "Basic Monthly (₹299)",
                premium: "Premium Monthly (₹499)",
                yearly: "Annual Enterprise (₹6,000)",
            };

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "GARCOS ENTERPRISE",
                description: `${planLabels[tier]} Subscription`,
                handler: async function (response: any) {
                    await fetch("/api/user/activate-plan", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            tier,
                            subscriptionId: response.razorpay_subscription_id,
                        }),
                    });
                    alert("Payment verified! Access granted.");
                    router.push("/dashboard/costing");
                },
                theme: { color: "#10b981" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Checkout error: " + err.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center max-w-xl mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Activate Your Subscription</h1>
                <p className="mt-2 text-slate-400 text-sm">
                    Select your plan to unlock the calculation engine. Autopay supports Google Pay, UPI, and Cards.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {/* Basic Tier */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Basic Tier</h2>
                        <p className="text-slate-400 text-xs mt-1">Single garment calculation.</p>
                        <div className="mt-5 text-3xl font-extrabold">₹299 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li className="text-emerald-400 font-medium">✓ Single Garment Calculations</li>
                            <li className="text-emerald-400 font-medium">✓ Save Up to 3 Costing Histories</li>
                            <li>✓ Full Yarn, Knit, Dye & CM Formulas</li>
                            <li className="text-slate-500 line-through">✕ Photo & Tech Pack Upload</li>
                            <li className="text-slate-500 line-through">✕ Custom Components / Rows</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("basic")}
                        disabled={loading === "basic"}
                        className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                    >
                        {loading === "basic" ? "Loading Checkout..." : "Pay ₹299 / Month"}
                    </button>
                </div>

                {/* Premium Tier */}
                <div className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xl">
                    <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        Recommended
                    </span>
                    <div>
                        <h2 className="text-lg font-bold">Premium Tier</h2>
                        <p className="text-slate-400 text-xs mt-1">Multi-garment simultaneous costing.</p>
                        <div className="mt-5 text-3xl font-extrabold text-emerald-400">₹499 <span className="text-xs font-normal text-slate-400">/ mo</span></div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li className="text-white font-semibold">✓ Multi-Garment Costing</li>
                            <li className="text-emerald-400 font-bold">✓ Unlimited Saved History</li>
                            <li className="text-emerald-400 font-bold">✓ Photo & Sketch Uploads</li>
                            <li className="text-emerald-400 font-bold">✓ Add Custom Components / Rows</li>
                            <li>✓ Multi-Currency Quotations</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("premium")}
                        disabled={loading === "premium"}
                        className="mt-8 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50"
                    >
                        {loading === "premium" ? "Loading Checkout..." : "Pay ₹499 / Month"}
                    </button>
                </div>

                {/* Yearly Tier */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Save ₹1,188 / Yr</span>
                        <h2 className="text-lg font-bold mt-1">Yearly Enterprise</h2>
                        <p className="text-slate-400 text-xs mt-1">Annual Premium access.</p>
                        <div className="mt-5 text-3xl font-extrabold">₹6,000 <span className="text-xs font-normal text-slate-400">/ yr</span></div>
                        <ul className="mt-5 space-y-2 text-xs text-slate-300">
                            <li className="text-white font-semibold">✓ All Premium Features Included</li>
                            <li className="text-emerald-400 font-bold">✓ Unlimited Saved History</li>
                            <li>✓ Continuous Backup & Storage</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("yearly")}
                        disabled={loading === "yearly"}
                        className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                    >
                        {loading === "yearly" ? "Loading Checkout..." : "Pay ₹6,000 / Year"}
                    </button>
                </div>
            </div>
        </div>
    );
}