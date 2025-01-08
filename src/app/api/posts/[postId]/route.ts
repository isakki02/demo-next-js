import { NextRequest, NextResponse } from 'next/server';
import { PostService } from '@/backend/services/post-service';
import { PostProps } from '@/types/post';

export async function PATCH(req: NextRequest, { params }: { params: { postId: string } }) {
  const { title, desc, authorId } = await req.json()
  const { postId } = params;

  try {
    if (!postId) {
      return NextResponse.json({ success: false, message: 'Post Id is required' }, { status: 400 });
    }
    if (!authorId) {
      return NextResponse.json({ success: false, message: 'Author Id is required' }, { status: 400 });
    }
    if (!title || !desc) {
      return NextResponse.json({ success: false, message: 'Title and Description are required' }, { status: 400 });
    }

    const postDetails: PostProps = { title, desc, authorId }
    const updatedPost = await PostService.updateOne(postId, postDetails);

    return NextResponse.json({ success: true, message: 'Post updated successfully', records: updatedPost }, { status: 201 });
  } catch (error: any) {
    console.log('Error_In_Updating_Post: ', error)
    return NextResponse.json({ success: false, message: error?.message || "Couldn't update post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { postId } = params;
    if (!postId) {
      return NextResponse.json({ success: false, message: 'Post Id is required' }, { status: 400 });
    }

    const postDetails = await PostService.getOne(postId);
    if (!postDetails) {
      return NextResponse.json({ success: false, message: 'Post not found', records: null }, { status: 404 });
    } 

    const deletedPost = await PostService.deleteOne(postId)
    return NextResponse.json({ success: true, message: 'Post deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Couldn't delete the post" }, { status: 500 });
  }
}


export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const { postId } = params;
    if (!postId) {
      return NextResponse.json({ success: false, message: 'Post Id is required' }, { status: 400 });
    }

    const postDetails = await PostService.getOne(postId);
    if (!postDetails) {
      return NextResponse.json({ success: false, message: 'Post not found', records: null }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post fetched successfully', records: postDetails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || "Couldn't fetch the post" }, { status: 500 });
  }
}
