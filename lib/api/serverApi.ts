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
  try {
    const params: FetchNotesParams = {
      page,
      perPage: 12,
      ...(query.trim() !== '' && { search: query.trim() }),
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
  } catch (error) {
    console.error('Error fetching notes (server):', error);
    throw error;
  }
}

// ✅ Fetch single note by ID (SSR)
export async function fetchNoteByIdServer(noteId: string): Promise<Note> {
  try {
    const cookieStore = cookies();

    const response = await nextServer.get<Note>(`/notes/${noteId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching note by ID (server):', error);
    throw error;
  }
}

// ✅ Check active user session (SSR)
export async function checkServerSession(): Promise<CheckSessionRes> {
  try {
    const cookieStore = cookies();

    const response = await nextServer.get<CheckSessionRes>('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Session check failed (server):', error);
    return { message: 'Session check failed', valid: false };
  }
}

// ✅ Get current user profile (SSR)
export async function getMeServer(): Promise<UserLogin | null> {
  try {
    const cookieStore = cookies();

    const response = await nextServer.get<UserLogin>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile (server):', error);
    return null;
  }
}