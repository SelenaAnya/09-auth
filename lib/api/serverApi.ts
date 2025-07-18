import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { UserLogin } from '@/types/user';
import { FetchNotesParams, FetchNotesResponse, CheckSessionRes } from './clientApi';
import nextServer from './api';

// ✅ Fetch all notes (SSR)
export async function fetchNotesServer(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = {
    ...(query.trim() !== '' && { search: query.trim() }),
    page,
    perPage: 12,
    ...(tag && tag !== 'All' && { tag }),
  };

  const cookieStore = cookies();

  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

// ✅ Fetch single note by ID (SSR)
export async function fetchNoteByIdServer(noteId: string): Promise<Note> {
  const cookieStore = cookies();

  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

// ✅ Check active user session (SSR)
export async function checkServerSession(): Promise<CheckSessionRes> {
  const cookieStore = cookies();

  const response = await nextServer.get<CheckSessionRes>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

// ✅ Get current user profile (SSR)
export async function getMeServer(): Promise<UserLogin> {
  const cookieStore = cookies();

  const response = await nextServer.get<UserLogin>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}