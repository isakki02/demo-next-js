import { http } from "@/lib/http-common";

async function login(data: any) {
  return (await http.post(`/auth/login`, data))
}

async function register(data: any) {
  return (await http.post(`/auth/register`, data))
}

async function getUser() {
  return (await http.get(`/auth/me`))?.data
}

export const UserService = {
  login,
  register,
  getUser,
}