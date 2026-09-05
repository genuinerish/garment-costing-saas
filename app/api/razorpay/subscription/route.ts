import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    try {
        const { planType, email } = await req.json();

        // In a real production app, we would use env variables:
        // const razorpay = new Razorpay({
        //     key_id: process.env.RAZORPAY_KEY_ID!,
        //     key_secret: process.env.RAZORPAY_KEY_SECRET!
        // });

        // Since this is a demonstration environment, we'll return a mock subscription ID
        // so the frontend Razorpay script can successfully open the checkout modal.

        const mockSubscriptionId = "sub_" + Math.random().toString(36).substring(2, 15);

        return NextResponse.json({
            subscriptionId: mockSubscriptionId,
            key: "rzp_test_dummy_key_abc123" // Test key
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}