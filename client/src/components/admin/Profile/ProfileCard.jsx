import React from 'react';

const ProfileCard = ({ adminname, adminemail }) => (
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

export default ProfileCard;