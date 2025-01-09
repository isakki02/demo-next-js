import { PostService } from "@/services/post.service"
import { PostProps } from "@/types/post"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (postDetails: PostProps) => PostService.createPost(postDetails)
  })
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: (postDetails: PostProps) => PostService.updatePost(postDetails)
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (postId: string) => PostService.deletePost(postId),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({ queryKey: ['get-all-posts'] })
      }
    }
  })
}

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['get-all-posts'],
    queryFn: () => PostService.getAllPosts(),
    refetchOnWindowFocus: false,
  })
}

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => PostService.getSinglePost(postId),
    refetchOnWindowFocus: false,
    enabled: !!postId
  })
}

