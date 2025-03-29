import { Outlet } from "react-router-dom";

const NoLayout = () => {
  return (
    <main className="flex-grow">
      <Outlet />
    </main>
  );
};

export default NoLayout;
