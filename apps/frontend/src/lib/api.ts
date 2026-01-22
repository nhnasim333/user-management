import axios from 'axios';
import { User, Role } from '@/types/user';

const API_BASE_URL = 'http://localhost:5000/api/v1';
// const API_BASE_URL = 'https://user-management-backend-chi-bay.vercel.app/api/v1';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface GetUsersParams {
  search?: string;
  role?: Role;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role?: Role;
  active?: boolean;
}

export const usersApi = {
  getUsers: async (params: GetUsersParams = {}): Promise<User[]> => {
    const { data } = await api.get<ApiResponse<User[]>>('/users', { params });
    return data.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
    return data.data;
  },

  createUser: async (userData: CreateUserInput): Promise<User> => {
    const { data } = await api.post<ApiResponse<User>>('/users', userData);
    return data.data;
  },

  toggleUserActive: async (id: string): Promise<User> => {
    const { data } = await api.patch<ApiResponse<User>>(`/users/${id}/toggle-active`);
    return data.data;
  },
};
