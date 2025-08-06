import { Note } from "@/types/note";

// PUBLIC_INTERFACE
/**
 * Fetch all notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  // TODO: implement real API call
  // return fetch(`${API_BASE_URL}/notes`).then(r => r.json());
  return [];
}

// PUBLIC_INTERFACE
/**
 * Create a note.
 */
export async function createNote(note: Omit<Note, "id" | "lastModified">): Promise<Note> {
  // TODO: implement real API call
  // return fetch(`${API_BASE_URL}/notes`, ...)
  return { id: Math.random().toString(36).substr(2, 9), ...note, lastModified: new Date().toISOString() };
}

// PUBLIC_INTERFACE
/**
 * Update a note.
 */
export async function updateNote(note: Note): Promise<Note> {
  // TODO: implement real API call
  // return fetch(`${API_BASE_URL}/notes/${note.id}`, ...)
  return { ...note, lastModified: new Date().toISOString() };
}

// PUBLIC_INTERFACE
/**
 * Delete a note.
 */
export async function deleteNote(): Promise<void> {
  // TODO: implement real API call
  // return fetch(`${API_BASE_URL}/notes/${noteId}`, {method: "DELETE"})
  return;
}
