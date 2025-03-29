import { useState } from "react";

// Components
import Sidebar from "../components/dashboard/Sidebar";
import Clients from "../components/dashboard/Clients";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Emprestimos");

  return (
    <div className="h-screen grid grid-cols-[256px_1fr]">
      <div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="container mx-auto pt-8 px-10">
        <h1 className="font-bold text-4xl mb-2">{activeTab}</h1>
        <div className="my-5">
          <Clients />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
