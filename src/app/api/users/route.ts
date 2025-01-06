import { UserService } from "@/backend/services/user-service";
import { UserProps } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()

  try {
    if (!email || !name) {
      return NextResponse.json({ success: false, message: 'Email and Name are required' }, { status: 400 });
    }

    const userDetails: UserProps = { email, name }
    const createdPost = await UserService.create(userDetails);

    return NextResponse.json({ success: true, message: 'User created successfully', records: createdPost }, { status: 201 });
  } catch (error: any) {
    console.log('Error_In_Creating_User: ', error)
    return NextResponse.json({ success: false, message: error?.message || "Couldn't create user" }, { status: 500 });
  }
}