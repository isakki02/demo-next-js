'use client'

import PostForm from "@/components/Forms/PostForm";
import { useGetSinglePost } from "@/hooks/postQueries";
import { PostProps } from "@/types/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditBlog = () => {
  const params = useParams()
  const { postId } = params
  const getSinglePostQuery = useGetSinglePost(postId as string)

  const [postDetails, setPostDetails] = useState<PostProps>({
    id: '',
    title: '',
    desc: '',
    authorId: ''
  })

  useEffect(() => {
    if (getSinglePostQuery?.data?.records) {
      setPostDetails(getSinglePostQuery?.data?.records)
    }
  }, [getSinglePostQuery])

  return (
    <div className="my-5">
      <PostForm header="Edit Blog Post" postDetails={postDetails} />
    </div>
  );
};

export default EditBlog;
