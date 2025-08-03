import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

function NavBar() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 p-2 sm:p-5 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="flex items-center justify-between">
        <Link to={"/"} className="text-lg font-bold">
          StarkNotes
        </Link>
        <ul className="inline-flex items-center space-x-4">
          <li>
            <Link
              to={"/sign-up"}
              className="text-black/70 dark:text-white/70 dark:hover:text-white hover:text-black"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to={"/sign-in"}
              className="text-black/70 dark:text-white/70 dark:hover:text-white hover:text-black"
            >
              Sign In
            </Link>
          </li>
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default NavBar;
