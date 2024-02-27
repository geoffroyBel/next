import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userData = body.formData;
    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 }
      );
    }
    const duplicate = await db.user.findFirst({
      where: { email: userData.email },
    });
    if (duplicate) {
      return NextResponse.json(
        { message: "Email existe deja" },
        { status: 409 }
      );
    }
    const hashpass = await bcrypt.hash(userData.password, 10);
    userData.password = hashpass;
    await db.user.create({ data: userData });
    return NextResponse.json(
      { message: "User Created", data: userData },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
