// import { cookies } from 'next/headers';
// import { Note } from '@/types/note';
// import { UserLogin } from '@/types/user';
// import { FetchNotesParams, FetchNotesResponse, CheckSessionRes } from './clientApi';
// import nextServer from './api';

// // ✅ Fetch all notes (SSR)
// export async function fetchNotesServer(
//   query: string,
//   page: number,
//   tag?: string
// ): Promise<FetchNotesResponse> {
//   try {
//     const params: FetchNotesParams = {
//       page,
//       perPage: 12,
//       ...(query.trim() !== '' && { search: query.trim() }),
//       ...(tag && tag !== 'All' && { tag }),
//     };

//     const cookieStore = cookies();

//     const response = await nextServer.get<FetchNotesResponse>('/notes', {
//       params,
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching notes (server):', error);
//     throw error;
//   }
// }

// // ✅ Fetch single note by ID (SSR)
// export async function fetchNoteByIdServer(noteId: string): Promise<Note> {
//   try {
//     const cookieStore = cookies();

//     const response = await nextServer.get<Note>(`/notes/${noteId}`, {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching note by ID (server):', error);
//     throw error;
//   }
// }

// // ✅ Check active user session (SSR)
// export async function checkServerSession(): Promise<CheckSessionRes> {
//   try {
//     const cookieStore = cookies();

//     const response = await nextServer.get<CheckSessionRes>('/auth/session', {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Session check failed (server):', error);
//     return { message: 'Session check failed', valid: false };
//   }
// }

// // ✅ Get current user profile (SSR)
// export async function getMeServer(): Promise<UserLogin | null> {
//   try {
//     const cookieStore = cookies();

//     const response = await nextServer.get<UserLogin>('/users/me', {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user profile (server):', error);
//     return null;
//   }
// }

import { nextServer } from "./api";
import { type Note } from "../../types/note";
import { cookies } from "next/headers";
import { UserLogin } from "@/types/user";

export interface NotesResponse {
    notes: Note[],
    totalPages: number,
}

type CheckSessionRequest = {
    success: boolean;
};

export type UpdateUserRequest = {
  userName?: string;
};

const perPage = 12;

export const fetchServerNotes = async (query: string, page: number, tag: string): Promise<NotesResponse> => {
    const cookieData = await cookies();
    const res = await nextServer.get<NotesResponse>("/notes", {
        params: {
            ...(tag !== "All" ? {tag: tag} : {}),
            ...(query !== "" ? {search: query} : {}),
            page,
            perPage
        },
        headers: {
            Cookie: cookieData.toString(),
        }
    })
    return res.data;
}

export const checkServerSession = async () => {
    const cookieData = await cookies();
    const res = await nextServer.get<CheckSessionRequest>('/auth/session', {
        headers: {
            Cookie: cookieData.toString(),
        }
    });
    return res;
};

export const getServMe = async () => {
    const cookieData = await cookies();
    const res = await nextServer.get<UserLogin>("/users/me", {
        headers: {
            Cookie: cookieData.toString(),
        }
    })
    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieData = await cookies();
    const res = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieData.toString(),
        }
    });
    return res.data;
}