import { Outlet } from "react-router-dom";
import Navbar from "./header";
import ScrollToTop from "../utils/ScrollToTop";

export default function MainLayout() {
  return (
    <div className="h-full w-full">
      <div className="flex p-[30px] h-[calc(100vh-60px)]">
        <main className="flex-1 px-4">
          <ScrollToTop />
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
