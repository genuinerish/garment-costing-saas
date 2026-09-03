import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
    try {
        const { email, userId, billingCycle } = await req.json();

        const priceId =
            billingCycle === "yearly"
                ? process.env.STRIPE_PRICE_ID_YEARLY
                : process.env.STRIPE_PRICE_ID_MONTHLY;

        const session = await stripe.checkout.sessions.create({
            // Replaces payment_method_types to allow Google Pay & UPI
            automatic_payment_methods: {
                enabled: true,
            },
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            customer_email: email,
            client_reference_id: userId,
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://garcos.netlify.app"}/dashboard/costing?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://garcos.netlify.app"}/#pricing`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}