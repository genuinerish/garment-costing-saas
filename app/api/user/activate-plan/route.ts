import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const { email, tier, subscriptionId } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Upsert user profile linked to the email submitted before payment
        const { error } = await supabaseAdmin
            .from("profiles")
            .upsert(
                {
                    email,
                    plan_tier: tier,
                    subscription_status: "active",
                    razorpay_subscription_id: subscriptionId,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "email" }
            );

        if (error) {
            console.error("Supabase upsert error:", error);
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}