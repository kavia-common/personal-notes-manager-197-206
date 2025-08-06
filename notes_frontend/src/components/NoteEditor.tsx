"use client";

import React, { useEffect, useState } from "react";
import type { Note } from "@/types/note";

// PUBLIC_INTERFACE
/**
 * Note editor pane for editing/creating a note.
 * @param selectedNote The selected note, or null for new
 * @param onSave Callback to save the note
 * @param onChangeTitle Callback to update note title as typing (for live list)
 */
type NoteEditorProps = {
  selectedNote: Note | null;
  onSave: (note: Note) => void;
  onChangeTitle: (title: string) => void;
};

export default function NoteEditor({
  selectedNote,
  onSave,
  onChangeTitle,
}: NoteEditorProps) {
  const [title, setTitle] = useState(selectedNote?.title || "");
  const [content, setContent] = useState(selectedNote?.content || "");

  useEffect(() => {
    setTitle(selectedNote?.title || "");
    setContent(selectedNote?.content || "");
  }, [selectedNote]);

  // Handle title live change for updating list instantly
  const handleTitleChange = (v: string) => {
    setTitle(v);
    onChangeTitle(v);
  };

  if (!selectedNote) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center text-gray-400">
        <span>Select a note or create a new one.</span>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 w-full h-full p-6 max-w-2xl mx-auto">
      <input
        className="text-xl font-semibold outline-none border-b border-transparent focus:border-[#2d8cff] py-1 px-2 bg-transparent transition placeholder:text-gray-300"
        value={title}
        onChange={e => handleTitleChange(e.target.value)}
        placeholder="Title"
        aria-label="Note title"
      />
      <textarea
        className="h-[55vh] min-h-[280px] max-h-[66vh] border rounded px-2 py-2 text-base bg-white outline-none focus:border-[#2d8cff] border-gray-100 transition placeholder:text-gray-300"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type your note here..."
        aria-label="Note content"
        style={{resize:"vertical"}}
      />
      <div className="flex flex-row gap-2 justify-end">
        <button
          className="px-4 py-2 rounded bg-[#2d8cff] text-white font-semibold hover:bg-[#428fff] transition"
          onClick={() =>
            onSave({
              ...selectedNote,
              title: title.trim() || "Untitled",
              content,
              lastModified: new Date().toISOString(),
            })
          }
        >
          Save
        </button>
      </div>
    </section>
  );
}
