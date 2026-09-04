"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planType: "monthly" | "yearly") => {
        try {
            setLoading(planType);
            const res = await fetch("/api/razorpay/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planType }),
            });

            const data = await res.json();

            if (!res.ok || !data.subscriptionId) {
                alert(data.error || "Subscription initialization failed. Check your keys.");
                setLoading(null);
                return;
            }

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "GARCOS ENTERPRISE",
                description: `${planType === "yearly" ? "Annual (₹3,000)" : "Monthly (₹299)"} Subscription`,
                handler: function () {
                    alert("Payment Successful! Access Granted.");
                    router.push("/dashboard/costing");
                },
                theme: {
                    color: "#10b981",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 py-12">
            <div className="text-center max-w-xl">
                <h1 className="text-3xl font-bold tracking-tight">Select a Subscription to Unlock Garcos</h1>
                <p className="mt-2 text-slate-400 text-sm">
                    Activate your subscription via Google Pay, UPI AutoPay, or Card to access the full garment costing suite.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
                {/* Monthly Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Monthly Plan</h2>
                        <p className="text-slate-400 text-xs mt-1">Billed monthly. Cancel anytime.</p>
                        <div className="mt-6 text-4xl font-extrabold">
                            ₹299 <span className="text-sm font-normal text-slate-400">/ mo</span>
                        </div>
                        <ul className="mt-6 space-y-2 text-sm text-slate-300">
                            <li>✓ Complete Costing Engine</li>
                            <li>✓ All Fabric & Trim Calculations</li>
                            <li>✓ Export Quotation Sheets</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("monthly")}
                        disabled={loading === "monthly"}
                        className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 disabled:opacity-50"
                    >
                        {loading === "monthly" ? "Opening Razorpay..." : "Subscribe for ₹299/mo"}
                    </button>
                </div>

                {/* Yearly Card */}
                <div className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xl">
                    <span className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Best Value
                    </span>
                    <div>
                        <h2 className="text-xl font-bold">Annual Plan</h2>
                        <p className="text-slate-400 text-xs mt-1">Billed once a year.</p>
                        <div className="mt-6 text-4xl font-extrabold">
                            ₹3,000 <span className="text-sm font-normal text-slate-400">/ yr</span>
                        </div>
                        <p className="text-xs text-emerald-400 mt-1">Equivalent to ₹250 / month</p>
                        <ul className="mt-6 space-y-2 text-sm text-slate-300">
                            <li>✓ Everything in Monthly</li>
                            <li>✓ Unlimited Revisions & Exports</li>
                            <li>✓ Continuous Backup</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => handleSubscribe("yearly")}
                        disabled={loading === "yearly"}
                        className="mt-8 w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-sm disabled:opacity-50"
                    >
                        {loading === "yearly" ? "Opening Razorpay..." : "Subscribe for ₹3,000/yr"}
                    </button>
                </div>
            </div>
        </div>
    );
}