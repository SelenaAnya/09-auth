import { NewNoteData } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    }
  )
);
