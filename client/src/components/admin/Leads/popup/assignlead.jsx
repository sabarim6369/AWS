import React from 'react'
const Assignlead = ({ setleadassignpopup, availableTelecallers, assignLeadWithTelecaller }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-2xl w-[60%] max-w-3xl shadow-lg h-[60%] overflow-y-auto scrollbar-none">
          <div className="flex justify-end">
            <i className="fa fa-close cursor-pointer" onClick={() => setleadassignpopup(false)}></i>
          </div>
  
          <h2 className="text-xl font-semibold mb-4 text-center">Available Telecallers</h2>
  
          <div className="flex justify-between font-bold p-2 border-b bg-gray-200">
            <div className="w-1/3">Email</div>
            <div className="w-1/3">Pending</div>
            <div>Assign</div>
          </div>
  
          {availableTelecallers.map((telecaller) => (
            <div key={telecaller._id} className="flex justify-between p-2 border-b">
              <div className="w-1/3">{telecaller.email}</div>
              <div className="w-1/3">{telecaller.pending}</div>
              <button
                className="bg-blue-500 p-2 rounded-lg text-white"
                onClick={() => assignLeadWithTelecaller(telecaller._id)}
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  

export default Assignlead