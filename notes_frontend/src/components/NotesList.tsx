"use client";

import React from "react";
import type { Note } from "@/types/note";

// PUBLIC_INTERFACE
/**
 * Renders a list of notes.
 * @param notes Array of notes to display
 * @param selectedId The id of the selected note
 * @param onSelect Callback for selecting a note
 * @param onDelete Callback for deleting a note
 */
type NotesListProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
}: NotesListProps) {
  return (
    <nav className="flex flex-col gap-2 px-2 py-4 w-full max-w-xs border-r bg-[#f9fafd] min-h-0" style={{background:"#f9fafd"}}>
      <div className="flex items-center justify-between px-3 mb-2">
        <span className="font-semibold text-[1.04rem] text-[#2d8cff] tracking-tight">My Notes</span>
      </div>
      <ul className="overflow-auto min-h-0 flex-1">
        {notes.length === 0 && (
          <li className="text-gray-400 px-3 py-4 text-sm">No notes yet</li>
        )}
        {notes.map((note) => (
          <li key={note.id}
              className={`group cursor-pointer px-3 py-2 rounded transition
                ${selectedId === note.id
                    ? "bg-[#eaf3ff] border border-[#2d8cff] text-[#2d8cff] font-semibold"
                    : "hover:bg-[#f0f5fd] text-[#23282b]"
                  } flex items-center justify-between`}
              onClick={() => onSelect(note.id)}>
            <span className="truncate">{note.title || "Untitled"}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              aria-label="Delete"
              className="opacity-0 group-hover:opacity-100 text-[#ffaa2d] hover:text-red-500 transition"
              tabIndex={-1}
            >
              &#x2716;
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
