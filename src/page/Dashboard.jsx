import { useState } from "react";

// Components
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Emprestimos");

  return (
    <div className="h-screen flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pl-64 lg:container mx-auto p-6">
        <h1 className="font-bold text-4xl mb-2">{activeTab}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
