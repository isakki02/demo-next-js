import { PostProps } from '@/types/post';
import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/backend/services/post-service';

export async function POST(req: NextRequest) {
  const { title, desc, authorId } = await req.json()

  try {
    if (!authorId) {
      return NextResponse.json({ success: false, message: 'Author Id is required' }, { status: 400 });
    }
    if (!title || !desc) {
      return NextResponse.json({ success: false, message: 'Title and Description are required' }, { status: 400 });
    }

    const postDetails: PostProps = { title, desc, authorId }
    const createdPost = await PostService.createOne(postDetails);

    return NextResponse.json({ success: true, message: 'Post created successfully', records: createdPost }, { status: 201 });
  } catch (error: any) {
    console.log('Error_In_Creating_Post: ', error)
    return NextResponse.json({ success: false, message: error?.message || "Couldn't create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const postDetails = await PostService?.getAll();
    if (!postDetails) {
      return NextResponse.json({ success: false, message: 'No posts found', records: [] }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'All posts fetched successfully', records: postDetails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Couldn't fetch all posts" }, { status: 500 });
  }
}
