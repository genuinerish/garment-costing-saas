import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase admin client with service role key to bypass RLS for background webhooks
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature");
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // 1. Verify Razorpay webhook authenticity
        if (webhookSecret && signature) {
            const expectedSignature = crypto
                .createHmac("sha256", webhookSecret)
                .update(rawBody)
                .digest("hex");

            if (expectedSignature !== signature) {
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
            }
        }

        const event = JSON.parse(rawBody);
        const eventType = event.event;

        // 2. Handle Subscription Events
        if (
            eventType === "subscription.charged" ||
            eventType === "subscription.activated"
        ) {
            const subscription = event.payload.subscription.entity;
            const subscriptionId = subscription.id;
            const planId = subscription.plan_id;

            // Determine tier by matching plan ID
            let tier = "basic";
            if (planId === process.env.RAZORPAY_PLAN_PREMIUM) {
                tier = "premium";
            } else if (planId === process.env.RAZORPAY_PLAN_YEARLY) {
                tier = "yearly";
            }

            // Update client profile status to active
            await supabaseAdmin
                .from("profiles")
                .update({
                    subscription_status: "active",
                    plan_tier: tier,
                    razorpay_subscription_id: subscriptionId,
                })
                .eq("razorpay_subscription_id", subscriptionId);
        }

        // 3. Handle Subscription Cancellations / Failures
        if (
            eventType === "subscription.cancelled" ||
            eventType === "subscription.halted"
        ) {
            const subscription = event.payload.subscription.entity;
            const subscriptionId = subscription.id;

            await supabaseAdmin
                .from("profiles")
                .update({
                    subscription_status: "inactive",
                    plan_tier: "none",
                })
                .eq("razorpay_subscription_id", subscriptionId);
        }

        return NextResponse.json({ status: "ok" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}