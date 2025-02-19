import React from 'react'

const Toolmodal = ({opentools,add}) => {
    if (!opentools) return null;
  return (
    opentools && (
      <div className="tools-modal absolute top-[60px] right-5 p-4 ml-auto w-[30%] bg-gray-800 rounded-lg z-1000 md:w-[10%] md:right-10">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            add("admin");
          }}
        >
          <i className="fa fa-add text-white"></i>
          <h3 className="text-white ml-3 ">Add Admin</h3>
        </div>
        <div
          className="flex items-center cursor-pointer mt-4"
          onClick={() => {
            add("telecaller");
          }}
        >
          <i className="fa fa-add text-white"></i>
          <h3 className="text-white ml-3 text-wrap">Add Telecaller</h3>
        </div>
        <div className=""></div>
      </div>
    )
  );
}

export default Toolmodal