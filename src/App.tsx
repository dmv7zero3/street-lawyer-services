import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import "@/styles/index.css";
import ScrollToTop from "@/utils/ScrollToTop";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      <ScrollToTop />
      <main className="flex-grow">{routing}</main>
    </div>
  );
};

export default App;
