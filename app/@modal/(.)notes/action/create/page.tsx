"use client";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";

// Fixed Props type - removed the invalid 'id' property
type Props = {
  params: Promise<{ id: string }>;
};

const CreateNoteModal = async ({ params }: Props) => {
    // Since this is a CREATE modal, we probably don't need to fetch an existing note
    // But if you do need the id for some reason, you can still extract it from params
    const { id } = await params;
    const queryClient = new QueryClient();

    // For a CREATE modal, you might not need to prefetch anything
    // Or you might want to prefetch different data (like categories, tags, etc.)
    // Remove or modify this section based on your actual needs:
    
    // If you don't need to prefetch data for creation:
    // Just create an empty QueryClient
    
    // If you DO need to prefetch data, make sure it's appropriate for creation:
    // await queryClient.prefetchQuery({
    //   queryKey: ["categories"],
    //   queryFn: () => fetchCategories(),
    // });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default CreateNoteModal;