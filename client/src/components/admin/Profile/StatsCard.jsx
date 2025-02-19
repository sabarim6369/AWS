import React from 'react';

const StatsCard = ({ icon, title, value, change, color }) => (
  <div className={`bg-gradient-to-br from-${color}-500/10 to-${color}-600/10 rounded-2xl p-4 md:p-6 border border-${color}-500/20`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-${color}-500/20 rounded-xl`}>
        {icon}
      </div>
      <span className={`text-sm text-${color}-400`}>{title}</span>
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-2xl md:text-3xl font-bold text-white">{value}</h3>
      <span className="text-emerald-400 text-sm">↑ {change}%</span>
    </div>
  </div>
);

export default StatsCard;