import React, { useEffect, useState } from 'react';
import Sidebar from '../../../utils/sidebar';
import axios from 'axios';
import decodeToken from '../../../utils/jwtdecode';

const AdminProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [adminname, setadminname] = useState("");
  const [adminemail, setadminemail] = useState("");
  const [totaltelcaller, settotaltelcaller] = useState();
  const [status, setstatus] = useState();
  const [leadcount, setleadcount] = useState();
  const [topTelecallers, setTopTelecallers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const adminDetails = JSON.parse(localStorage.getItem("admindetails"));
    if (adminDetails) {
      setadminname(adminDetails.username);
      setadminemail(adminDetails.email);
      settotaltelcaller(adminDetails.telecallers.length);
      setstatus(adminDetails.status);
    }

    const getleadandtelecaller = async () => {
      try {
        const token = localStorage.getItem("token");
        const tokenvalidation = decodeToken(token);
        const databasename = tokenvalidation.databaseName;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getadmindetails`, {
          headers: {
            "database": databasename
          }
        });
        if (response.data.success) {
          setleadcount(response.data.leadCount);
          setTopTelecallers(response.data.topTelecallers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getleadandtelecaller();
  }, []);

  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className={`w-2 h-2 rounded-full ${status === "active" ? "bg-emerald-400" : "bg-gray-400"}`}></span>
          <span className="text-gray-400">{status === "active" ? "Active" : "Inactive"}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={() => setIsEditMode(true)}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-900 transition shadow-lg shadow-indigo-500/20"
        >
          Edit Profile
        </button>
        <button
          onClick={() => setIsChangePassword(true)}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:from-gray-800 hover:to-gray-950 transition"
        >
          Security
        </button>
      </div>
    </div>
  );

  const renderProfileCard = () => (
    <div className="bg-gradient-to-br from-[#1E1F2D] to-[#2E2F3D] rounded-2xl p-4 md:p-8 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl md:text-4xl text-white font-bold">{adminname.charAt(0)}</span>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-emerald-500 rounded-full p-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{adminname}</h2>
              <p className="text-indigo-400 font-medium mb-1">Administrator</p>
              <p className="text-gray-400">{adminemail}</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Member since</p>
                <p className="text-white font-semibold">Jan 2024</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Performance</p>
                <p className="text-emerald-400 font-semibold">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      <div className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 rounded-2xl p-4 md:p-6 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-sm text-indigo-400">Total Telecallers</span>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{totaltelcaller}</h3>
          <span className="text-emerald-400 text-sm">↑ 12%</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 md:p-6 border border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <span className="text-sm text-purple-400">Active Projects</span>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-white">8</h3>
          <span className="text-emerald-400 text-sm">↑ 8%</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl p-4 md:p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-sm text-emerald-400">Total Leads</span>
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-white">{leadcount}</h3>
          <span className="text-emerald-400 text-sm">↑ 24%</span>
        </div>
      </div>
    </div>
  );

  const renderTelecallers = () => (
    <div className="bg-[#1E1F2D] rounded-2xl p-4 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-white">Top 3 Telecallers</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2 bg-[#2A2B3D] text-gray-400 rounded-lg hover:bg-[#3A3B4D] transition">
            Filter
          </button>
          <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Add New
          </button>
        </div>
      </div>
      
      {topTelecallers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topTelecallers.map((caller) => {
            const names = caller.username.split(' ');
            const avatarText = names.length > 1 
              ? `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}` 
              : names[0].charAt(0).toUpperCase();
            
            return (
              <div
                key={caller._id}
                className="group bg-gradient-to-br from-[#2A2B3D] to-[#2E2F3D] rounded-xl p-4 md:p-6 hover:from-[#2E2F3D] hover:to-[#3A3B4D] transition duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-base md:text-lg text-white font-bold">
                          {avatarText}
                        </span>
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#2A2B3D] ${
                          caller.status === "active"
                            ? "bg-emerald-500"
                            : "bg-gray-500"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-indigo-400 transition">
                        {caller.username}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-400">ID: TC-{caller._id}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Leads</span>
                    <span className="text-white font-medium">{caller.leads}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Calls</span>
                    <span className="text-white font-medium">{caller.calls}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Pending</span>
                    <span className="text-gray-300">{caller.pending}</span>
                  </div>
                  <button className="w-full py-2.5 mt-2 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-900 transition shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No top telecallers available</p>
      )}
    </div>
  );

  const renderEditProfile = () => (
    <div className="bg-[#1E1F2D] rounded-2xl p-4 md:p-8 shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Edit Profile</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              defaultValue={adminname}
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Email</label>
            <input
              type="email"
              defaultValue={adminemail}
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Role</label>
            <input
              type="text"
              defaultValue="Administrator"
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Location</label>
            <input
              type="text"
              defaultValue="New York, USA"
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => setIsEditMode(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-900 transition shadow-lg shadow-indigo-500/20"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  const renderChangePassword = () => (
    <div className="bg-[#1E1F2D] rounded-2xl p-4 md:p-8 shadow-xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-8">Security Settings</h2>
      <form className="space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Current Password</label>
            <input
              type="password"
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-3 bg-[#2A2B3D] border border-gray-600 rounded-xl text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => setIsChangePassword(false)}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-900 transition shadow-lg shadow-indigo-500/20"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );

  const renderMobileMenuButton = () => (
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2A2B3D] text-white hover:bg-[#3A3B4D] transition"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[rgba(23,24,33,1)]">
      <div className={`lg:w-[250px] w-[250px] fixed lg:static top-0 left-0 h-full z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      {renderMobileMenuButton()}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto lg:ml-0 ml-0">
        {renderHeader()}
        {isEditMode ? renderEditProfile() :
         isChangePassword ? renderChangePassword() : (
          <>
            {renderProfileCard()}
            {renderStats()}
            {renderTelecallers()}
          </>
         )}
      </div>
    </div>
  );
};

export default AdminProfile;