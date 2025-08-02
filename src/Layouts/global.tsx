import { Outlet } from "react-router-dom";
// import NavBar from "../components/navbar";
// import Footer from "../components/footer";

function GlobalLayout() {
  return (
    <div className="">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}

export default GlobalLayout;
