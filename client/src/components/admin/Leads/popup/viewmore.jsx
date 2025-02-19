import React from 'react'

const Viewmore = ({selectedtelecaller,closeModal}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-2xl w-[60%] max-w-3xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        {selectedtelecaller.username}
      </h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          <strong>Email:</strong> {selectedtelecaller.email}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Phone:</strong> +{selectedtelecaller.mobilenumber}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Address:</strong>{" "}
          {selectedtelecaller.address || "No address available"}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Status:</strong> {selectedtelecaller.status}
        </p>
        <p className="text-lg text-gray-600">
          <strong>Role:</strong> {selectedtelecaller.role}
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="py-2 px-6 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>  )
}

export default Viewmore