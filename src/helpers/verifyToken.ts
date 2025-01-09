import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyToken() {
  // Resolve the cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("Access_Token")?.value;

  if (!token) {
    return { message: "Access token not found", status: 401 };
  }
  const secret = process.env.JWT_SECRET || '$2a$10$CwTycUXWue0Thq9StjUM0u';

  try {
    // Verify and decode the JWT token
    const decoded = verify(token, secret);

    // Destructure properties from the decoded payload
    const { userId, exp } = decoded as { userId: string; exp: number };
    const currentUser = { userId, exp };

    return { message: "Token verified successfully", records: currentUser, status: 200 };
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return { message: "Something went wrong", status: 400 };
  }
}
