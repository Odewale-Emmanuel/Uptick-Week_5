import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex items-center justify-center min-h-svh min-w-svw">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
