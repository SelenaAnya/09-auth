'use client';

import { nextServer } from './api';
import { NewNoteData, Note } from '@/types/note';
import { AuthData, UserLogin } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  email: string;
  username: string;
};

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface CheckSessionRes {
  message: string;
  valid?: boolean;
}

// 📝 Notes API (CSR)
export const fetchNotes = async (
  query: string,
  page: number,
  tag: string
): Promise<FetchNotesResponse> => {
    const res = await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            ...(tag !== "All" ? {tag: tag} : {}),
            ...(query !== "" ? {search: query} : {}),
            page,
            perPage: 12,
        }
    })
    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    const res = await nextServer.post<Note>('/notes', noteData);
    return res.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// 👤 User Auth (CSR)
export const registerUser = async (data: RegisterRequest) => {
  const res = await nextServer.post<UserLogin>('/auth/register', data);
  return res.data;
};  
  // catch (error) {
  //   console.error('Error registering user:', error);
  //   throw error;
  // }


export const loginUser = async (data: AuthData): Promise<UserLogin> => {
  try {
    const res = await nextServer.post<UserLogin>('/auth/login', data);
    return res.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post('/auth/logout');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getMe = async (): Promise<UserLogin> => {
  try {
    const res = await nextServer.get<UserLogin>('/users/me');
    return res.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUser = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<UserLogin>('/users/me', payload);
  return res.data;
}; 

// 🔐 Session check
export const checkSession = async (): Promise<UserLogin | null> => {
  try {
    const res = await nextServer.get<UserLogin>('/auth/session');
    return res.data;
  } catch (error) {
    console.error('Session check failed:', error);
    return null;
  }
};