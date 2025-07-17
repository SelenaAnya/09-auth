"use client";

import nextServer from "./api";
import { NewNoteData, Note } from "@/types/note";
import { AuthData, UserRegister, UserLogin } from "@/types/user";

export interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNoteService> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;
  if (tag && tag !== `All`) params.tag = tag;

  const res = await nextServer.get<FetchNoteService>(`/notes`, {
    params,
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const registerUser = async (data: AuthData): Promise<UserRegister> => {
  const res = await nextServer.post<UserRegister>("/auth/register", data);
  return res.data;
};

export const login = async (data: AuthData): Promise<UserLogin> => {
  const res = await nextServer.post<UserLogin>("/auth/login", data);
  return res.data;
};

export interface CheckSessionRes {
  message: string;
  valid?: boolean;
}

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get<CheckSessionRes>("/auth/session");
    return res.status === 200;
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
};

export const getMe = async (): Promise<UserLogin> => {
  const res = await nextServer.get<UserLogin>("/users/me");
  return res.data;
};

export const logOut = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateUser = async (data: {
  username: string;
}): Promise<UserLogin> => {
  const res = await nextServer.patch<UserLogin>("/users/me", data);
  return res.data;
};