import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {supabase} from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, role, email, password } = body;

    if (!email || !password || !name || !role) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("user")
        .insert([{ name, role, email, password: hashed }])
        .select()
        .single();

    if (error) return NextResponse.json({ message: error.message }, { status: 400 });

    const token = jwt.sign({ sub: data.id, email: data.email, role: data.role }, process.env.JWT_SECRET!);

    return NextResponse.json({ access_token: token });
}
