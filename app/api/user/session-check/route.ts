import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const { clientToken } = await req.json();
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll(); },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
                        } catch { }
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !user.email) {
            return NextResponse.json({ active: false, reason: "unauthenticated" });
        }

        // 1. Fetch direct profile
        let { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();

        // 2. Check if delegated team member Gmail
        const { data: teamSeat } = await supabaseAdmin
            .from("team_members")
            .select("*")
            .eq("member_email", user.email)
            .single();

        let hasSubscription = profile?.subscription_status === "active";

        if (!hasSubscription && teamSeat) {
            const { data: ownerProfile } = await supabaseAdmin
                .from("profiles")
                .select("*")
                .eq("email", teamSeat.owner_email)
                .single();

            if (ownerProfile?.subscription_status === "active") {
                hasSubscription = true;
            }
        }

        // 3. Single concurrent session check
        if (profile?.current_session_token && clientToken && profile.current_session_token !== clientToken) {
            return NextResponse.json({ active: false, reason: "concurrent_session_terminated" });
        }

        // Update active token if empty
        if (profile && (!profile.current_session_token || profile.current_session_token !== clientToken)) {
            await supabaseAdmin
                .from("profiles")
                .update({ current_session_token: clientToken })
                .eq("email", user.email);
        }

        return NextResponse.json({
            active: true,
            hasSubscription,
            email: user.email,
            role: profile?.role || "user",
            tier: profile?.plan_tier || "premium",
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}