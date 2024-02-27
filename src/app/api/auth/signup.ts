import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, res: NextResponse) {
  const { password, email } = await req.json();
  try {
    const user = await db.user.create({
      data: {
        password,
        email,
      },
    });
    return NextResponse.json({ data: user }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
  console.log(req.body);
}
export default handler;
