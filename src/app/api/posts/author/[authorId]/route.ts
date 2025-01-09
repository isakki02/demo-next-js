import { PostService } from "@/backend/services/post-service";
import { verifyToken } from "@/helpers/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { authorId: string } }) {
  try {
    const { authorId } = params;
    if (!authorId) {
      return NextResponse.json({ success: false, message: 'Post Id is required' }, { status: 400 });
    }

    const checkCurrentUser = await verifyToken()
    if(authorId !== checkCurrentUser.records?.userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized', records: null }, { status: 400 });
    }

    const postDetails = await PostService.findByAuthorId(authorId);
    if (!postDetails) {
      return NextResponse.json({ success: false, message: 'Post not found', records: null }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post fetched successfully', records: postDetails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Couldn't fetch the post" }, { status: 500 });
  }
}