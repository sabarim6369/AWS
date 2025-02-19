import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUsers, 
  FiTarget, 
  FiShield, 
  FiRefreshCw,
  FiLock,
  FiX,
  FiCheck,
  FiEdit2
} from "react-icons/fi";
import Sidebar from "../../../utils/sidebar";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const SuperadminProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isHovering, setIsHovering] = useState(null);
  const[superadminid,setsuperadminid]=useState();
  const[activeadmin,setactiveadmins]=useState(0);
  const [superadmindata, setsuperadmindata] = useState({
    superadmindata: null,
    admindata: null,
    totalTelecallers: 0,
    totalleads: 0
  });
useEffect(()=>{
const token=localStorage.getItem("token");
 if (token) {
        const tokenvalidation = jwtDecode(token);
        console.log("Decoded Token:", tokenvalidation);
        setsuperadminid(tokenvalidation.adminId);
        
      }
},[])
useEffect(() => {
  if (superadminid) {
    
    const getadmindata = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/superadmin/getsuperadmindata/${superadminid}`, {
          headers: { "database": "superadmin" }
        });
        console.log("Admin Data:", response.data);
        setsuperadmindata({
          superadmindata: response.data.superadmindata,
          admindata: response.data.admindata,
          totalTelecallers: response.data.totalTelecallers,
          totalleads: response.data.totalleads,
        });   
        const activeAdminsCount = response.data.admindata.filter(admin => admin.status === "active").length;
        setactiveadmins(activeAdminsCount)
      } 
        catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    getadmindata();
  }
}, [superadminid]); 

  const handleChangePassword = () => {
    console.log("New Password:", newPassword);
    setShowPasswordForm(false);
    setNewPassword("");
  };

  const stats = [
    { label: "Total Admins", value:superadmindata?.admindata?.length || 0, icon: FiUsers },
    { label: "Active Admins", value: activeadmin, icon: FiRefreshCw },

    { label: "Total Telecallers", value: superadmindata.totalTelecallers, icon: FiTarget },
    { label: "Total Leads", value: superadmindata.totalleads, icon: FiShield },
  ];
  if (!superadmindata) {
    return   <div className="flex h-screen bg-gray-900">
    <div className="lg:w-[250px] w-0">
      <Sidebar />
    </div><div className="text-white">Loading...</div>
    </div>;
  }
  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen w-full p-8 overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full flex flex-col items-center"
        >
          <div className="w-full max-w-6xl bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
            <div className="relative flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <FiLock className="w-4 h-4" />
                Change Password
              </motion.button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} className="relative group">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  S
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 cursor-pointer"
                >
                  <FiEdit2 className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{superadmindata.superadmindata?.username}</h2>
                <p className="text-gray-400 text-lg mb-4">{superadmindata.superadmindata?.email}</p>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Active</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Full Access</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setIsHovering(index)}
                  onHoverEnd={() => setIsHovering(null)}
                  className="relative bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      scale: isHovering === index ? 1.1 : 1,
                      color: isHovering === index ? "#60A5FA" : "#9CA3AF"
                    }}
                    className="absolute top-4 right-4"
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {showPasswordForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                    <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleChangePassword}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium text-white"
                        >
                          <FiCheck className="w-5 h-5" />
                          Save Changes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPasswordForm(false)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-500 px-6 py-3 rounded-lg font-medium text-white"
                        >
                          <FiX className="w-5 h-5" />
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperadminProfile;
