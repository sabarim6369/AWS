import React from 'react'
import GaugeChart from 'react-gauge-chart';

const LeadStatus = () => {
    const chartStyle = {
        height: 200,
        width: '100%'
      };
  return (
<div className="w-full lg:w-[30%] bg-gray-700 rounded-2xl p-4">
            <h1 className="text-white text-xl font-bold mb-4">Lead Status</h1>
            <div className="mt-4">
              <GaugeChart
                id="gauge-chart1"
                style={chartStyle}
                nrOfLevels={3}
                colors={["#FF5F6D", "#FFC371", "#2ECC71"]}
                arcWidth={0.3}
                percent={0.8}
                textColor="#ffffff"
              />
            </div>
          </div>  )
}

export default LeadStatus