import React, { useEffect,useState} from 'react';
import Sidebar from '../../../utils/sidebar';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const History = () => {
    const[telecallerid,settelecallerid]=useState("");
    const[history,sethistory]=useState([]);
useEffect(()=>{
     const token = localStorage.getItem("token");
          const tokenvalidation = jwtDecode(token);
          console.log(tokenvalidation)
          const databaseName = tokenvalidation.databaseName;
          const userid=tokenvalidation.telecallerId;
          settelecallerid(userid);

    const gettelecallerhistory=async()=>{
        const response=await axios.get(`${process.env.REACT_APP_API_URL}/telecaller/history/${userid}`, {
            headers: { "database": databaseName }
          });
          sethistory(response.data.history)
          console.log(response.data.history)

    }
    gettelecallerhistory();
},[])
    return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-100 border-b-2 border-gray-600 pb-2">History</h1>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse text-left text-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 uppercase text-sm font-semibold">
                <th className="p-4">Lead ID</th>
                <th className="p-4">Action</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Callback scheduled</th>

                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
  {[...history]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sorting in descending order
    .map((item, index) => (
      <tr
        key={item._id}
        className={`border-b border-gray-700 ${
          index % 2 === 0 ? 'bg-gray-750' : 'bg-gray-700'
        } hover:bg-gray-600 transition-all duration-200 rounded-lg`}
      >
        <td className="p-4 text-sm font-mono text-gray-300">{item.leadId?.name || "N/A"}</td>
        <td className="p-4 font-medium text-green-400">{item.leadId?.mobilenumber}</td>
        <td className="p-4 italic text-gray-400 truncate max-w-xs overflow-hidden">{item.notes}</td>
        <td className="p-4 italic text-gray-400">
            {item?.callbackScheduled?item?.callbackTime:"No callback Scheduled"}
        </td>
        <td className="p-4 text-sm text-blue-300">{formatDate(item.timestamp)}</td>
      </tr>
    ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
