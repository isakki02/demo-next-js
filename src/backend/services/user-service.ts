import prisma from '@/lib/prisma'
import { UserProps } from "@/types/user"

const create = async (userDetails: UserProps) => {
  const user = await prisma?.user?.create({
    data: userDetails
  })
  return user
}

const findByEmail = async (email: string) => {
  const user = await prisma?.user.findFirst({
    where: {
      email
    }
  })
  return user
}

export const UserService = {
  create,
  findByEmail
}