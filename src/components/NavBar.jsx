import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState, useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Track current theme to sync toggle button
  const [currentTheme, setCurrentTheme] = useState(
    typeof window !== "undefined" ? document.documentElement.getAttribute("data-theme") || "default" : "default"
  );

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Update theme on dropdown change
  const handleThemeChange = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
  };

  // Dark/Light toggle (simple toggle between "dark" and "light" themes)
  const toggleDarkMode = () => {
    if (currentTheme === "dark") {
      handleThemeChange("light");
    } else {
      handleThemeChange("dark");
    }
  };

  // On mount, listen for theme changes done outside (optional)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute("data-theme");
      setCurrentTheme(newTheme || "default");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      {/* Left Side */}
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/feed">
          Connectify
        </Link>
      </div>

      {/* Right Side (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {/* Theme Switcher Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-10 w-52 p-2 shadow-2xl"
          >
            {["default", "retro", "cyberpunk", "valentine", "aqua", "dark", "light"].map((theme) => (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={theme}
                  value={theme}
                  checked={currentTheme === theme}
                  onChange={() => handleThemeChange(theme)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Dark/Light Toggle Button */}
        <button
          className="btn btn-outline btn-sm"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          title="Toggle Dark Mode"
        >
          {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        {/* User Info & Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost normal-case flex items-center gap-2"
            >
              <div className="form-control">Welcome, {user?.data?.firstName}</div>
              <div className="avatar w-8 h-8 rounded-full overflow-hidden">
                {user?.data?.photoUrl ? (
                  <img
                    className="w-full h-full object-cover"
                    alt="User avatar"
                    src={user.data.photoUrl}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Connection Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error btn btn-ghost">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu (Hamburger) */}
      <div className="md:hidden dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
        >
          {user && (
            <>
              <li className="text-sm px-2">Welcome {user?.data?.firstName}</li>
              <li>
                <button onClick={() => navigate("/profile")}>Profile</button>
              </li>
              <li>
                <button onClick={() => navigate("/connections")}>Connection</button>
              </li>
              <li>
                <button onClick={() => navigate("/requests")}>
                  Connection Requests
                </button>
              </li>
              
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </>
          )}
          <li className="mt-2 border-t pt-2 text-xs text-gray-500">Theme</li>
          {["default", "retro", "cyberpunk", "valentine", "aqua", "dark", "light"].map((theme) => (
            <li key={theme}>
              <input
                type="radio"
                name="theme-dropdown-mobile"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme}
                value={theme}
                checked={currentTheme === theme}
                onChange={() => handleThemeChange(theme)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
