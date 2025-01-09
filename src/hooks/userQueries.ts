import { UserService } from "@/services/user.service"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useLogin = () => {
  return useMutation({
    mutationFn: (userDetails: any) => UserService.login(userDetails)
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (userDetails: any) => UserService.register(userDetails)
  })
}

export const useUserData = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => UserService.getUser(),
    refetchOnWindowFocus: false,
  })
}

