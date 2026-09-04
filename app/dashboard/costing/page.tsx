"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CostingDashboard() {
    // Plan Tier State (basic, premium, pro, yearly)
    const [userTier, setUserTier] = useState<string>("basic");

    // Costing State
    const [styleName, setStyleName] = useState("Crew Neck T-Shirt");
    const [orderQty, setOrderQty] = useState(1000);
    const [fabricGsm, setFabricGsm] = useState(180);
    const [yarnPricePerKg, setYarnPricePerKg] = useState(260);
    const [knittingCost, setKnittingCost] = useState(25);
    const [dyeingCost, setDyeingCost] = useState(70);
    const [cmCost, setCmCost] = useState(35);
    const [trimsCost, setTrimsCost] = useState(18);

    // Components / Extra rows
    const [components, setComponents] = useState([
        { name: "Main Body Fabric", gsm: 180, cost: 110 },
    ]);

    // History State
    const [historyList, setHistoryList] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);

    // Check user tier on load
    useEffect(() => {
        async function checkTier() {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    setUserTier(data.plan_tier || "basic");
                }
            } catch (err) {
                console.error("Failed to load tier", err);
            }
        }
        checkTier();
        fetchHistory();
    }, []);

    const isBasic = userTier === "basic" || userTier === "none";

    // Calculations
    const fabricCostTotal = yarnPricePerKg * 0.22 + knittingCost + dyeingCost;
    const totalGarmentCost = (fabricCostTotal + cmCost + trimsCost).toFixed(2);

    // Fetch History
    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/history");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) setHistoryList(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Save Costing
    const handleSaveCalculation = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    styleName,
                    garmentType: "T-Shirt",
                    orderQuantity: orderQty,
                    totalCostINR: totalGarmentCost,
                    costData: {
                        fabricGsm,
                        yarnPricePerKg,
                        cmCost,
                        trimsCost,
                        total: totalGarmentCost,
                    },
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Save limit reached. Upgrade to Premium for unlimited saves.");
                return;
            }

            alert("Costing saved successfully!");
            fetchHistory();
        } catch (err: any) {
            alert("Save failed: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // Add Component Row Handler (Locked on Basic)
    const handleAddComponent = () => {
        if (isBasic) {
            alert(
                "🔒 Feature Locked: Adding custom components & extra rows/columns is available only on the Premium (₹499) and Yearly plans. Please upgrade."
            );
            return;
        }
        setComponents([...components, { name: "Rib / Trim Fabric", gsm: 220, cost: 25 }]);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 selection:bg-emerald-500 selection:text-black">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Bar */}
                <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-white">Garment Costing Engine</h1>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${isBasic ? "bg-amber-950 text-amber-400 border border-amber-500/30" : "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                                }`}>
                                {userTier} Plan
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Single & Multi-Garment Costing Specification Suite</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/pricing"
                            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                        >
                            Upgrade / Manage Plan
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Calculation Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Style & Specs */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Style Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Style Name / Ref</label>
                                    <input
                                        type="text"
                                        value={styleName}
                                        onChange={(e) => setStyleName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Order Quantity (Pcs)</label>
                                    <input
                                        type="number"
                                        value={orderQty}
                                        onChange={(e) => setOrderQty(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* Photo Upload Area (Locked on Basic) */}
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Garment Photo / Tech Pack Reference
                                </label>
                                {isBasic ? (
                                    <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50 text-center">
                                        <span className="text-lg">🔒</span>
                                        <p className="text-xs font-medium text-slate-400 mt-1">Photo Upload Disabled on Basic</p>
                                        <p className="text-[11px] text-slate-500">
                                            Upgrade to <Link href="/pricing" className="text-emerald-400 underline font-semibold">Premium (₹499)</Link> to upload garment sketches & tech packs.
                                        </p>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Fabric & CM Cost Inputs */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Cost Components</h2>

                                {/* Add Component / Row Button (Locked on Basic) */}
                                {isBasic ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            alert(
                                                "🔒 Feature Locked: Adding custom components & extra rows/columns is available only on Premium (₹499) and Yearly plans."
                                            )
                                        }
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-500 text-xs font-semibold cursor-not-allowed"
                                    >
                                        <span>🔒</span>
                                        <span>+ Add Component (Premium Only)</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleAddComponent}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-colors"
                                    >
                                        <span>+</span>
                                        <span>Add Custom Component / Row</span>
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Yarn (₹ / Kg)</label>
                                    <input
                                        type="number"
                                        value={yarnPricePerKg}
                                        onChange={(e) => setYarnPricePerKg(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Knitting (₹)</label>
                                    <input
                                        type="number"
                                        value={knittingCost}
                                        onChange={(e) => setKnittingCost(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Dyeing (₹)</label>
                                    <input
                                        type="number"
                                        value={dyeingCost}
                                        onChange={(e) => setDyeingCost(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">CM / Stitching (₹)</label>
                                    <input
                                        type="number"
                                        value={cmCost}
                                        onChange={(e) => setCmCost(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Components List */}
                            <div className="pt-2 space-y-2">
                                {components.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                                        <span className="font-medium text-slate-300">{c.name}</span>
                                        <span className="text-slate-400">{c.gsm} GSM</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Total & History */}
                    <div className="space-y-6">

                        {/* Total Cost Summary Card */}
                        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-5">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Total Calculated Cost</span>
                            <div className="text-4xl font-extrabold text-white">
                                ₹{totalGarmentCost} <span className="text-xs text-slate-400 font-normal">/ piece</span>
                            </div>

                            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                                <div className="flex justify-between">
                                    <span>Order Total:</span>
                                    <span className="font-semibold text-white">₹{(Number(totalGarmentCost) * orderQty).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Mode:</span>
                                    <span className="text-slate-300">{isBasic ? "Single Garment" : "Multi-Garment Batch"}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveCalculation}
                                disabled={saving}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Calculation to History"}
                            </button>
                        </div>

                        {/* Saved Calculations History Panel */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Saved History</h3>
                                <span className="text-[11px] text-slate-400">
                                    {isBasic ? `${historyList.length} / 3 used` : `${historyList.length} saved (Unlimited)`}
                                </span>
                            </div>

                            {historyList.length === 0 ? (
                                <p className="text-xs text-slate-500 py-4 text-center">No calculations saved yet.</p>
                            ) : (
                                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                                    {historyList.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="font-semibold text-white">{item.style_name}</div>
                                                <div className="text-[10px] text-slate-500">
                                                    {new Date(item.created_at).toLocaleDateString()} • {item.order_quantity} pcs
                                                </div>
                                            </div>
                                            <div className="font-bold text-emerald-400">₹{item.total_cost_inr}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {isBasic && historyList.length >= 3 && (
                                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-300">
                                    ⚠️ 3/3 history limit reached on Basic. <Link href="/pricing" className="underline font-bold">Upgrade to Premium</Link> to save unlimited calculations.
                                </div>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}