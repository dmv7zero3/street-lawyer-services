// src/App.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import "@/styles/index.css";
import ScrollToTop from "@/utils/ScrollToTop";
import Header from "@/components/Header";

import Footer from "@/components/Footer";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">{routing}</main>
      <Footer />
    </div>
  );
};

export default App;
