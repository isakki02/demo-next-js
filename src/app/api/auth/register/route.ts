import { UserService } from "@/backend/services/user-service";
import { UserProps } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json()

  try {
    if (!email || !name || !password) {
      return NextResponse.json({ success: false, message: 'Email, Name and Password are required' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const userDetails: UserProps = { email, name, password: hashedPassword }
    const createdPost = await UserService.create(userDetails);

    return NextResponse.json({ success: true, message: 'User created successfully', records: createdPost }, { status: 201 });
  } catch (error: any) {
    console.log('Error_In_Creating_User: ', error)
    return NextResponse.json({ success: false, message: error?.message || "Couldn't create user" }, { status: 500 });
  }
}