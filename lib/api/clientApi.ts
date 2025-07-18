'use client';

import nextServer from './api';
import { NewNoteData, Note } from '@/types/note';
import { AuthData, UserLogin, UserRegister } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
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
  page = 1,
  query = '',
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  try {
    const params: FetchNotesParams = { page, perPage };
    if (query.trim()) params.search = query.trim();
    if (tag && tag !== 'All') params.tag = tag;

    const res = await nextServer.get<FetchNotesResponse>('/notes', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

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
export const registerUser = async (data: AuthData): Promise<UserRegister> => {
  
    const res = await nextServer.post<UserRegister>('/auth/register', data);
    return res.data;
  
  // catch (error) {
  //   console.error('Error registering user:', error);
  //   throw error;
  // }
};

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

export const updateUser = async (data: { username: string }): Promise<UserLogin> => {
  try {
    const res = await nextServer.patch<UserLogin>('/users/me', data);
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
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