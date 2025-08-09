import type { Note } from "@/types/note";
// import { useReducer } from "react";

type ActionType =
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

// export function useNoteReducer() {
//   const [userNote, dispatch] = useReducer(noteReducer, []);

//   const setNote = (note: Note[]) => {
//     dispatch({ type: "set_note", payload: note });
//   };

//   const addNote = (note: Note) => {
//     dispatch({ type: "add_note", payload: note });
//   };

//   const updateNote = (note: Note) => {
//     dispatch({ type: "update_note", payload: note });
//   };

//   const deleteNote = (_id: string) => {
//     dispatch({ type: "delete_note", payload: _id });
//   };

//   return { userNote, setNote, addNote, updateNote, deleteNote };
// }
