"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Navbar from "@/components/Navbar";

export default function PricingSelectionPage() {
    const router = useRouter();
    const [selectedTier, setSelectedTier] = useState<"basic" | "premium" | "yearly" | null>(null);
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openCheckoutModal = (tier: "basic" | "premium" | "yearly") => {
        setSelectedTier(tier);
        setModalOpen(true);
    };

    const handleStartAutoPay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientEmail || !selectedTier) {
            alert("Please enter a valid email address to associate with your subscription.");
            return;
        }

        try {
            setLoading(true);

            // Create subscription schedule
            const res = await fetch("/api/razorpay/subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    planType: selectedTier,
                    email: clientEmail,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.subscriptionId) {
                alert(data.error || "Unable to initiate AutoPay subscription. Check credentials.");
                setLoading(false);
                return;
            }

            const planLabels: Record<string, string> = {
                basic: "Basic Plan (₹299/mo)",
                premium: "Premium Plan (₹499/mo)",
                yearly: "Yearly Enterprise (₹6,000/yr)",
            };

            const options = {
                key: data.key,
                subscription_id: data.subscriptionId,
                name: "Garment Costing Software",
                description: `AutoPay Mandate: ${planLabels[selectedTier]}`,
                prefill: {
                    email: clientEmail,
                    contact: clientPhone || undefined,
                },
                handler: async function (response: any) {
                    await fetch("/api/user/activate-plan", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: clientEmail,
                            tier: selectedTier,
                            subscriptionId: response.razorpay_subscription_id,
                        }),
                    });
                    setModalOpen(false);
                    router.push("/dashboard/costing");
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },
                theme: { color: "#059669" },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert("Checkout error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900">Select Subscription Plan</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Choose your billing preference. Enter your details right before payment to activate recurring AutoPay.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {/* Basic Tier */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Basic Plan</h2>
                            <p className="text-slate-500 text-xs mt-1">Single garment calculations.</p>
                            <div className="mt-5 text-3xl font-black text-slate-900">
                                ₹299 <span className="text-xs font-medium text-slate-500">/ mo</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                                <li className="text-emerald-700 font-semibold">✓ Single Garment Calculations</li>
                                <li className="text-emerald-700 font-semibold">✓ Save Up to 3 Calculations</li>
                                <li>✓ Full Yarn, Knit, Dye & CM Formulas</li>
                                <li className="text-slate-400 line-through">✕ Photo & Tech Pack Upload</li>
                                <li className="text-slate-400 line-through">✕ Custom Dynamic Rows</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openCheckoutModal("basic")}
                            className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs border border-slate-300 transition-colors"
                        >
                            Continue with Basic (₹299/mo)
                        </button>
                    </div>

                    {/* Premium Tier */}
                    <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
                        <span className="absolute -top-3 right-5 bg-emerald-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                            Recommended
                        </span>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Premium Plan</h2>
                            <p className="text-slate-500 text-xs mt-1">Multi-garment calculations & uploads.</p>
                            <div className="mt-5 text-3xl font-black text-emerald-600">
                                ₹499 <span className="text-xs font-medium text-slate-500">/ mo</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-800">
                                <li className="font-bold text-slate-900">✓ Multi-Garment Costing</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Saved Calculations</li>
                                <li className="text-emerald-700 font-bold">✓ Garment Tech Pack Photos</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Custom Dynamic Rows</li>
                                <li>✓ Multi-Currency Conversions</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openCheckoutModal("premium")}
                            className="mt-8 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 transition-colors"
                        >
                            Continue with Premium (₹499/mo)
                        </button>
                    </div>

                    {/* Yearly Tier */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Yearly Enterprise</h2>
                            <p className="text-slate-500 text-xs mt-1">Full access for annual operations.</p>
                            <div className="mt-5 text-3xl font-black text-slate-900">
                                ₹6,000 <span className="text-xs font-medium text-slate-500">/ yr</span>
                            </div>
                            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                                <li className="font-semibold text-slate-900">✓ All Premium Features Included</li>
                                <li className="text-emerald-700 font-bold">✓ Unlimited Saved Calculations</li>
                                <li>✓ 1-Year Locked Price Guarantee</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => openCheckoutModal("yearly")}
                            className="mt-8 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs border border-slate-300 transition-colors"
                        >
                            Continue with Yearly (₹6,000/yr)
                        </button>
                    </div>
                </div>

                {/* Step-Before-Payment Details Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">Account Details</h3>
                                    <p className="text-xs text-slate-500">Provide your contact info to link your subscription.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleStartAutoPay} className="space-y-4 text-left">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="merchandiser@company.com"
                                        value={clientEmail}
                                        onChange={(e) => setClientEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">Your invoice and login link will be sent here.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Phone Number (for UPI AutoPay / SMS)
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="9876543210"
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                                    />
                                </div>

                                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                                    <span>Selected Tier:</span>
                                    <span className="font-bold uppercase tracking-wider">{selectedTier} Plan</span>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(false)}
                                        className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Opening Gateway..." : "Proceed to AutoPay ➔"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}