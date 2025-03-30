import { useState } from "react";

// Components
import Sidebar from "../components/dashboard/Sidebar";
import Clients from "../components/dashboard/Clients";
import Publishers from "../components/dashboard/Publishers";
import Authors from "../components/dashboard/Authors";
import Categories from "../components/dashboard/Categories";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Clientes");

  const renderContent = () => {
    switch (activeTab) {
      case "Autores":
        return <Authors />;
      case "Editoras":
        return <Publishers />;
      case "Categorias":
        return <Categories />;
      case "Clientes":
        return <Clients />;
      default:
        return <Clients />;
    }
  };

  return (
    <div className="h-screen grid grid-cols-[256px_1fr]">
      <div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="container mx-auto pt-8 px-10">
        <h1 className="font-bold text-4xl mb-2">{activeTab}</h1>
        <div className="my-5">{renderContent()}</div>
      </div>
    </div>
  );
};
export default Dashboard;
