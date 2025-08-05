import { jwtDecode } from "jwt-decode";
import {
  LuNotebookPen,
  LuSettings,
  LuSearch,
  LuLogOut,
  LuUser,
} from "react-icons/lu";
import avatar from "@/assets/avatar.jpg";
import { getGreeting } from "@/utils/get-greetings";
import type { DecodedToken } from "@/types/decoded-token";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { type JSX } from "react";
import { cn } from "@/utils/cn";
import axios from "axios";

function UnauthenticatedUser(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  setTimeout(() => {
    navigate("/sign-in");
  }, 3000);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-svh min-w-svw text-gray-800">
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

function Dashboard(): JSX.Element {
  const [notePreview, setNotePreview] = useState(true);
  const [users, setUsers] = useState(null);
  const authToken: string | null | undefined =
    localStorage.getItem("authToken");
  const navigate: NavigateFunction = useNavigate();
  let user: DecodedToken | any = null;

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

  function handleLogout(): void {
    localStorage.removeItem("authToken");
    navigate("/sign-in");
  }

  function hanldeUsers() {
    try {
      const userList = axios.get("http://localhost:5500/api/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(userList);
    } catch (error) {
      if (error) console.error(error);
    }
  }

  return (
    <div className="grid grid-cols-5 items-stretch min-h-svh">
      <aside className="flex flex-col bg-[#fafafa] dark:bg-[#171717] p-4   gap-4 sm:gap-6 col-span-1">
        <div className="inline-flex flex-col gap-2 sm:gap-4">
          <span className="inline-flex items-center flex-col rounded-lg p-2 sm:p-3 gap-1 sm:gap-2 bg-white dark:bg-white/5">
            <span className="aspect-square group inline-flex w-full items-center justify-center bg-white/10">
              <span className="absolute">
                <LuUser className=" text-xl" />
              </span>
              <img
                src={avatar}
                alt="user-avatar"
                className="saturate-0 rounded-lg w-full h-full object-cover"
                loading="lazy"
              />
            </span>{" "}
            <span className="inline-flex flex-col items-center">
              <p className="font-semibold text-gray-800 dark:text-white">{`${getGreeting(
                new Date()
              )} ${user.name.split(" ")[0]}`}</p>
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
            <button onClick={hanldeUsers}>see users</button>
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
            "min-w-[calc(var(--spacing)*32)] bg-white dark:bg-white/10 p-4 sm:p-6",
            !notePreview && "w-full"
          )}
        >
          <h1 className="font-normal text-2xl sm:text-3xl">My Notes</h1>
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
