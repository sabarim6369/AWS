import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Fullfilment = () => {
    const fulfillmentData = [
        { name: 'Jan', value: 4000, value2: 3000 },
        { name: 'Feb', value: 3000, value2: 2800 },
        { name: 'Mar', value: 5000, value2: 4800 },
        { name: 'Apr', value: 4500, value2: 4000 },
        { name: 'May', value: 6000, value2: 5800 },
        { name: 'Jun', value: 5500, value2: 5000 }
      ];
  return (
<div className="w-full lg:w-[30%] bg-gray-700 rounded-2xl p-4">
            <h1 className="text-white text-xl font-bold mb-4">Fulfilment</h1>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fulfillmentData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorValue2"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="value2"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorValue2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>  )
}

export default Fullfilment