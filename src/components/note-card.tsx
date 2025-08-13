import type { JSX } from "react";
import { cn } from "@/utils/cn";
import type { Note } from "@/types/note";
import { truncateString } from "@/utils/string-truncator";
import { dateToISO, dateToDayMonth } from "@/utils/date-handler";
import { Tag } from "./note-tag";
import { LuTrash2 } from "react-icons/lu";
import type { MouseEventHandler } from "react";
import type { MouseEvent } from "react";
import { UpdateNote } from "./update-note";
import { UpdateFavorite } from "./update-favorite";

export function NoteCard({
  note,
  className,
  longNote = false,
  onClick,
  handleDelete,
  handleEdit,
}: {
  note: Note;
  className?: string;
  longNote?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleDelete: (id: string) => void;
  handleEdit: (note: Note) => void;
}): JSX.Element {
  const title = note.title;
  const content = note.content;
  const tags = note.tags;
  const updatedAt = note.updated_at;

  function handleDeleteClick(e: MouseEvent<HTMLSpanElement>) {
    e.stopPropagation();
    handleDelete(note._id);
  }

  return (
    <div
      className={cn(
        "flex flex-col hover:cursor-pointer gap-2 group px-4 pb-4 pt-3 bg-black/5 hover:bg-black/8 dark:bg-black/15 dark:hover:bg-black/25 rounded-xl w-full",
        className
      )}
      onClick={onClick}
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
      <p className={cn("text-sm text-black/80 dark:text-gray-300")}>
        {longNote
          ? truncateString(content, 50, "words")
          : truncateString(content, 15, "words")}
      </p>
      {tags.length > 0 && (
        <div className="inline-flex flex-wrap my-1 gap-2 sm:gap-2">
          {[...tags].splice(0, 3).map((tag, index) => (
            <Tag name={tag} key={index} className="text-sm" />
          ))}
          {tags.length > 3 && (
            <Tag
              name={`+${tags.length - 3} more`}
              key={"more tags"}
              className="text-sm"
            />
          )}
        </div>
      )}
      <div
        className="flex gap-2 mt-auto justify-end items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          role="button"
          className="h-8 aspect-square rounded-full hover:bg-white hover:cursor-pointer inline-flex items-center justify-center bg-white/30 dark:bg-white/1 dark:hover:bg-white/10 border hiddeXn group-hover:inline-flex"
          onClick={(e) => handleDeleteClick(e)}
        >
          <span className="sr-only">Delete Button</span>
          <LuTrash2 className="text-lg text-black/70 dark:text-white/90" />
        </span>
        <UpdateNote note={note} updateNote={handleEdit} />
        <UpdateFavorite note={note} updateFavorite={handleEdit} />
      </div>
    </div>
  );
}
