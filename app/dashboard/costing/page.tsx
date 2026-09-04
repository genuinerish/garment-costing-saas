"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ComponentRow {
    id: string;
    name: string;
    gsm: number;
    consumptionKg: number;
    ratePerKg: number;
}

export default function CostingDashboard() {
    const router = useRouter();
    const [userTier, setUserTier] = useState<string | null>(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState<string>("inactive");
    const [loading, setLoading] = useState(true);

    // Style Specs
    const [styleName, setStyleName] = useState("Crew Neck T-Shirt");
    const [garmentType, setGarmentType] = useState("Single Garment");
    const [orderQty, setOrderQty] = useState(1000);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Base Single-Garment inputs (Used for Basic & Premium)
    const [fabricGsm, setFabricGsm] = useState(180);
    const [yarnPricePerKg, setYarnPricePerKg] = useState(260);
    const [knittingCost, setKnittingCost] = useState(25);
    const [dyeingCost, setDyeingCost] = useState(70);
    const [cmCost, setCmCost] = useState(35);
    const [trimsCost, setTrimsCost] = useState(18);

    // Dynamic Component Rows (Unlocked exclusively for Premium/Yearly)
    const [customComponents, setCustomComponents] = useState<ComponentRow[]>([
        { id: "1", name: "Body Fabric (100% Cotton)", gsm: 180, consumptionKg: 0.22, ratePerKg: 355 },
        { id: "2", name: "Neck Rib (1x1 Cotton/Elastane)", gsm: 220, consumptionKg: 0.03, ratePerKg: 390 },
    ]);

    // Saved Calculations
    const [historyList, setHistoryList] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadUserData() {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok) {
                    const data = await res.json();
                    setUserTier(data.plan_tier || "none");
                    setSubscriptionStatus(data.subscription_status || "inactive");

                    // Strict Paywall: If no active subscription, redirect straight to /pricing
                    if (data.subscription_status !== "active") {
                        router.push("/pricing");
                        return;
                    }
                } else {
                    router.push("/login");
                    return;
                }
            } catch (err) {
                console.error("Auth check error", err);
            } finally {
                setLoading(false);
            }
        }

        loadUserData();
        fetchHistory();
    }, [router]);

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

    const isBasic = userTier === "basic";
    const isPremiumOrYearly = userTier === "premium" || userTier === "yearly" || userTier === "pro";

    // Calculations
    const basicCalculatedCost = (
        yarnPricePerKg * 0.22 +
        knittingCost +
        dyeingCost +
        cmCost +
        trimsCost
    ).toFixed(2);

    const dynamicComponentsTotal = customComponents.reduce(
        (acc, row) => acc + row.consumptionKg * row.ratePerKg,
        0
    );
    const premiumCalculatedCost = (
        dynamicComponentsTotal +
        cmCost +
        trimsCost
    ).toFixed(2);

    const activeTotalCost = isBasic ? basicCalculatedCost : premiumCalculatedCost;

    // Premium Row Handlers
    const handleAddRow = () => {
        const newId = Date.now().toString();
        setCustomComponents([
            ...customComponents,
            { id: newId, name: "Extra Component / Trim", gsm: 180, consumptionKg: 0.05, ratePerKg: 250 },
        ]);
    };

    const handleUpdateRow = (id: string, field: keyof ComponentRow, value: any) => {
        setCustomComponents(
            customComponents.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleRemoveRow = (id: string) => {
        setCustomComponents(customComponents.filter((item) => item.id !== id));
    };

    // Image Upload Handler
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
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
                    garmentType,
                    orderQuantity: orderQty,
                    totalCostINR: activeTotalCost,
                    costData: {
                        tier: userTier,
                        total: activeTotalCost,
                        components: isBasic ? "Standard Template" : customComponents,
                    },
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(data.error || "Save limit reached. Upgrade to Premium for unlimited saves.");
                return;
            }

            alert("Calculation saved to history!");
            fetchHistory();
        } catch (err: any) {
            alert("Error saving: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
                Validating AutoPay subscription access...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 selection:bg-emerald-500 selection:text-black">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Garment Costing Suite</h1>
                            <span
                                className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isBasic
                                        ? "bg-sky-950 text-sky-400 border border-sky-500/40"
                                        : "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                    }`}
                            >
                                {userTier} AutoPay Active
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            {isBasic
                                ? "Basic Plan Mode: Single-garment standard specification view."
                                : "Premium Plan Mode: Multi-garment dynamic specification & component view."}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {isBasic && (
                            <Link
                                href="/pricing"
                                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                Upgrade to Premium (₹499/mo)
                            </Link>
                        )}
                        <Link
                            href="/admin/clients"
                            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                        >
                            Subscription Details
                        </Link>
                    </div>
                </header>

                {/* ========================================================================= */}
                {/* MAIN BODY: CONDITIONAL UI ACCORDING TO PLAN TIER                          */}
                {/* ========================================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">

                        {/* Style Information Card */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Style Profile</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Style Name / Code</label>
                                    <input
                                        type="text"
                                        value={styleName}
                                        onChange={(e) => setStyleName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Garment Mode</label>
                                    {isBasic ? (
                                        <input
                                            type="text"
                                            disabled
                                            value="Single Garment (Fixed)"
                                            className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                                        />
                                    ) : (
                                        <select
                                            value={garmentType}
                                            onChange={(e) => setGarmentType(e.target.value)}
                                            className="w-full bg-slate-950 border border-emerald-500/40 rounded-lg px-3 py-2 text-sm text-white"
                                        >
                                            <option value="Single Garment">Single Garment</option>
                                            <option value="Tops & Bottoms Set">Tops & Bottoms Set</option>
                                            <option value="Hoodie + Jogger Co-ord">Hoodie + Jogger Co-ord</option>
                                            <option value="Innerwear 3-Pack">Innerwear 3-Pack Bundle</option>
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Order Quantity (Pcs)</label>
                                    <input
                                        type="number"
                                        value={orderQty}
                                        onChange={(e) => setOrderQty(Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                    />
                                </div>
                            </div>

                            {/* Photo Upload: Locked in Basic vs Unlocked in Premium */}
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-300 mb-2">
                                    Garment Photo & Tech Pack Reference
                                </label>
                                {isBasic ? (
                                    <div className="p-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-center">
                                        <span className="text-xl">🔒</span>
                                        <p className="text-xs font-medium text-slate-400 mt-1">Photo Upload Disabled in Basic</p>
                                        <p className="text-[11px] text-slate-500">
                                            Photo & sketch uploads are unlocked exclusively for{" "}
                                            <Link href="/pricing" className="text-emerald-400 font-semibold underline">
                                                Premium (₹499)
                                            </Link>{" "}
                                            members.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                            className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer"
                                        />
                                        {photoPreview && (
                                            <img
                                                src={photoPreview}
                                                alt="Garment Preview"
                                                className="w-14 h-14 object-cover rounded-lg border border-emerald-500/50"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Costing Engine: Standard Fixed Inputs for Basic vs Dynamic Rows for Premium */}
                        {isBasic ? (
                            /* ================= BASIC PLAN FIXED VIEW ================= */
                            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                                        Standard Costing Inputs (Basic)
                                    </h2>
                                    <span className="text-xs text-slate-500">Fixed Template</span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                                        <label className="block text-xs text-slate-400 mb-1">Knitting (₹/pc)</label>
                                        <input
                                            type="number"
                                            value={knittingCost}
                                            onChange={(e) => setKnittingCost(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Dyeing (₹/pc)</label>
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

                                <div className="pt-2 flex justify-between items-center border-t border-slate-800/80">
                                    <span className="text-xs text-slate-400">Trims & Packing Allocation (₹):</span>
                                    <input
                                        type="number"
                                        value={trimsCost}
                                        onChange={(e) => setTrimsCost(Number(e.target.value))}
                                        className="w-28 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-sm text-right text-white"
                                    />
                                </div>

                                {/* Locked Row Feature for Basic */}
                                <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <span>🔒</span> Add Extra Components & Custom Rows
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            alert("Custom components & extra rows are unlocked on Premium (₹499/mo).")
                                        }
                                        className="text-slate-500 font-semibold cursor-not-allowed"
                                    >
                                        + Add Row (Premium Only)
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* ================= PREMIUM PLAN DYNAMIC MULTI-ROW VIEW ================= */
                            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                                            Dynamic Components & Fabric Breakdown (Premium)
                                        </h2>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Add unlimited fabric parts, trims, and multi-piece bundles.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddRow}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                                    >
                                        <span>+</span>
                                        <span>Add Component Row</span>
                                    </button>
                                </div>

                                <div className="space-y-3 pt-2">
                                    {customComponents.map((row) => (
                                        <div
                                            key={row.id}
                                            className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                                        >
                                            <div className="sm:col-span-4">
                                                <label className="text-[10px] text-slate-500 block">Component / Fabric</label>
                                                <input
                                                    type="text"
                                                    value={row.name}
                                                    onChange={(e) => handleUpdateRow(row.id, "name", e.target.value)}
                                                    className="w-full bg-transparent border-b border-slate-700 py-1 text-white font-medium focus:outline-none focus:border-emerald-400"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="text-[10px] text-slate-500 block">GSM</label>
                                                <input
                                                    type="number"
                                                    value={row.gsm}
                                                    onChange={(e) => handleUpdateRow(row.id, "gsm", Number(e.target.value))}
                                                    className="w-full bg-transparent border-b border-slate-700 py-1 text-white focus:outline-none focus:border-emerald-400"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="text-[10px] text-slate-500 block">Cons. (Kg)</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={row.consumptionKg}
                                                    onChange={(e) =>
                                                        handleUpdateRow(row.id, "consumptionKg", Number(e.target.value))
                                                    }
                                                    className="w-full bg-transparent border-b border-slate-700 py-1 text-white focus:outline-none focus:border-emerald-400"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="text-[10px] text-slate-500 block">Rate / Kg (₹)</label>
                                                <input
                                                    type="number"
                                                    value={row.ratePerKg}
                                                    onChange={(e) =>
                                                        handleUpdateRow(row.id, "ratePerKg", Number(e.target.value))
                                                    }
                                                    className="w-full bg-transparent border-b border-slate-700 py-1 text-white focus:outline-none focus:border-emerald-400"
                                                />
                                            </div>
                                            <div className="sm:col-span-2 text-right">
                                                <span className="text-emerald-400 font-bold block text-xs">
                                                    ₹{(row.consumptionKg * row.ratePerKg).toFixed(2)}
                                                </span>
                                                {customComponents.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveRow(row.id)}
                                                        className="text-[10px] text-rose-400 hover:underline mt-1"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Overheads for Premium */}
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Cut & Make / CM (₹)</label>
                                        <input
                                            type="number"
                                            value={cmCost}
                                            onChange={(e) => setCmCost(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-400 mb-1">Trims, Labels & Poly (₹)</label>
                                        <input
                                            type="number"
                                            value={trimsCost}
                                            onChange={(e) => setTrimsCost(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Pricing Output & History Limits */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                Calculated Cost Per Piece
                            </span>
                            <div className="text-4xl font-black text-white">
                                ₹{activeTotalCost} <span className="text-xs text-slate-400 font-normal">/ piece</span>
                            </div>

                            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400">
                                <div className="flex justify-between">
                                    <span>Batch Total ({orderQty} pcs):</span>
                                    <span className="font-semibold text-white">
                                        ₹{(Number(activeTotalCost) * orderQty).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Active Plan:</span>
                                    <span className="text-white font-medium uppercase">{userTier}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveCalculation}
                                disabled={saving}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                            >
                                {saving ? "Saving to History..." : "Save Calculation"}
                            </button>
                        </div>

                        {/* Costing History Section */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                                    Calculation History
                                </h3>
                                <span className="text-[11px] text-slate-400">
                                    {isBasic ? `${historyList.length} / 3 used` : `${historyList.length} saved (Unlimited)`}
                                </span>
                            </div>

                            {historyList.length === 0 ? (
                                <p className="text-xs text-slate-500 py-4 text-center">No calculations saved yet.</p>
                            ) : (
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
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
                                    ⚠️ 3/3 calculation save limit reached on Basic.{" "}
                                    <Link href="/pricing" className="underline font-bold">
                                        Upgrade to Premium
                                    </Link>{" "}
                                    for unlimited saves.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}