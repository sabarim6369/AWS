import React from 'react';

const MobileMenuButton = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <button
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2A2B3D] text-white hover:bg-[#3A3B4D] transition"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

export default MobileMenuButton;