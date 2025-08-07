import { jwtDecode } from "jwt-decode";
import {
  LuNotebookPen,
  LuSettings,
  LuSearch,
  LuLogOut,
  LuUser,
  LuPlus,
} from "react-icons/lu";
import avatar from "@/assets/avatar.jpg";
import {
  getGreeting,
  dateToISO,
  dateToDayMonth,
  dateWithTime,
} from "@/utils/date-handler";
import type { DecodedToken } from "@/types/decoded-token";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { type JSX } from "react";
import { cn } from "@/utils/cn";
import axios from "axios";
import type { Note } from "@/types/note";
import { capitalizeWords } from "@/utils/capitalize-words";
import { truncateString } from "@/utils/string-truncator";
import { Button } from "@/components/ui/button";

function UnauthenticatedUser(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  setTimeout(() => {
    navigate("/sign-in");
  }, 3000);

  return (
    <div className="flex items-center justify-center w-full h-full text-gray-800">
      <span className="inline-flex flex-col items-center gap-1">
        <LoaderIcon
          size={30}
          className="animate-spin text-black dark:text-white"
        />
        <span className="text-gray-700 dark:text-gray-500 text-sm">
          <span className="font-bold">Unathenticated user</span> Redirecting to{" "}
          <span className="font-bold">"/sign-in"</span> page now!
        </span>
      </span>
    </div>
  );
}

function Loading({ message }: { message?: string }): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full h-full text-gray-800">
      <span className="inline-flex flex-col items-center gap-1">
        <LoaderIcon
          size={30}
          className="animate-spin text-black dark:text-white"
        />
        <span className="text-gray-700 dark:text-gray-500 text-sm">
          {message}
        </span>
      </span>
    </div>
  );
}

function Tag({
  name,
  className,
}: {
  name: string;
  className?: string;
}): JSX.Element {
  return (
    <span className={cn("inline-block px-2.5 py-2 rounded-md", className)}>
      {name}
    </span>
  );
}

function NoteCard({
  note,
  className,
  longNote = false,
  onClick,
  handleDelete,
}: {
  note: Note;
  className?: string;
  longNote?: boolean;
  onClick?: (s?: string) => any;
  handleDelete: (s?: string) => any;
}): JSX.Element {
  const _id = note._id;
  const title = note.title;
  const content = note.content;
  const favorite = note.favorite;
  const tags = note.tags;
  const updatedAt = note.updated_at;

  function handleClick() {
    if (onClick) {
      onClick(_id);
    }
  }

  function handlDeleteClick() {
    handleDelete(_id);
  }

  return (
    <div
      className={cn(
        "flex flex-col px-4 pb-4 pt-3 bg-black/5 dark:bg-black/15 rounded-lg darki:bg-pink-800 max-w-[calc(var(--spacing)*82)] w-full",
        className
      )}
      onClick={handleClick}
    >
      <span>
        {" "}
        <time
          dateTime={`${dateToISO(new Date(updatedAt))}`}
          className={cn("font-semibold text-sm")}
        >
          {dateToDayMonth(new Date(updatedAt))}
        </time>
      </span>
      <h2 className={cn("font-bold mb-1.5")}>
        {truncateString(capitalizeWords(title), 27, "characters")}
      </h2>
      <p className={cn("text-sm text-justify dark:text-gray-300")}>
        {longNote
          ? truncateString(capitalizeWords(content), 50, "words")
          : truncateString(capitalizeWords(content), 15, "words")}
      </p>
      {tags.length > 0 && (
        <div className="inline-flex gap-1 sm:gap-2">
          {tags.splice(0, 3).map((tag, index) => (
            <Tag name={tag} key={index} />
          ))}
          <Tag name={`+${tags.length - 2} more`} key={"more tags"} />
        </div>
      )}
    </div>
  );
}

