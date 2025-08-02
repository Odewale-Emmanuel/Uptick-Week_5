import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

function NavBar() {
  return (
    <nav
      className={cn(
        "flex items-center justify-between p-4 bg-white/10 shadow-sm dark:bg-white/3 backdrop-blur-sm"
      )}
    >
      <Link to={"/"} className="text-lg font-bold">
        Home
      </Link>
      <ul className="inline-flex items-center space-x-4">
        <li>
          <Link to={"/sign-up"} className="">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to={"/sign-in"} className="">
            Sign In
          </Link>
        </li>
      </ul>
      <ModeToggle />
    </nav>
  );
}

export default NavBar;
