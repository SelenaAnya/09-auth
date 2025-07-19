import { nextServer } from './api';
import {
  NewNoteData,
  Note,
  NotesResponse
} from '@/types/note';
import { AxiosResponse } from 'axios';
import { User } from '@/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag?: string
): Promise<NotesResponse> => {
  const perPage = 12;

  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search;
  }

  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const response: AxiosResponse<NotesResponse> = await nextServer.get(
    "/notes",
    {
      params,
    }
  );

  return response.data;
};

export const createNote = async (payload: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", payload);

  return response.data;
};

export const deleteNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const register = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (user: Pick<User, "username">) => {
  const { data } = await nextServer.patch<User>("/users/me", user);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

// export const login = async (data: LoginRequest) => {
//   try {
//     console.log('Attempting login with:', { 
//       baseURL: nextServer.defaults.baseURL,
//       url: '/auth/login',
//       data 
//     });
    
//     const response = await nextServer.post<User>("/auth/login", data);
//     console.log('Login successful:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Login error details:', {
//       message: error.message,
//       code: error.code,
//       config: error.config,
//       request: error.request,
//       response: error.response
//     });
//     throw error;
//   }
// };