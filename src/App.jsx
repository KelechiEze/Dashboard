import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import SettingsPage from "./components/SettingsPage";
import UserWallet from "./components/UserWallet";
import PendingTransactions from "./components/PendingTransactions";
import AllTransactions from "./components/AllTransactions";
import ManageUsers from "./components/ManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="UserWallet" element={<UserWallet />} />
          <Route path="wallet/pending" element={<PendingTransactions />} />
          <Route path="wallet/all" element={<AllTransactions />} />
          <Route path="users/manage" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
