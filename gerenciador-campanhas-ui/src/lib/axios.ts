import { NEXT_PUBLIC_BASE_API_URL } from '@/utils/constants';
import axios from 'axios';


export default axios.create({
  baseURL: NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL: NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});