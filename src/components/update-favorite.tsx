import { toast } from "react-toastify";
import { useAuth } from "@/hooks/use-auth";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import type { Note } from "@/types/note";
import type { MouseEvent } from "react";
import axios from "axios";

export function UpdateFavorite({
  note,
  updateFavorite,
}: {
  note: Note;
  updateFavorite: (note: Note) => void;
}) {
  const { authToken } = useAuth();

  function handleFavoriteClick(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();

    try {
      axios.patch(
        `https://uptick-week-4.onrender.com/api/note`,
        {
          note_id: note._id,
          title: note.title,
          content: note.content,
          favorite: !note.favorite,
          tags: note.tags,
          updated_at: note.updated_at,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      updateFavorite({ ...note, favorite: !note.favorite });
    } catch (error: unknown) {
      if (error) {
        console.log(error);
        toast.error(
          "An error occurred while trying to favorite your note in the database. please check your network and try again"
        );
      }
    }
  }

  return (
    <span
      role="button"
      className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border"
      onClick={(e) => handleFavoriteClick(e)}
    >
      <span className="sr-only">Favorite Button</span>
      {note.favorite ? (
        <IoIosHeart className="text-xl text-black/70 dark:text-white/90" />
      ) : (
        <IoMdHeartEmpty className="text-xl text-black/70 dark:text-white/90" />
      )}
    </span>
  );
}
