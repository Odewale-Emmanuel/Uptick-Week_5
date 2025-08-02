import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalLayout from "./Layouts/global";
import Home from "./pages/page";
import HomeLayout from "./pages/layout";
import SignIn from "./pages/sign-in/page";
import SignInLayout from "./pages/sign-in/layout";
import SignUp from "./pages/sign-up/page";
import SignUpLayout from "./pages/sign-up/layout";
import Dashboard from "./pages/dashboard/page";
import DashboardLayout from "./pages/dashboard/layout";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route element={<HomeLayout />}>
            <Route index path="/" element={<Home />} />
          </Route>
          <Route element={<SignUpLayout />}>
            <Route index path="/sign-up" element={<SignUp />} />
          </Route>
          <Route element={<SignInLayout />}>
            <Route index path="/sign-in" element={<SignIn />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route index path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
