import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Callinsights = () => {
    const callInsightsData = [
        { name: 'Jan', value: 300 },
        { name: 'Feb', value: 400 },
        { name: 'Mar', value: 200 },
        { name: 'Apr', value: 500 },
        { name: 'May', value: 300 },
        { name: 'Jun', value: 400 },
        { name: 'Jul', value: 600 },
        { name: 'Aug', value: 400 },  
        { name: 'Sep', value: 500 },
        { name: 'Oct', value: 450 },
        { name: 'Nov', value: 550 },
        { name: 'Dec', value: 650 }
      ];
    
  return (
    <div className="w-full lg:w-[70%] bg-gray-700 rounded-2xl p-4">
    <h1 className="text-white font-bold text-xl mb-4">Call Insights</h1>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={callInsightsData}>
          <defs>
            <linearGradient id="colorInsights" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#20AEF3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#20AEF3" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Area type="monotone" dataKey="value" stroke="#20AEF3" fillOpacity={1} fill="url(#colorInsights)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
  )
}

export default Callinsights