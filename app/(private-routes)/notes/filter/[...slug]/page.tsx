import { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchServerNotes, NotesResponse } from "@/lib/api/serverApi";
type Props = {
    params: Promise<{slug: string[]}>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug[0];
    return {
        title: `NoteHab | ${tag}`,
        description: `Notes of the ${tag} category`,
        openGraph: {
            title: `NoteHab | ${tag} category`,
            description: `Notes of the ${tag} category`,
            url: `https://09-auth-kappa-seven.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `NoteHub | ${tag} category`,
                },
            ],
        }
    }
}


export default async function Notes({params}: Props) {  
    const { slug } = await params;
    const tag = slug?.[0] ?? "";

    const initialSearch = "";
    const initialPage = 1;

    const initialData: NotesResponse = await fetchServerNotes(initialSearch, initialPage, tag);
    
    return <>
        <NotesClient tag={tag} initialData={initialData} initialPage={initialPage} initialSearch={initialSearch} />
    </>
}