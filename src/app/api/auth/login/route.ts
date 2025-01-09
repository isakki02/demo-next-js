import { UserService } from "@/backend/services/user-service";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and Password are required" }, { status: 400 });
    }

    // Find user by email
    const user = await UserService.findByEmail(email);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid Email or Password" }, { status: 401 });
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || '$2a$10$CwTycUXWue0Thq9StjUM0u'
    const token = sign({ userId: user.id }, secret, { expiresIn: MAX_AGE });

    // Serialize the token into a cookie
    const serializedCookie = serialize("Access_Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "User authenticated!", records: user }, { status: 200, headers: { "Set-Cookie": serializedCookie } });
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
