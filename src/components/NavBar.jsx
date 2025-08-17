import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   // dispatch(logoutUser());
  //   navigate("/login");
  // };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      {/* Left Side */}
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          devSpaces
        </Link>
      </div>

      {/* Right Side (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {/* Theme Switcher */}
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
            {["default", "retro", "cyberpunk", "valentine", "aqua"].map(
              (theme) => (
                <li key={theme}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label={theme}
                    value={theme}
                  />
                </li>
              )
            )}
          </ul>
        </div>

        {/* User Info & Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost normal-case flex items-center gap-2"
            >
              <div className="form-control">
                Welcome, {user?.data?.firstName}
              </div>
              {/* <span className="hidden lg:block">
                Welcome {user?.data?.firstName}
              </span> */}
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
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/logout" className="text-error">Logout</Link>
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
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
                <button onClick={() => navigate("/settings")}>Settings</button>
              </li>
              <li>
                <button className="text-error">Logout</button>
              </li>
            </>
          )}
          <li className="mt-2 border-t pt-2 text-xs text-gray-500">Theme</li>
          {["default", "retro", "cyberpunk", "valentine", "aqua"].map(
            (theme) => (
              <li key={theme}>
                <input
                  type="radio"
                  name="theme-dropdown-mobile"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={theme}
                  value={theme}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
