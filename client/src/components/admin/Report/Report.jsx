import Sidebar from "../../../utils/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import decodeToken from "../../../utils/jwtdecode";

const Report = () => {
  const [databaseName, setDatabaseName] = useState();
  const [rows, setRows] = useState([]);
  const [leads, setLeads] = useState([]);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [selectedLeadData, setSelectedLeadData] = useState({});
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getLeadData = async () => {
      const token = localStorage.getItem("token");
      const tokenValidation = decodeToken(token);
      const databaseName = tokenValidation.databaseName;
      setDatabaseName(databaseName);

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getallleads`, {
        headers: { "database": databaseName }
      });
      console.log(response.data.allleads);
      setLeads(response.data.allleads);
    };

    getLeadData();
    const array = Array(20).fill(null);
    setRows(array);
  }, []);

  const setViewModelOpen = async (leadId) => {
    const leadData = leads.find((lead) => lead._id === leadId);
    console.log(leadData);
    setSelectedLeadData(leadData);

    
    setOpenViewModel(true);
  };

  const closeViewModel = () => {
    setOpenViewModel(false);
    setSelectedLeadData({});
    setNotes([]);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="lg:w-[250px] w-0">
          <Sidebar />
        </div>

        <div className="flex-grow p-6 overflow-auto">
          <div className="p-2 relative w-full max-w-md mb-8">
            <i className="fa fa-search text-2xl text-white absolute left-4 top-1/2 transform -translate-y-1/2"></i>
            <input
              className="p-3 pl-12 rounded-xl bg-gray-700 text-white w-full"
              placeholder="Search here..."
            />
          </div>

          <div className="text-white text-2xl ml-3 mb-4">Caller's List</div>

          <div className="overflow-auto max-h-[570px] scrollbar-none">
            <table className="table-auto text-white w-full text-left mt-5">
              <thead className="sticky top-0 bg-custom-gray">
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Insights</th>
                  <th className="py-2 px-4">Calls</th>
                  <th className="py-2 px-4">Caller Type</th>
                  <th className="py-2 px-4">View Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{lead.name}</td>
                    <td className="py-2 px-4">
                      <div className="w-2/3 bg-gray-500 h-2">
                        <div className="bg-blue-600 h-full w-[46%]"></div>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="pt-1 pb-1 pl-3 pr-3 border-2 border-amber-500 bg-neutral-800 text-amber-500 shadow-md w-max rounded text-center">
                        46%
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="pt-1 pb-1 pl-4 pr-4 border-2 border-red-500 bg-neutral-800 text-red-500 shadow-md w-max rounded text-center">
                        {lead.status}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="pt-1 pb-1 pl-4 pr-4 border-2 border-blue-500 bg-neutral-800 text-blue-500 shadow-md w-max rounded text-center cursor-pointer hover:bg-red-700"
                        onClick={() => {
                          setViewModelOpen(lead._id);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {openViewModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-[600px] shadow-xl relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                onClick={closeViewModel}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-4">Lead Details</h2>
              <div className="mb-6">
                <p className="text-lg p-1">
                  <strong>ID:</strong> {selectedLeadData._id}
                </p>
                <p className="text-lg p-1">
                  <strong>Name:</strong> {selectedLeadData.name}
                </p>
                <p className="text-lg p-1">
                  <strong>Email:</strong> {selectedLeadData.email}
                </p>
                <p className="text-lg p-1">
                  <strong>Phone:</strong> {selectedLeadData.mobilenumber}
                </p>
                <h1 className="text-lg p-1 font-bold mb-4">
                  Notes:
                  <div className="overflow-y-auto max-h-[300px]">
                    {selectedLeadData.notes &&
                      selectedLeadData.notes.map((note, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-lg mb-4 shadow-md border-l-4 border-blue-500"
                        >
                          <p className="text-gray-800 text-sm font-medium">
                            {note.note}
                          </p>
                          {/* <p className="text-xs text-gray-500 mt-1">
                            By:{note.telecallerId?.username || "Unknown"} |{" "}
                          </p> */}
                        </div>
                      ))}
                  </div>
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Report;
