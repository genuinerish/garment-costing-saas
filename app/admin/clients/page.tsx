import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import Link from "next/link";

export default async function AdminClientsPage() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll() { },
            },
        }
    );

    const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    const totalClients = profiles?.length || 0;
    const activeSubs = profiles?.filter((p) => p.subscription_status === "active").length || 0;

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Client Subscriptions & Accounts</h1>
                        <p className="text-slate-400 text-sm mt-1">Live tracking of registered users and payments.</p>
                    </div>
                    <Link
                        href="/dashboard/costing"
                        className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm hover:bg-slate-700"
                    >
                        Costing Engine &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <span className="text-slate-400 text-xs uppercase font-medium">Total Registered Clients</span>
                        <div className="text-3xl font-bold mt-2">{totalClients}</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <span className="text-emerald-400 text-xs uppercase font-medium">Active Paid Subscriptions</span>
                        <div className="text-3xl font-bold mt-2 text-emerald-400">{activeSubs}</div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-800/60 text-slate-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Client Email</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Plan Tier</th>
                                <th className="px-6 py-4">Subscription ID</th>
                                <th className="px-6 py-4">Signed Up</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                            {profiles && profiles.length > 0 ? (
                                profiles.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-800/30">
                                        <td className="px-6 py-4 font-medium text-white">{client.email}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${client.subscription_status === "active"
                                                        ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                                        : "bg-slate-800 text-slate-400"
                                                    }`}
                                            >
                                                {client.subscription_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 uppercase font-bold text-xs text-slate-200">
                                            {client.plan_tier || "None"}
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono text-slate-500">
                                            {client.razorpay_subscription_id || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">
                                            {new Date(client.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No client records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}