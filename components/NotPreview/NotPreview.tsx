"use client";

import css from "./NotPreview.module.css";
import { Note } from "@/types/note";

type NotePreviewProps = {
  onClose: () => void;
  note: Note
};

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  return (
    <>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.backBtn} onClick={onClose}>
                Go back
              </button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        </div>
      {/* )} */}
    </>
  );
}
