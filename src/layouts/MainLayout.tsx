import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Content from "./Content";

const MainLayout = () => {
  return (
    <div className="flex h-full w-full">
      <div>
        <Sidebar />
      </div>
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default MainLayout;
