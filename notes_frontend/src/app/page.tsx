"use client"

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { Note } from "@/types/note";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote
} from "@/services/notesService";

// Generate a new random note template
const newNoteTemplate = (): Note => ({
  id: Math.random().toString(36).substr(2, 9),
  title: "",
  content: "",
  lastModified: new Date().toISOString(),
});

// Main notes page
// PUBLIC_INTERFACE
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Initially load notes
  useEffect(() => {
    fetchNotes().then((fetched) => {
      setNotes(fetched);
      setSelectedId(fetched[0]?.id ?? null);
    });
  }, []);

  const selectedNote = notes.find((n) => n.id === selectedId) || null;

  // Add new note
  const handleNewNote = async () => {
    const blank = newNoteTemplate();
    setNotes((prev) => [blank, ...prev]);
    setSelectedId(blank.id);
  };

  // Save new or updated note
  const handleSave = async (note: Note) => {
    if (!notes.some(n => n.id === note.id)) {
      // Create
      const saved = await createNote(note);
      setNotes((prev) =>
        [saved, ...prev.filter(n => n.id !== note.id)]
      );
      setSelectedId(saved.id);
    } else {
      // Update
      const saved = await updateNote(note);
      setNotes((prev) =>
        prev.map(n => n.id === saved.id ? saved : n)
      );
    }
  };

  // Live change note title for list sync
  const handleTitleEdit = (title: string) => {
    if (selectedId) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === selectedId ? { ...n, title } : n
        )
      );
    }
  };

  // Delete note
  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter(n => n.id !== id));
    // If closing current, pick another
    if (id === selectedId) {
      setSelectedId((list => list.find(n => n.id !== id)?.id || null)(notes));
    }
  };

  // Responsive layout: sidebar + editor
  return (
    <div className="min-h-screen flex flex-col bg-[#fafcff]">
      <Header />
      <main className="flex-1 flex flex-row min-h-0">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={handleDelete}
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex justify-between items-center border-b px-6 py-3">
            <span className="text-lg font-medium text-[#23282b]">
              {selectedNote ? "Edit Note" : "No Note Selected"}
            </span>
            <button
              className="rounded border px-3 py-1 bg-[#ffaa2d] text-white font-semibold hover:bg-[#ffbb49] transition"
              onClick={handleNewNote}
            >
              + New Note
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <NoteEditor
              selectedNote={selectedNote}
              onSave={handleSave}
              onChangeTitle={handleTitleEdit}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-2 text-xs text-gray-400 border-t">
        &copy; {new Date().getFullYear()} Notes App
      </footer>
    </div>
  );
}
