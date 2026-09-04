import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getAuthUser() {
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
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function GET() {
    const user = await getAuthUser();
    if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: members } = await supabaseAdmin
        .from("team_members")
        .select("*")
        .eq("owner_email", user.email);

    return NextResponse.json({ members: members || [] });
}

export async function POST(req: Request) {
    const user = await getAuthUser();
    if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { memberEmail } = await req.json();
    if (!memberEmail) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const { data: existing } = await supabaseAdmin
        .from("team_members")
        .select("id")
        .eq("owner_email", user.email);

    if (existing && existing.length >= 3) {
        return NextResponse.json({ error: "Maximum limit of 3 team seats reached." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("team_members").insert({
        owner_email: user.email,
        member_email: memberEmail.trim().toLowerCase(),
    });

    if (error) {
        return NextResponse.json({ error: "Email is already added or linked elsewhere." }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
    const user = await getAuthUser();
    if (!user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { memberEmail } = await req.json();
    await supabaseAdmin
        .from("team_members")
        .delete()
        .eq("owner_email", user.email)
        .eq("member_email", memberEmail);

    return NextResponse.json({ success: true });
}