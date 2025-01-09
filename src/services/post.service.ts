import { http } from "@/lib/http-common"
import { PostProps } from "@/types/post"

async function createPost(data: PostProps) {
  return (await http.post('/posts', data))
}

async function updatePost(data: PostProps) {
  return (await http.patch(`/posts/${data.id}`, data))
}

async function deletePost(postId: string) {
  return (await http.delete(`/posts/${postId}`))
}

async function getAllPosts() {
  return (await http.get(`/posts`))?.data
}

async function getSinglePost(postId: string) {
  return (await http.get(`/posts/${postId}`))?.data
}

export const PostService = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
}