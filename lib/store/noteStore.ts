import { NewNoteData } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UseNoteDraft = {
    draft: NewNoteData;
    setDraft: (note: NewNoteData) => void;
    clearDraft: () => void;
};

const initialDraft: NewNoteData = {
    title: "",
    content: "",
    tag: "Todo",
};

export const useNoteDraft = create<UseNoteDraft>()(
    persist(
        (set) => {
            return {
                draft: initialDraft,
                setDraft: (note: NewNoteData) => {
                    return set({
                        draft: note,
                    });
                },
                clearDraft: () => {
                    return set({
                        draft: initialDraft,
                    });
                },
            };
        },
        {
            name: "note-draft",
            partialize: (store) => {
                return { draft: store.draft };
            },
        }
    )
);