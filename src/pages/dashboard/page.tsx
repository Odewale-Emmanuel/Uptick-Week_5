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
  // dateWithTime,
} from "@/utils/date-handler";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import { type JSX } from "react";
import { cn } from "@/utils/cn";
import type { Note } from "@/types/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { UnauthenticatedUser } from "@/components/unauthenticated-user";
import { useReducer } from "react";
import { useNotes } from "@/hooks/use-note";
import { noteReducer } from "@/reducers/note-reducers";
import { Loading } from "@/components/loader";
import { NoteCard } from "@/components/note-card";

export function AddNewNote() {
  function handleAddNote() {}

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="hover:cursor-pointer"
            onClick={() => console.log("new note btn clicked")}
          >
            <LuPlus />
            Add Note
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">Add new note</DialogTitle>
            <DialogDescription>
              Document your memories, journey and experiences
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required={true}
                placeholder="how my day went"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="#games #fun #assignment"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                rows={5}
                placeholder="express yourself, write your thoughts"
                required={true}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="default" onClick={handleAddNote}>
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function Dashboard(): JSX.Element {
  const [notePreview, setNotePreview] = useState(false);
  // const { user, invalidToken, tokenNotFound } = useAuth();
  const [userNotes, dispatch] = useReducer(noteReducer, []);
  const { user, tokenNotFound, invalidToken, notes, loadingNote } = useNotes();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    dispatch({ type: "set_note", payload: notes });
  }, [notes]);

  if (invalidToken || tokenNotFound) {
    return <UnauthenticatedUser />;
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
          <header className="flex flex-col gap-4 sm:gap-6">
            <h1 className="font-normal text-2xl sm:text-3xl">My Notes</h1>
            <AddNewNote />
          </header>
          <div
            className={cn(
              "grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]  grid-rows-2 grid-flow-row-dense gap-4",
              (loadingNote || !userNotes.length) &&
                "flex items-center justify-center"
            )}
          >
            {loadingNote && <Loading message="loading notes..." />}
            {userNotes.length >= 1 &&
              userNotes.map((note: Note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  longNote={!notePreview}
                  setNotePreview={setNotePreview}
                  handleDelete={() => console.log("deleted")}
                  className="align-super"
                />
              ))}
            {!loadingNote && !userNotes.length && (
              <p className="w-full p-4 sm:p-6 rounded-lg text-sm bg-black/3 dark:bg-black/10 ">
                Save your Thoughts, Ideas and Experiences...
              </p>
            )}
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
