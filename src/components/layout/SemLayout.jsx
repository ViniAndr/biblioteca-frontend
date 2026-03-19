import { Outlet } from "react-router-dom";

const SemLayout = () => {
  return (
    <main className="flex-grow">
      <Outlet />
    </main>
  );
};

export default SemLayout;
