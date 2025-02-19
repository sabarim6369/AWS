import React from 'react';

const Toptelecallers = ({ stats }) => {
  return (
    <div className="w-full lg:w-[70%] bg-gray-700 rounded-2xl p-4">
      <h1 className="text-white font-bold text-xl mb-4">Top Telecallers</h1>
      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-64 scrollbar-none">
          <table className="table-auto w-full text-left text-white">
            <thead className="sticky top-0 bg-gray-700">
              <tr className="border-b border-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Insights</th>
                <th className="py-3 px-4 text-center">Calls</th>
              </tr>
            </thead>
            <tbody>
              {stats?.topTelecallers?.length > 0 ? (
                stats.topTelecallers.map((caller, index) => {
                  const callPercentage =
                    caller.totalCalls > 0
                      ? Math.round((caller.confirmedCalls / caller.totalCalls) * 100)
                      : 0;

                  return (
                    <tr key={caller.id} className="border-b border-gray-600">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{caller.username}</td>
                      <td className="py-3 px-4">
                        <div className="h-2 bg-white rounded">
                          <div
                            className="bg-blue-700 h-full"
                            style={{ width: `${callPercentage}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-1 border-2 shadow-md w-max rounded text-center ${
                            callPercentage > 75
                              ? 'border-green-500 text-green-500'
                              : callPercentage > 50
                              ? 'border-blue-500 text-blue-500'
                              : callPercentage > 25
                              ? 'border-amber-500 text-amber-500'
                              : 'border-red-500 text-red-500'
                          }`}
                        >
                          {callPercentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3">
                    No telecallers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Toptelecallers;
