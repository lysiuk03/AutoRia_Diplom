import LoadingSpinner from "components/LoadingSpinner.tsx";
import Header from "partials/Header.tsx";
import Sidebar from "partials/Sidebar.tsx";
import { Outlet } from "react-router-dom";

import { Suspense, useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden custom-scrollbar">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 overflow-y-scroll">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
