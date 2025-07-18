"use client";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";


type Props = {
  params: Promise<{ id: string }>;
  id: string;
};
const CreateNoteModal= async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default CreateNoteModal;