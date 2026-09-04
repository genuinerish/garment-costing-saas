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
    const [loadingUser, setLoadingUser] = useState(true);

    // Style Details
    const [styleName, setStyleName] = useState("Crew Neck 180 GSM");
    const [garmentType, setGarmentType] = useState("Single Garment");
    const [orderQty, setOrderQty] = useState(1000);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Single-Garment Base Inputs
    const [yarnPricePerKg, setYarnPricePerKg] = useState(260);
    const [knittingCost, setKnittingCost] = useState(25);
    const [dyeingCost, setDyeingCost] = useState(70);
    const [cmCost, setCmCost] = useState(35);
    const [trimsCost, setTrimsCost] = useState(18);

    // Premium Dynamic Rows
    const [customComponents, setCustomComponents] = useState<ComponentRow[]>([
        { id: "1", name: "Main Body Fabric", gsm: 180, consumptionKg: 0.22, ratePerKg: 355 },
        { id: "2", name: "Neck Rib (1x1 Cotton)", gsm: 220, consumptionKg: 0.03, ratePerKg: 390 },
    ]);

    const [historyList, setHistoryList] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function init() {
            try {
                const res = await fetch("/api/user/me");
                if (!res.ok) {
                    router.replace("/login");
                    return;
                }

                const data = await res.json();
                if (data.subscription_status !== "active") {
                    router.replace("/pricing");
                    return;
                }

                setUserTier(data.plan_tier || "basic");
                setLoadingUser(false);
                fetchHistory();
            } catch (err) {
                router.replace("/login");
            }
        }
        init();
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

    // Premium Actions
    const handleAddRow = () => {
        setCustomComponents([
            ...customComponents,
            { id: Date.now().toString(), name: "Extra Fabric / Trim", gsm: 180, consumptionKg: 0.05, ratePerKg: 280 },
        ]);
    };

    const handleUpdateRow = (id: string, field: keyof ComponentRow, val: any) => {
        setCustomComponents(
            customComponents.map((item) => (item.id === id ? { ...item, [field]: val } : item))
        );
    };

    const handleRemoveRow = (id: string) => {
        setCustomComponents(customComponents.filter((item) => item.id !== id));
    };

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
            alert("Error: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // Prevents the millisecond UI flash while authenticating
    if (loadingUser) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-semibold text-slate-500">Loading Garment Costing Engine...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* Light Emerald Top Bar */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-bold">
                            🧵
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Garment Costing Engine</h1>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isBasic ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    }`}>
                                    {userTier} Active
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-500">
                                {isBasic ? "Basic Mode: Single garment specification" : "Premium Mode: Dynamic multi-component specification"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isBasic && (
                            <Link
                                href="/pricing"
                                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm"
                            >
                                Upgrade to Premium (₹499)
                            </Link>
                        )}
                        <Link
                            href="/admin/clients"
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
                        >
                            Client History
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Calculation Grid */}
            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Costing Inputs (Left 2 Cols) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Style Details */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Style Specification</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Style Name / Ref</label>
                                <input
                                    type="text"
                                    value={styleName}
                                    onChange={(e) => setStyleName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Garment Mode</label>
                                {isBasic ? (
                                    <input
                                        type="text"
                                        disabled
                                        value="Single Garment (Fixed)"
                                        className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
                                    />
                                ) : (
                                    <select
                                        value={garmentType}
                                        onChange={(e) => setGarmentType(e.target.value)}
                                        className="w-full bg-slate-50 border border-emerald-400 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    >
                                        <option value="Single Garment">Single Garment</option>
                                        <option value="Tops & Bottoms Set">Tops & Bottoms Set</option>
                                        <option value="Hoodie & Jogger Set">Hoodie & Jogger Set</option>
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">Order Quantity (Pcs)</label>
                                <input
                                    type="number"
                                    value={orderQty}
                                    onChange={(e) => setOrderQty(Number(e.target.value))}
                                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Photo Upload Area */}
                        <div className="pt-2">
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Garment Tech Pack / Photo</label>
                            {isBasic ? (
                                <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                                    <span className="text-lg">🔒</span>
                                    <p className="text-xs font-semibold text-slate-600 mt-1">Photo Uploads Disabled on Basic</p>
                                    <p className="text-[11px] text-slate-500">
                                        Upgrade to <Link href="/pricing" className="text-emerald-600 font-bold underline">Premium (₹499)</Link> to attach tech pack images.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                                        }}
                                        className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                                    />
                                    {photoPreview && (
                                        <img src={photoPreview} alt="Preview" className="w-12 h-12 rounded object-cover border border-emerald-400" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Breakdown */}
                    {isBasic ? (
                        /* Basic Standard Table */
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Standard Cost Breakdown (Basic)</h2>
                                <span className="text-[11px] text-slate-400">Fixed Template</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Yarn (₹ / Kg)</label>
                                    <input
                                        type="number"
                                        value={yarnPricePerKg}
                                        onChange={(e) => setYarnPricePerKg(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Knitting (₹/pc)</label>
                                    <input
                                        type="number"
                                        value={knittingCost}
                                        onChange={(e) => setKnittingCost(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Dyeing (₹/pc)</label>
                                    <input
                                        type="number"
                                        value={dyeingCost}
                                        onChange={(e) => setDyeingCost(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">CM / Stitching (₹)</label>
                                    <input
                                        type="number"
                                        value={cmCost}
                                        onChange={(e) => setCmCost(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                                <span className="text-xs font-semibold text-slate-600">Trims & Packing Allocation (₹):</span>
                                <input
                                    type="number"
                                    value={trimsCost}
                                    onChange={(e) => setTrimsCost(Number(e.target.value))}
                                    className="w-28 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1 text-sm text-right text-slate-900"
                                />
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-500">
                                <span>🔒 Dynamic extra rows & custom parts</span>
                                <button
                                    type="button"
                                    onClick={() => alert("Custom components are unlocked on Premium (₹499).")}
                                    className="font-semibold text-slate-400 cursor-not-allowed"
                                >
                                    + Add Row (Premium Only)
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Premium Dynamic Rows */
                        <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                                        Dynamic Fabric & Component Breakdown (Premium)
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Itemize multi-fabric garments and custom trims.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddRow}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                                >
                                    + Add Row
                                </button>
                            </div>

                            <div className="space-y-3 pt-2">
                                {customComponents.map((row) => (
                                    <div
                                        key={row.id}
                                        className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                                    >
                                        <div className="sm:col-span-4">
                                            <label className="text-[10px] text-slate-500 block">Component / Fabric</label>
                                            <input
                                                type="text"
                                                value={row.name}
                                                onChange={(e) => handleUpdateRow(row.id, "name", e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900 font-medium"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-[10px] text-slate-500 block">GSM</label>
                                            <input
                                                type="number"
                                                value={row.gsm}
                                                onChange={(e) => handleUpdateRow(row.id, "gsm", Number(e.target.value))}
                                                className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-[10px] text-slate-500 block">Cons. (Kg)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={row.consumptionKg}
                                                onChange={(e) => handleUpdateRow(row.id, "consumptionKg", Number(e.target.value))}
                                                className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="text-[10px] text-slate-500 block">Rate / Kg (₹)</label>
                                            <input
                                                type="number"
                                                value={row.ratePerKg}
                                                onChange={(e) => handleUpdateRow(row.id, "ratePerKg", Number(e.target.value))}
                                                className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-900"
                                            />
                                        </div>
                                        <div className="sm:col-span-2 text-right">
                                            <span className="text-emerald-700 font-bold block text-xs">
                                                ₹{(row.consumptionKg * row.ratePerKg).toFixed(2)}
                                            </span>
                                            {customComponents.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveRow(row.id)}
                                                    className="text-[10px] text-rose-500 hover:underline mt-1"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Cut & Make / CM (₹)</label>
                                    <input
                                        type="number"
                                        value={cmCost}
                                        onChange={(e) => setCmCost(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-600 mb-1">Trims & Packing (₹)</label>
                                    <input
                                        type="number"
                                        value={trimsCost}
                                        onChange={(e) => setTrimsCost(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Output Card */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-emerald-500/50 rounded-2xl p-6 shadow-md space-y-4">
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                            Total Calculated Cost
                        </span>
                        <div className="text-4xl font-black text-slate-900">
                            ₹{activeTotalCost} <span className="text-xs font-medium text-slate-500">/ pc</span>
                        </div>

                        <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                            <div className="flex justify-between">
                                <span>Order Total ({orderQty} pcs):</span>
                                <span className="font-bold text-slate-900">
                                    ₹{(Number(activeTotalCost) * orderQty).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Active Plan:</span>
                                <span className="font-bold text-emerald-700 uppercase">{userTier}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSaveCalculation}
                            disabled={saving}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Calculation"}
                        </button>
                    </div>

                    {/* History Panel */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Saved History</h3>
                            <span className="text-[11px] text-slate-500">
                                {isBasic ? `${historyList.length} / 3 used` : `${historyList.length} saved (Unlimited)`}
                            </span>
                        </div>

                        {historyList.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">No calculations saved yet.</p>
                        ) : (
                            <div className="space-y-2 max-h-56 overflow-y-auto">
                                {historyList.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="font-semibold text-slate-900">{item.style_name}</div>
                                            <div className="text-[10px] text-slate-500">
                                                {new Date(item.created_at).toLocaleDateString()} • {item.order_quantity} pcs
                                            </div>
                                        </div>
                                        <div className="font-bold text-emerald-700">₹{item.total_cost_inr}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isBasic && historyList.length >= 3 && (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                                ⚠️ 3/3 calculation limit reached.{" "}
                                <Link href="/pricing" className="underline font-bold text-amber-900">
                                    Upgrade to Premium
                                </Link>{" "}
                                to save unlimited calculations.
                            </div>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}