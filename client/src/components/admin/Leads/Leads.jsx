import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../../../utils/sidebar';
import Toolmodal from './popup/toolmodal';
import Addpopup from './popup/addpopup';
import decodeToken from '../../../utils/jwtdecode';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import * as XLSX from "xlsx";
import ImportPopup from './popup/importpopup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Viewmore from './popup/viewmore';
import Assignlead from './popup/assignlead';
import Leadscard from './leadcards/leads'
import Searchbar from './headersection/searchbar';
const Leads = () => {
  const [opentools, setopentools] = useState(false);
  const [popup, setispopupopen] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [adminid, setadminid] = useState("");
  const [telecallerdata, settelecallerdata] = useState([]);
  const [selectedtelecaller, setselectedtelecaller] = useState(null);
  const options = ["Option 1", "Option 2", "Option 3"];
  const [type, settype] = useState("");
  const [importPopup, setImportPopup] = useState(false);
  const [importedleaddata, setimportedleaddata] = useState([]);
  const [databasename, setdatabasename] = useState("");
  const [selectedleadforassignment, setselectedtleadforassignment] = useState("");
  const [availabletelecallers, setavailabletelecallers] = useState([]);
  const [leadassignpopup, setleadassignpopup] = useState(false);
  const [telecallers, setTelecallers] = useState([]);
  const [leads, setLeads] = useState([]);

  const fetchLeads = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const tokenvalidation = decodeToken(token);
      const databaseName = tokenvalidation.databaseName;
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getallleads`, {
        headers: { "database": databaseName }
      });
      console.log(response.data)
      settelecallerdata(response.data.allleads);
      return response.data.allleads;
    } catch (error) {
      console.error("Error fetching leads:", error);
      // toast.error("Failed to fetch latest leads");
      return null;
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      setloading1(true);
      const token = localStorage.getItem("token");
      const tokenvalidation = decodeToken(token);
      const adminId = tokenvalidation.adminId;
      const databaseName = tokenvalidation.databaseName;
      
      setadminid(adminId);
      setdatabasename(databaseName);
      
      await fetchLeads();
      setloading1(false);
    };

    initialize();
  }, [fetchLeads]);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const newLeads = await fetchLeads();
      if (newLeads) {
        const currentIds = new Set(telecallerdata.map(lead => lead._id));
        const hasChanges = newLeads.some(lead => !currentIds.has(lead._id)) ||
                          telecallerdata.length !== newLeads.length;
        
        if (hasChanges) {
          settelecallerdata(newLeads);
        }
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [fetchLeads, telecallerdata]);

  const openmodel = () => {
    setopentools(!opentools);
  };

  const add = async (data) => {
    setopentools(!opentools);
    if (data === "admin") {
      setispopupopen(true);
      settype("admin");
    } else {
      setispopupopen(true);
      settype("telecaller");
    }
  };

  const viewmore = (telecaller) => {
    setselectedtelecaller(telecaller);
  };

  const assignleadwithtelecaller = async (telecallerid) => {
    try {
      const response = await axios.put(
       `${process.env.REACT_APP_API_URL}/admin/assign-leads`,
        { telecallerId: telecallerid, leadId: selectedleadforassignment },
        { headers: { "database": databasename } }
      );

      toast.success("Lead assigned successfully!", { position: "top-right" });
      await fetchLeads();
      setleadassignpopup(false);

    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message || "Error assigning lead", { position: "top-right" });
      } else {
        toast.error("Network error! Please try again.", { position: "top-right" });
      }
    }
  };

  const Assignleads = async (telecallerid) => {
    setleadassignpopup(true);
    setselectedtleadforassignment(telecallerid);
    try {
      const response = await axios.get(
     `${process.env.REACT_APP_API_URL}/admin/getalltelecaller`,
        { headers: { "database": databasename } }
      );
      setavailabletelecallers(response.data.alltelecallers);
    } catch (error) {
      toast.error("Failed to fetch telecallers");
      console.error(error);
    }
  };

  const closeModal = () => {
    setselectedtelecaller(null);
  };

  const openImportPopup = () => {
    setopentools(false);
    setImportPopup(true);
  };

  const openassignleads = async () => {
    try {
      const response = await axios.put(
       `${process.env.REACT_APP_API_URL}/admin/assignallleads`,
        {},
        { headers: { "database": databasename } }
      );

      toast.success(response.data.message || "Leads assigned successfully.");
      await fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to assign leads.");
      console.error("Error:", error);
    }
  };
  const swapleads=async()=>{
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/swapallleads`,
        {},
        { headers: { "database": databasename } }
      );

      toast.success(response.data.message || "Leads swapped successfully.");
      await fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to swap leads.");
      console.error("Error:", error);
    }
  }

  const closeImportPopup = () => {
    setImportPopup(false);
  };

  const handleFileImport = async (allImportedData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/addleads`,
        { leadsData: allImportedData,adminid },
        { headers: { "database": databasename } }
      );

      if (response.status === 201) {
        toast.success("Leads uploaded successfully!");
        closeImportPopup();
        await fetchLeads();
      } else {
        toast.error("Unexpected response from server.");
      }

    } catch (err) {
      console.error("Error uploading leads:", err);
      if (err.response) {
        toast.error(`Error: ${err.response.data.message || "Please try again."}`);
      } else if (err.request) {
        toast.error("Network error: No response received from the server.");
      } else {
        toast.error("Error uploading leads. Please try again.");
      }
    }
  };

  if (loading1) {
    return (
      <div className="flex h-screen bg-gray-900">
        <div className="lg:w-[250px] w-0">
          <Sidebar />
        </div>
        <div className="flex-grow flex justify-center items-center">
          <HashLoader color="#36d7b7" size={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-4 md:p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl text-white">Leads</h1>
          <div
            className="hidden sm:block text-white ml-auto mr-3 cursor-pointer"
            onClick={openmodel}
          >
            <i className="fa fa-bars"></i>
          </div>
          <div
            className="lg:hidden text-white ml-auto mr-3 cursor-pointer"
            onClick={openmodel}
          >
            <i className="fa fa-bars"></i>
          </div>
          <div className="">
            <Toolmodal
              opentools={opentools}
              add={add}
              openImportPopup={openImportPopup}
              openassignleads={openassignleads}
              swapleads={swapleads}
            />
          </div>
        </div>

      <Searchbar
      options={options}
      />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Leadscard
            telecallerdata={telecallerdata}
            viewmore={viewmore}
            Assignleads={Assignleads}
          />
        </div>

        {selectedtelecaller && (
          <Viewmore
            selectedtelecaller={selectedtelecaller}
            closeModal={closeModal}
          />
        )}
        {leadassignpopup && (
          <Assignlead
            setleadassignpopup={setleadassignpopup}
            availableTelecallers={availabletelecallers}
            assignLeadWithTelecaller={assignleadwithtelecaller}
          />
        )}

        <ImportPopup
          isOpen={importPopup}
          closePopup={closeImportPopup}
          handleFileImport={handleFileImport}
        />

        <Addpopup
          popup={popup}
          setispopupopen={setispopupopen}
          type={"Telecaller"}
          adminid={adminid}
        />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Leads;