import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default MainLayout;