function Dashboard(): JSX.Element {
  const [notePreview, setNotePreview] = useState(false);
  const [userNote, setUserNote] = useState<Note[] | any>(null);
  const authToken: string | null | undefined =
    localStorage.getItem("authToken");
  const navigate: NavigateFunction = useNavigate();
  let user: DecodedToken | null = null;

  useEffect(() => {
    handleUserNotes();
  }, []);

  if (!authToken) {
    return <UnauthenticatedUser />;
  }

  try {
    user = jwtDecode<DecodedToken>(authToken as string);
  } catch (error: unknown) {
    if (error) {
      return <UnauthenticatedUser />;
    }
  }

  async function handleUserNotes() {
    try {
      const response = await axios.get<{ notes: Note[] }>(
        `https://uptick-week-4.onrender.com/api/note?user_id=${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Access the notes from the response data
      const userNotes = response.data;
      setUserNote(userNotes);
      console.log(userNotes);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occurred");
      }
    }
  }

  function handleLogout(): void {
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  }

  return (
    <div className="grid grid-cols-5 items-stretch min-h-svh">
      <aside className="flex flex-col bg-[#fafafa] dark:bg-[#171717] p-4   gap-4 sm:gap-6 col-span-1">
        <h1 className="sr-only">{`${user?.name[0]} starknotes dashboard`}</h1>
        <div className="inline-flex flex-col gap-2 sm:gap-4">
          <span className="inline-flex items-center flex-col rounded-lg p-2 sm:p-3 gap-1 sm:gap-2 bg-white dark:bg-white/5">
            <span className="aspect-square group inline-flex w-full items-center justify-center bg-white/10">
              <span className="absolute z-0">
                <LuUser className=" text-xl" />
              </span>
              <img
                src={avatar}
                alt="user-avatar"
                className="z-10 saturate-0 dark:saturate-100 rounded-lg w-full h-full object-cover"
                loading="lazy"
              />
            </span>{" "}
            <span className="inline-flex flex-col items-center">
              <p className="font-semibold text-gray-800 dark:text-white">{`${getGreeting(
                new Date()
              )} ${user?.name.split(" ")[0]}`}</p>
              <p className="text-gray-600 dark:text-white/70">welcome back!</p>
            </span>
          </span>

          <span className="inline-flex items-center relative rounded-lg p-2 sm:p-3  bg-white dark:bg-white/5">
            <LuSearch className="absolute text-lg mt-1 text-gray-600 dark:text-white/80" />
            <input
              type="search"
              placeholder="Search notes..."
              className="border-0 px-2 ps-7 ring-0 outline-0 shadow-transparent w-full h-full focus-visible:ring-transparent focus-within:ring-transparent focus:ring-transparent"
            />
          </span>
        </div>

        <div className="inline-flex w-full flex-col  gap-3 sm:gap-4">
          <span className="inline-flex items-center rounded-lg p-2 sm:p-3 gap-3 sm:gap-4 bg-white dark:bg-white/5">
            <LuNotebookPen className="text-xl text-black/70  dark:text-white" />
            <span>My Notes</span>
          </span>
        </div>

        <div className="inline-flex w-full flex-col mt-auto gap-3   sm:gap-4">
          <span className="inline-flex items-center rounded-lg  bg-transparent">
            <ModeToggle />
          </span>
          <span
            className="inline-flex items-center rounded-lg p-2 sm:p-3 gap-3 sm:gap-4 bg-white dark:bg-white/5 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LuLogOut />
            <span>Logout</span>
          </span>
          <Link
            to={"#"}
            className="inline-flex items-center rounded-lg p-2 sm:p-3 gap-3 sm:gap-4 bg-white dark:bg-white/5"
          >
            <LuSettings className="text-xl text-black/70  dark:text-white" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      <section className="flex col-span-4">
        <div
          className={cn(
            "min-w-[calc(var(--spacing)*32)] flex flex-col gap-6 bg-white dark:bg-white/10 p-4 sm:p-6",
            !notePreview && "w-full"
          )}
        >
          <header>
            <h1 className="font-normal text-2xl sm:text-3xl">My Notes</h1>
            <Button
              className="hover:cursor-pointer"
              onClick={() => console.log("new note btn clicked")}
            >
              <LuPlus />
              Add note
            </Button>
          </header>
          <div className="grid grid-cols-[repaet(4, auto)] grid-flow-row-dense bg-pink-200 gap-4 grow">
            {userNote &&
              userNote.map((note: Note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  longNote={!notePreview}
                  handleDelete={() => console.log("deleted")}
                  className="align-super"
                />
              ))}
          </div>
        </div>
        <div
          className={cn(
            notePreview ? "grow-1 border-s-2 dark:bg-white/10" : "hidden"
          )}
        >
          {/* {users && users.map()} */}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
