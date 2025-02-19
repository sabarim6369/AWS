import React from "react";

const Toolmodal = ({ opentools, add, openImportPopup,openassignleads,swapleads }) => {
  if (!opentools) return null;

  return (
    <div className="tools-modal absolute top-[60px] right-5 p-4 ml-auto w-[30%] bg-gray-800 rounded-lg z-1000 md:w-[10%] md:right-10">
      <div className="flex items-center cursor-pointer" onClick={() => add("admin")}>
        <i className="fa fa-add text-white"></i>
        <h3 className="text-white ml-3">Add Leads</h3>
      </div>

      <div className="flex items-center cursor-pointer mt-4" onClick={openImportPopup}>
        <i className="fa fa-upload text-white"></i>
        <h3 className="text-white ml-3 text-wrap">Import Leads</h3>
      </div>
      <div className="flex items-center cursor-pointer mt-4" onClick={openassignleads}>
        <i className="fa fa-add text-white"></i>
        <h3 className="text-white ml-3 text-wrap">Assign Leads</h3>
      </div>
      <div className="flex items-center cursor-pointer mt-4" onClick={swapleads}>
        <i className="fa fa-exchange-alt text-white"></i>
        <h3 className="text-white ml-3 text-wrap">Swap Leads</h3>
      </div>
    </div>
  );
};

export default Toolmodal;
