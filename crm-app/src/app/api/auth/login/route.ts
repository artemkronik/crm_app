import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {supabase} from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) return NextResponse.json({ message: "User not found" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Wrong password" }, { status: 401 });

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!);

    return NextResponse.json({ access_token: token });
}
