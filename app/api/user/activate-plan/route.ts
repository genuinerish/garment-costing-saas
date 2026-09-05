import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    try {
        const { email, tier, subscriptionId } = await req.json();
        const supabase = await createClient();

        // Update the user's tier in auth metadata or a separate profile table
        // For demonstration, we simply return success. If they are logged in, we update user_metadata.
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            await supabase.auth.updateUser({
                data: {
                    plan_tier: tier,
                    subscription_id: subscriptionId,
                }
            });
        }

        return NextResponse.json({ success: true, tier });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}