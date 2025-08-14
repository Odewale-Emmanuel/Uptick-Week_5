import type { Note } from "@/types/note";

export type ActionType =
  | { type: "set_note"; payload: NoteState }
  | { type: "add_note"; payload: Note }
  | { type: "update_note"; payload: Note }
  | { type: "delete_note"; payload: string }
  | { type: "search_notes"; payload: string };

type NoteState = {
  notes: Note[];
  filteredNotes: Note[];
  searchTerm?: string;
};

export function noteReducer(state: NoteState, action: ActionType): NoteState {
  switch (action.type) {
    case "set_note": {
      return action.payload;
    }

    case "add_note": {
      const updatedNotes = [...state.notes, action.payload];
      return {
        notes: updatedNotes,
        filteredNotes: updatedNotes,
        searchTerm: state.searchTerm || "",
      };
    }

    case "update_note": {
      const updatedNotes = state.notes.map((note) =>
        note._id === action.payload._id ? { ...note, ...action.payload } : note
      );
      return {
        notes: updatedNotes,
        filteredNotes: updatedNotes,
        searchTerm: state.searchTerm || "",
      };
    }

    case "delete_note": {
      const updatedNotes = state.notes.filter(
        (note) => note._id !== action.payload
      );
      return {
        notes: updatedNotes,
        filteredNotes: updatedNotes,
        searchTerm: state.searchTerm || "",
      };
    }

    case "search_notes": {
      const searchTerm = action.payload.toLowerCase();
      const searchResult = state.notes.filter((note) => {
        const title: string = note.title.toLowerCase();
        const content: string = note.content.toLowerCase();
        const tags: string[] = note.tags.map((tag: string) =>
          tag.toLowerCase()
        );

        return (
          title.includes(searchTerm) ||
          content.includes(searchTerm) ||
          tags.some((tag) => tag.includes(searchTerm))
        );
      });

      return {
        notes: state.notes,
        filteredNotes: searchTerm === "" ? state.notes : searchResult,
        searchTerm: searchTerm || "",
      };
    }

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
