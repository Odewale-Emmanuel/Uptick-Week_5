import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex items-center justify-center min-h-svh sm:h-svh sm:overflow-hidden">
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
