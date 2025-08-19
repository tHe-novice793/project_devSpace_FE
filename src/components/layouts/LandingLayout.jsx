import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default LandingLayout;
