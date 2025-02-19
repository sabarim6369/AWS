const Leadscard=({telecallerdata,viewmore,Assignleads})=>{
    return(
        <>
    {telecallerdata.map((telecaller, index) => (
        <div
          key={telecaller._id || index}
          className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              {telecaller.name}
            </h2>
            <div className="px-2 py-1 bg-green-500 text-sm text-white rounded-lg">
              {telecaller.status}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-300">
              <i className="fa fa-map-marker-alt text-blue-400 text-lg mr-2"></i>
              <p className="truncate max-w-[250px]">
                {telecaller.address
                  ? telecaller.address
                  : "No address available"}
              </p>
            </div>
            <div className="flex items-center text-gray-300">
              <i className="fa fa-phone-alt text-blue-400 text-lg mr-2"></i>
              <p>+{telecaller.mobilenumber}</p>
            </div>
            <div className="flex items-center text-gray-300">
  <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
  <p>Assigned To: {telecaller.assignedTo && telecaller.assignedTo[0] ? telecaller.assignedTo[0].email : "Not Assigned"}</p>
</div>

          </div>
          <div className="flex justify-between">
            <button
              className="w-24 mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => viewmore(telecaller)}
            >
              View More
            </button>
            <button
              className="w-24 mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => Assignleads(telecaller._id)}
            >
              Assign
            </button>
          </div>
        </div>
      ))}
      </>
    )
    
}

export default Leadscard