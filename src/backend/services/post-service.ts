import prisma from "@/lib/prisma"
import { PostProps } from "@/types/post"

const createOne = async (postDetails: PostProps) => {
  const response = await prisma?.post?.create({
    data: postDetails
  })
  return response
}

const updateOne = async (postId: string, postDetails: PostProps) => {
  const response = await prisma?.post.update({
    where: {
      id: postId,
    },
    data: postDetails
  })
  return response
}

const deleteOne = async (postId: string) => {
  const response = await prisma?.post.delete({
    where: {
      id: postId,
    }
  })
  return response
}

const getAll = async () => {
  const response = await prisma?.post.findMany({})
  return response
}

const getOne = async (postId: string) => {
  const response = await prisma?.post.findUnique({
    where: {
      id: postId
    }
  })
  return response
}

const findByAuthorId = async (userId: string) => {
  const response = await prisma?.post.findMany({
    where: {
      authorId: userId
    }
  })
  return response
}

export const PostService = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  findByAuthorId
}