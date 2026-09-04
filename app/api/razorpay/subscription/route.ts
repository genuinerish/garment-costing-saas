import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    try {
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            return NextResponse.json(
                { error: "Razorpay credentials not configured in environment variables." },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id,
            key_secret,
        });

        const { planType } = await req.json();

        let plan_id = process.env.RAZORPAY_PLAN_BASIC;
        if (planType === "premium" || planType === "pro") {
            plan_id = process.env.RAZORPAY_PLAN_PREMIUM;
        } else if (planType === "yearly") {
            plan_id = process.env.RAZORPAY_PLAN_YEARLY;
        }

        if (!plan_id) {
            return NextResponse.json(
                { error: `Plan ID for ${planType} is missing in environment variables.` },
                { status: 400 }
            );
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id,
            total_count: planType === "yearly" ? 5 : 12,
            quantity: 1,
            customer_notify: 1,
        });

        return NextResponse.json({
            subscriptionId: subscription.id,
            key: key_id,
        });
    } catch (error: any) {
        console.error("Razorpay subscription error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create subscription" },
            { status: 500 }
        );
    }
}