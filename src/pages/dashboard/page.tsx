import { jwtDecode } from "jwt-decode";
// import {
//   LuNotebook,
//   LuNotebookPen,
//   LuSettings,
//   LuSearch,
// } from "react-icons/lu";
import avatar from "@/assets/avatar.jpg";
import { getGreeting } from "@/utils/get-greetings";
import type { DecodedToken } from "@/types/decoded-token";

const authToken = localStorage.getItem("authToken");
const user = jwtDecode<DecodedToken>(authToken as string);

function Dashboard() {
  return (
    <div>
      <aside className="">
        <div className="">
          <img
            src={avatar}
            alt="user-avatar"
            className="aspect-square saturate-0 rounded-lg m-4 w-10"
          />
          <h1>{getGreeting(new Date())}</h1>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </aside>
      <section>
        <div></div>
        <div></div>
      </section>
    </div>
  );
}

export default Dashboard;
