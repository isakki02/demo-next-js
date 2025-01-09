import { useDeletePost } from "@/hooks/postQueries";
import { useUserData } from "@/hooks/userQueries";
import { BlogCardProps } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogPreviewCard = ({ image, title, desc, postId, authorId }: BlogCardProps) => {
  const router = useRouter()
  const deletePostMutation = useDeletePost()
  const userData = useUserData()
  const userId = userData.data?.records?.userId

  const handleEdit = (postId: string) => {
    router.push(`/edit-blog/${postId}`)
  }

  const handleDelete = (postId: string) => {
    deletePostMutation.mutate(postId)
  }

  return (
    <div className="card" style={{ width: '18rem' }}>
      <Image src={image} className="card-img-top" alt="blog-img" height={200} width={400} />
      <div className="card-body">
        <h4>{title}</h4>
        <p className="card-text">{desc}</p>
        {userId === authorId && <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary" onClick={() => handleEdit(postId)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(postId)}>Delete</button>
        </div>}
      </div>
    </div>
  )
}

export default BlogPreviewCard;