import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import "./DashboardLayout.css"; // Add CSS styles

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar /> {/* Sidebar stays fixed */}
      <div className="dashboard-content">
        <Outlet /> {/* This changes based on the route */}
      </div>
    </div>
  );
};

export default DashboardLayout;
