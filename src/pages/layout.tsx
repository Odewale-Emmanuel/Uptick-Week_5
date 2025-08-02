import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default HomeLayout;
