import React from 'react';

const Header = ({ status, setIsEditMode, setIsChangePassword }) => (
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

export default Header;