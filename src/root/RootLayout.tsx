import Bottombar from "@/components/Bottombar";
import LeftSidebar from "@/components/LeftSidebar";
import ToggleTheme from "@/components/ToggleTheme";
import Topbar from "@/components/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row relative">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1">
        <Outlet />
      </section>

      <Bottombar />
      <div className="absolute top-4 right-4">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default RootLayout;
