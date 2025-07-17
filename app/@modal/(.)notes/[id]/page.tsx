import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import NotePreviewPage from "./NotePreview.client";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", id], // Змінено з "note" на "notes"
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewPage />
    </HydrationBoundary>
  );
};

export default NotePreview;