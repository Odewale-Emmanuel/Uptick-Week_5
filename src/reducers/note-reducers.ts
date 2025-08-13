import type { Note } from "@/types/note";

export type ActionType =
  | { type: "set_note"; payload: Note[] }
  | { type: "add_note"; payload: Note }
  | { type: "update_note"; payload: Note }
  | { type: "delete_note"; payload: string };

export function noteReducer(notes: Note[], action: ActionType): Note[] {
  switch (action.type) {
    case "set_note": {
      return action.payload;
    }

    case "add_note": {
      return [...notes, action.payload];
    }

    case "update_note": {
      return notes.map((note) =>
        note._id === action.payload._id ? { ...note, ...action.payload } : note
      );
    }

    case "delete_note": {
      return notes.filter((note) => note._id !== action.payload);
    }

    default:
      throw Error(`Unknown action: ${action}`);
  }
}
