"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function PricingSelectionPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleAutoPaySubscribe = async (tier: "basic" | "premium" | "yearly") => {
        try {
            setLoading(tier);
            const res = await fetch("/api/razorpay/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planType: tier }),
            });

            const data = await res.json();

            if (!res.ok || !data.subscriptionId) {
                alert(data.error || "Unable to initiate AutoPay subscription. Check Netlify configuration.");
                setLoading(null);
                return;
            }

            const planNames: Record<string, string> = {
                basic: "Basic Plan AutoPay (₹299/mo)",
                premium: "Premium Plan AutoPay (₹499/mo)",
                yearly: "Yearly Enterprise AutoPay (₹6,000/yr)",
            };

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "GARCOS ENTERPRISE",
                description: `Recurring ${planNames[tier]}`,
                recurring: true,
                handler: async function (response: any) {
                    const activateRes = await fetch("/api/user/activate-plan", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            tier,
                            subscriptionId: response.razorpay_subscription_id,
                        }),
                    });

                    if (activateRes.ok) {
                        alert("AutoPay Activated Successfully! Your dashboard is unlocked.");
                        router.push("/dashboard/costing");
                    } else {
                        alert("Payment captured. Redirecting to your dashboard...");
                        router.push("/dashboard/costing");
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(null);
                    },
                },
                theme: { color: "#10b981" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Checkout error: " + err.message);
            setLoading(null);
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4 py-12">
                <div className="text-center max-w-xl mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">Select Your Subscription</h1>
                    <p className="mt-2 text-slate-400 text-sm">
                        Access requires an active subscription. AutoPay automatically renews your access each billing cycle via UPI AutoPay or Card.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    {/* Basic Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Basic Tier</h2>
                            <p className="text-slate-400 text-xs mt-1">Single garment costing engine.</p>
                            <div className="mt-5 text-3xl font-extrabold">
                                ₹299 <span className="text-xs font-normal text-slate-400">/ mo</span>
                            </div>
                            <ul className="mt-5 space-y-2 text-xs text-slate-300">
                                <li className="text-emerald-400 font-medium">✓ Single Garment Calculation Suite</li>
                                <li className="text-emerald-400 font-medium">✓ 3 Saved Costing Calculations</li>
                                <li>✓ Full Yarn, Knit, Dye & CM Formulas</li>
                                <li className="text-slate-500 line-through">✕ Photo & Tech Pack Uploads</li>
                                <li className="text-slate-500 line-through">✕ Custom Dynamic Components/Rows</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("basic")}
                            disabled={loading === "basic"}
                            className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                        >
                            {loading === "basic" ? "Connecting AutoPay..." : "Set Up AutoPay (₹299/mo)"}
                        </button>
                    </div>

                    {/* Premium Card */}
                    <div className="bg-slate-900 border-2 border-emerald-500 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xl">
                        <span className="absolute -top-3 right-5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                            Full Suite
                        </span>
                        <div>
                            <h2 className="text-lg font-bold">Premium Tier</h2>
                            <p className="text-slate-400 text-xs mt-1">Multi-garment simultaneous costing.</p>
                            <div className="mt-5 text-3xl font-extrabold text-emerald-400">
                                ₹499 <span className="text-xs font-normal text-slate-400">/ mo</span>
                            </div>
                            <ul className="mt-5 space-y-2 text-xs text-slate-300">
                                <li className="text-white font-semibold">✓ Multi-Garment Simultaneous Costing</li>
                                <li className="text-emerald-400 font-bold">✓ Unlimited Saved Costing History</li>
                                <li className="text-emerald-400 font-bold">✓ Upload Garment Tech Pack Photos</li>
                                <li className="text-emerald-400 font-bold">✓ Add Unlimited Dynamic Components & Rows</li>
                                <li>✓ Multi-Currency Quotation Calculations</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("premium")}
                            disabled={loading === "premium"}
                            className="mt-8 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                        >
                            {loading === "premium" ? "Connecting AutoPay..." : "Set Up AutoPay (₹499/mo)"}
                        </button>
                    </div>

                    {/* Yearly Card */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase">Save ₹1,188 / Yr</span>
                            <h2 className="text-lg font-bold mt-1">Yearly Enterprise</h2>
                            <p className="text-slate-400 text-xs mt-1">Full access for annual operations.</p>
                            <div className="mt-5 text-3xl font-extrabold">
                                ₹6,000 <span className="text-xs font-normal text-slate-400">/ yr</span>
                            </div>
                            <ul className="mt-5 space-y-2 text-xs text-slate-300">
                                <li className="text-white font-semibold">✓ All Premium Features Included</li>
                                <li className="text-emerald-400 font-bold">✓ Unlimited Saved History</li>
                                <li>✓ Continuous Data Backup</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("yearly")}
                            disabled={loading === "yearly"}
                            className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 disabled:opacity-50"
                        >
                            {loading === "yearly" ? "Connecting AutoPay..." : "Set Up AutoPay (₹6,000/yr)"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}