import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";
import { useLocation } from "react-router-dom";

const noFooterRoutes = ["/login", "/signup"];

const MainLayout = ({ children }) => {
  const location = useLocation();
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;