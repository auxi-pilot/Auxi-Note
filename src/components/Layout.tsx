import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AIAssistant from "./AIAssistant";

const Layout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container py-6 animate-in">
          <Outlet />
        </div>
      </main>
      {/* <AIAssistant /> */}
    </div>
  );
};

export default Layout;
