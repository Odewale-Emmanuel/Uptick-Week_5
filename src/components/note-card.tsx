import type { JSX } from "react";
import { cn } from "@/utils/cn";
import type { Dispatch, SetStateAction } from "react";
import type { Note } from "@/types/note";
import { truncateString } from "@/utils/string-truncator";
import { dateToISO, dateToDayMonth } from "@/utils/date-handler";
import { Tag } from "./note-tag";
import { LuTrash2 } from "react-icons/lu";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";
import { LiaPenSolid } from "react-icons/lia";

export function NoteCard({
  note,
  className,
  longNote = false,
  setNotePreview,
  onClick,
  handleDelete,
}: {
  note: Note;
  className?: string;
  longNote?: boolean;
  setNotePreview?: Dispatch<SetStateAction<boolean>>;
  onClick?: (s?: string) => unknown;
  handleDelete: (s?: string) => unknown;
}): JSX.Element {
  const _id = note._id;
  const title = note.title;
  const content = note.content;
  const favorite = note.favorite;
  const tags = note.tags;
  const updatedAt = note.updated_at;

  function handleClick() {
    if (onClick && setNotePreview) {
      onClick(_id);
      setNotePreview((prev) => !prev);
    }
  }

  function handleDeleteClick() {
    handleDelete(_id);
  }

  function handleUpdateClick() {
    console.log("this note has been updated");
  }

  function handleFavoriteClick() {
    console.log("favorited this note");
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 group px-4 pb-4 pt-3 bg-black/5 dark:bg-black/15 rounded-xl w-full",
        className
      )}
      onClick={handleClick}
    >
      <header>
        <span>
          {" "}
          <time
            dateTime={`${dateToISO(new Date(updatedAt))}`}
            className={cn("font-semibold text-sm")}
          >
            {dateToDayMonth(new Date(updatedAt))}
          </time>
        </span>
        <h2
          className={cn("font-bold capitalize text-black/90 dark:text-white")}
        >
          {truncateString(title, 27, "characters")}
        </h2>
      </header>
      <p
        className={cn("text-sm text-balance text-black/80 dark:text-gray-300")}
      >
        {longNote
          ? truncateString(content, 50, "words")
          : truncateString(content, 15, "words")}
      </p>
      {tags.length > 0 && (
        <div className="inline-flex mb-1 gap-1 sm:gap-2">
          {tags.splice(0, 3).map((tag, index) => (
            <Tag name={tag} key={index} />
          ))}
          <Tag name={`+${tags.length - 3} more`} key={"more tags"} />
        </div>
      )}
      <div className="flex gap-2 mt-auto justify-end items-center">
        <span
          className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border hiddeXn group-hover:inline-flex"
          onClick={handleDeleteClick}
        >
          <LuTrash2 className="text-lg text-black/70 dark:text-white/90" />
        </span>
        <span
          className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border"
          onClick={handleUpdateClick}
        >
          <LiaPenSolid className="text-xl text-black/70 dark:text-white/90" />
        </span>
        <span
          className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border"
          onClick={handleFavoriteClick}
        >
          {favorite ? (
            <IoIosHeart className="text-xl text-black/70 dark:text-white/90" />
          ) : (
            <IoMdHeartEmpty className="text-xl text-black/70 dark:text-white/90" />
          )}
        </span>
      </div>
    </div>
  );
}
