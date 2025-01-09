import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Resolve the cookies Promise
  const cookieStore = await cookies();
  const { value: token } = cookieStore.get("Access_Token") || {};

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const secret = process.env.JWT_SECRET || '$2a$10$CwTycUXWue0Thq9StjUM0u';

  try {
    // Verify and decode the JWT token
    const decoded = verify(token, secret);

    // Destructure properties from the decoded payload
    const { userId, exp } = decoded as { userId: string; exp: number };
    const currentUser = { message: "Token verified successfully!", user: { userId, exp } };

    return NextResponse.json({ message: "Token verified successfully", records: currentUser }, { status: 400 });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  }
}
