import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { planType } = await req.json();

        let planId: string | undefined;

        if (planType === "basic") {
            planId = process.env.RAZORPAY_PLAN_BASIC;
        } else if (planType === "premium") {
            planId = process.env.RAZORPAY_PLAN_PREMIUM;
        } else if (planType === "yearly") {
            planId = process.env.RAZORPAY_PLAN_YEARLY;
        }

        if (!planId) {
            return NextResponse.json(
                { error: `Razorpay Plan ID not configured for tier: ${planType}` },
                { status: 400 }
            );
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            total_count: planType === "yearly" ? 5 : 12,
            quantity: 1,
            customer_notify: 1,
        });

        return NextResponse.json({
            subscriptionId: subscription.id,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}