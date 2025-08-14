import {
  LuNotebookPen,
  LuSettings,
  LuSearch,
  LuLogOut,
  LuUser,
} from "react-icons/lu";
import avatar from "@/assets/avatar.jpg";
import { getGreeting, getTimestamp } from "@/utils/date-handler";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { type JSX } from "react";
import { cn } from "@/utils/cn";
import type { Note } from "@/types/note";
import { UnauthenticatedUser } from "@/components/unauthenticated-user";
import { useReducer, useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { noteReducer } from "@/reducers/note-reducers";
import { Loading } from "@/components/loader";
import { NoteCard } from "@/components/note-card";
import SEO from "@/components/seo";
import { useLocation } from "react-router-dom";
import { AddNewNote } from "@/components/add-note";
import { PreviewNote } from "@/components/note-preview";
import { toast } from "react-toastify";

function Dashboard(): JSX.Element {
  const [previewNoteStatus, setPreviewNoteStatus] = useState(false);
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [noteState, dispatch] = useReducer(noteReducer, {
    notes: [],
    filteredNotes: [],
    searchTerm: "",
  });
  const { user, authToken, tokenNotFound, invalidToken, notes, loadingNote } =
    useUser();
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const html: HTMLCollectionOf<HTMLElement> =
      document.getElementsByTagName("html");
    html[0].classList.add("overflow-hidden");
    dispatch({
      type: "set_note",
      payload: { notes: notes, filteredNotes: notes, searchTerm: "" },
    });
    console.log(noteState);
  }, [notes, authToken, user]);

  if (invalidToken || tokenNotFound) {
    return <UnauthenticatedUser />;
  }

  if (!user) {
    <Loading message="Loading user dashboard..." />;
  }

  function handleLogout(): void {
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  }

  function handleSearch(searchTerm: string) {
    dispatch({ type: "search_notes", payload: searchTerm });
  }

  function handleUpdateNotes(notes: Note[]): void {
    dispatch({
      type: "set_note",
      payload: { notes: notes, filteredNotes: notes, searchTerm: "" },
    });
  }

  function handleUpdateNote(note: Note): void {
    dispatch({ type: "update_note", payload: note });
    if (previewNote && previewNote._id === note._id) {
      setPreviewNote(note);
    }
  }

  function handleNoteClick(note: Note): void {
    setPreviewNoteStatus(true);
    setPreviewNote(note);
  }

  function handleDeleteNote(id: string): void {
    if (previewNote?._id === id) {
      toast("kindly close preview before deleting note");
      return;
    } else {
      try {
        async function fetchApi() {
          await fetch(
            `https://uptick-week-4.onrender.com/api/note?note_id=${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                note_id: id,
              }),
            }
          );
        }

        fetchApi();

        dispatch({ type: "delete_note", payload: id });
        toast.success("note deleted successfully");
      } catch (error: unknown) {
        if (error) {
          toast.error(
            "an error occurred while deleting your note from the database"
          );
          throw error;
        }
      }
    }
  }

  function handleClosePreview() {
    setPreviewNoteStatus(false);
    setPreviewNote(null);
  }

  return (
    <div className="grid grid-cols-5 items-stretch h-svh overflow-hidden">
      <SEO
        title={`${user?.name || "User"} Dashboard`}
        description="StarkNotes User Dashboard"
        url={`https://starknote.vercel.app${location.pathname}`}
      />
      {/* TODO - make aside responsive */}
      <aside
        className={cn(
          "flex flex-col bg-[#fafafa] dark:bg-[#171717] p-4 h-screen gap-4 sm:gap-6 col-span-1",
          "overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-0"
        )}
      >
        <h1 className="sr-only">{`${user?.name[0]} starknotes dashboard`}</h1>
        <div className="inline-flex flex-col gap-2 sm:gap-4">
          <span className="relative inline-flex items-center flex-col rounded-lg p-2 sm:p-3 gap-1 sm:gap-2 bg-white dark:bg-white/5">
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
              onChange={(e) => handleSearch(e.target.value)}
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

      <section
        className={cn(
          "col-span-4 h-screen overflow-hidden",
          previewNoteStatus ? "grid grid-cols-3" : "flex"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6 bg-white h-screen dark:bg-white/10 p-4 sm:p-6",
            !previewNoteStatus ? "w-full" : "col-span-3 lg:col-span-1"
          )}
        >
          <header className="flex flex-col gap-4 sm:gap-6">
            <h1 className="font-normal text-2xl sm:text-3xl">My Notes</h1>
            <AddNewNote updateNotes={handleUpdateNotes} />
          </header>

          <div
            className={cn(
              "grow-1 overflow-hidden overflow-y-auto",
              "[&::-webkit-scrollbar]:w-0"
            )}
          >
            <div
              className={cn(
                "columns-1 sm:columns-2 lg:columns-3 gap-4 overflow-hidden overflow-y-auto w-full",
                "[&::-webkit-scrollbar]:w-0",
                previewNoteStatus && "columns-xs sm:columns-xs lg:columns-xs",
                (loadingNote || !noteState.filteredNotes.length) &&
                  "flex items-start justify-center"
              )}
            >
              {loadingNote && <Loading message="loading notes..." />}
              {noteState.filteredNotes.length >= 1 &&
                [...noteState.filteredNotes]
                  .sort(
                    (a, b) =>
                      getTimestamp(b.updated_at) - getTimestamp(a.updated_at)
                  )
                  .map((note: Note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      longNote={!previewNoteStatus}
                      onClick={() => handleNoteClick(note)}
                      handleDelete={handleDeleteNote}
                      handleEdit={handleUpdateNote}
                      className={cn(
                        "break-inside-avoid mb-4",
                        note._id === previewNote?._id &&
                          "bg-black/10 dark:bg-black/35 "
                      )}
                    />
                  ))}
              {!loadingNote && !noteState.filteredNotes.length && (
                <p className="w-full p-4 sm:p-6 rounded-lg text-sm bg-black/3 dark:bg-black/10 break-inside-avoid">
                  Ops no note found...
                </p>
              )}
            </div>
          </div>
        </div>

        {previewNoteStatus && (
          <PreviewNote note={previewNote} closePreview={handleClosePreview} />
        )}
      </section>
    </div>
  );
}

export default Dashboard;
