import axios from 'axios'

export const getBaseAppUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
export const getBaseApiUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api`;

export const http = axios.create({
  baseURL: getBaseApiUrl,
  headers: {
    'Content-type': 'application/json',
  },
})
