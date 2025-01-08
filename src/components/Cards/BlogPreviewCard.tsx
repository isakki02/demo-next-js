import { useDeletePost } from "@/hooks/postQueries";
import { BlogCardProps } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BlogPreviewCard = ({ image, title, desc, postId }: BlogCardProps) => {
  const router = useRouter()
  const deletePostMutation = useDeletePost()

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
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-primary" onClick={() => handleEdit(postId)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(postId)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default BlogPreviewCard;