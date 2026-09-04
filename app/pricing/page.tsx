"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/Navbar";

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
                alert(data.error || "Unable to initialize AutoPay subscription.");
                setLoading(null);
                return;
            }

            const planLabels: Record<string, string> = {
                basic: "Basic Plan AutoPay (₹299/mo)",
                premium: "Premium Plan AutoPay (₹499/mo)",
                yearly: "Yearly Enterprise AutoPay (₹6,000/yr)",
            };

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "Garment Costing Software",
                description: planLabels[tier],
                recurring: true,
                handler: async function (response: any) {
                    await fetch("/api/user/activate-plan", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            tier,
                            subscriptionId: response.razorpay_subscription_id,
                        }),
                    });
                    router.push("/dashboard/costing");
                },
                modal: {
                    ondismiss: function () {
                        setLoading(null);
                    },
                },
                theme: { color: "#059669" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Checkout error: " + err.message);
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900">Activate Your Subscription</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Access to the Garment Costing Engine requires an active recurring AutoPay subscription via UPI or Card.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {/* Basic */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Basic Tier</h2>
                            <p className="text-slate-500 text-xs mt-1">Single garment calculations.</p>
                            <div className="mt-5 text-3xl font-black text-slate-900">
                                ₹299 <span className="text-xs font-medium text-slate-500">/ mo</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                                <li className="text-emerald-700 font-semibold">✓ Single Garment Calculations</li>
                                <li className="text-emerald-700 font-semibold">✓ Save Up to 3 Calculations</li>
                                <li>✓ Full Yarn, Knit, Dye & CM Formulas</li>
                                <li className="text-slate-400 line-through">✕ Photo Uploads</li>
                                <li className="text-slate-400 line-through">✕ Custom Dynamic Rows</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("basic")}
                            disabled={loading === "basic"}
                            className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs border border-slate-300 disabled:opacity-50"
                        >
                            {loading === "basic" ? "Connecting AutoPay..." : "Set Up AutoPay (₹299/mo)"}
                        </button>
                    </div>

                    {/* Premium */}
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
                        <span className="absolute -top-3 right-5 bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                            Recommended
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Premium Tier</h2>
                            <p className="text-slate-500 text-xs mt-1">Multi-garment calculations & uploads.</p>
                            <div className="mt-5 text-3xl font-black text-emerald-600">
                                ₹499 <span className="text-xs font-medium text-slate-500">/ mo</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-800">
                                <li className="font-bold text-slate-900">✓ Multi-Garment Costing</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Saved Costings</li>
                                <li className="text-emerald-700 font-bold">✓ Garment Photo & Tech Pack Upload</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Custom Dynamic Rows</li>
                                <li>✓ Multi-Currency Conversions</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("premium")}
                            disabled={loading === "premium"}
                            className="mt-8 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs disabled:opacity-50 shadow-md shadow-emerald-600/25"
                        >
                            {loading === "premium" ? "Connecting AutoPay..." : "Set Up AutoPay (₹499/mo)"}
                        </button>
                    </div>

                    {/* Yearly */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Yearly Enterprise</h2>
                            <p className="text-slate-500 text-xs mt-1">Annual unrestricted access.</p>
                            <div className="mt-5 text-3xl font-black text-slate-900">
                                ₹6,000 <span className="text-xs font-medium text-slate-500">/ yr</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                                <li className="font-semibold text-slate-900">✓ All Premium Features</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Saved History</li>
                                <li>✓ 1-Year Price Guarantee</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAutoPaySubscribe("yearly")}
                            disabled={loading === "yearly"}
                            className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs border border-slate-300 disabled:opacity-50"
                        >
                            {loading === "yearly" ? "Connecting AutoPay..." : "Set Up AutoPay (₹6,000/yr)"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}