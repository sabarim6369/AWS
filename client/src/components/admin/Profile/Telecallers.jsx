import React from 'react';
import TelecallerCard from './TelecallerCard';

const Telecallers = ({ topTelecallers }) => (
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
        {topTelecallers.map((caller) => (
          <TelecallerCard key={caller._id} caller={caller} />
        ))}
      </div>
    ) : (
      <p className="text-gray-400 text-center">No top telecallers available</p>
    )}
  </div>
);

export default Telecallers;