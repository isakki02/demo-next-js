import { UserProps } from "@/types/user"

const create = async (userDetails: UserProps) => {
  const user = await prisma?.user.create({
    data: userDetails
  })
  return user
}

export const UserService = {
  create
}