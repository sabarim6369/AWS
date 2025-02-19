import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./utils/sidebar";
import AdminProfile from "./components/admin/Profile/index";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import Report from "./components/admin/Report/Report";
import TelecallersDashboard from "./components/telecaller/Dashboard/Dashboard";
import Telecallers from "./components/admin/Telecallers/Telecallers";
import LoginPage from "./components/admin/Login/Login";
import ProtectedRoute from "./utils/Protectedroute";
import Leads from "./components/admin/Leads/Leads";
import TelecallersLeads from "./components/telecaller/Leads/Leads";
import SuperadminDashboard from "./components/superadmin/dashboard/Dashboard";
import Admin from "./components/superadmin/admins/admin";
import History from "./components/telecaller/History/history";
import TelecallerProfile from "./components/telecaller/Profile/Profile";
import SuperadminProfile from "./components/superadmin/profile/profile";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    setUserRole(getRoleFromToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={
    userRole === "superadmin" ? (
      <Navigate to="/admindashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    )
  }
/>

        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={userRole === "admin" ? <Dashboard /> : <TelecallersDashboard />}
              allowedRoles={["admin", "telecaller"]}
            />
          }
        />
<Route 
  path="/profile" 
  element={
    <ProtectedRoute 
      element={
        userRole === "admin" ? <AdminProfile /> :
        userRole === "superadmin" ? <SuperadminProfile /> :
        <TelecallerProfile />
      } 
      allowedRoles={["admin", "superadmin", "telecaller"]} 
    />
  } 
/>
        <Route path="/report" element={<ProtectedRoute element={<Report />} allowedRoles={["admin", "telecaller"]} />} />
        <Route path="/telecallers" element={<ProtectedRoute element={<Telecallers />} allowedRoles={["admin"]} />} />
        <Route
          path="/leads"
          element={
            <ProtectedRoute element={userRole === "admin" ? <Leads /> : <TelecallersLeads />} allowedRoles={["admin", "telecaller"]} />
          }
        />
        <Route path="/admindashboard" element={<SuperadminDashboard />} />
        <Route path="/admins" element={<Admin />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
