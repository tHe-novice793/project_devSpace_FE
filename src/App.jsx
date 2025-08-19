import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore";

// Layouts
import MainLayout from "./components/layouts/MainLayout";
import PublicLayout from "./components/layouts/PublicLayout";

// Pages
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ErrorPage from "./components/Error";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* ---------- Private Routes ---------- */}
          <Route element={<MainLayout />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
          </Route>

          {/* ---------- Catch-all ---------- */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
