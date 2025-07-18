'use client';

import nextServer from './api';
import { NewNoteData, Note } from '@/types/note';
import { AuthData, UserLogin, UserRegister } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query.trim();
  if (tag && tag !== 'All') params.tag = tag;

  const res = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

// 👤 User Auth (CSR)
export const registerUser = async (data: AuthData): Promise<UserRegister> => {
  const res = await nextServer.post<UserRegister>('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: AuthData): Promise<UserLogin> => {
  const res = await nextServer.post<UserLogin>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const getMe = async (): Promise<UserLogin> => {
  const res = await nextServer.get<UserLogin>('/users/me');
  return res.data;
};

export const updateUser = async (data: { username: string }): Promise<UserLogin> => {
  const res = await nextServer.patch<UserLogin>('/users/me', data);
  return res.data;
};

// 🔐 Session check
export const checkSessionClient = async (): Promise<UserLogin | null> => {
  try {
    const res = await nextServer.get<UserLogin>('/auth/session');
    return res.data;
  } catch {
    return null;
  }
};