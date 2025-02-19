import React, { useEffect, useState } from 'react';
import Sidebar from '../../../utils/sidebar';
import axios from 'axios'
const mockAdmins = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', telecallers: 15, leads: 450, activeLeads: 200, convertedLeads: 150 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', telecallers: 20, leads: 600, activeLeads: 250, convertedLeads: 180 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Admin', telecallers: 10, leads: 200, activeLeads: 70, convertedLeads: 50 },
];

const Admin = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const[admins,setadmins]=useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/superadmin/getadmins`, {
          headers: { "database": "superadmin" }
        });
  console.log(response.data)
        if (response.data && Array.isArray(response.data.admindata)) {
          setadmins(response.data.admindata);
        } else {
          console.error("Unexpected API response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching admins", error);
      }
    };
  
    getAdmins();
  }, []);
  
  const handlePasswordChange = (adminId) => {
    console.log(`Changing password for admin ${adminId} to ${newPassword}`);
    setNewPassword('');
    setSelectedAdmin(null);
    setDropdownVisible(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="lg:w-[250px] w-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-white text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {admins.map((admin) => (
  <div key={admin._id} className="bg-white/10 rounded-lg p-6 backdrop-blur-lg shadow-lg relative">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {admin.username ? admin.username.charAt(0).toUpperCase() : '?'}
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">{admin.username || 'Admin'}</h3>
          <p className="text-gray-400 text-sm">{admin.role || 'Administrator'}</p>
        </div>
      </div>
      <div className="relative">
        <button 
          onClick={() => setDropdownVisible(dropdownVisible === admin._id ? null : admin._id)}
          className="text-white focus:outline-none"
        >
          <i className='fa fa-bars text-lg'></i>
        </button>
        {dropdownVisible === admin._id && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white shadow-lg rounded-md py-2 z-10">
            <button
            
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
    <p className="text-gray-400 text-sm mb-4">{admin.email || 'No email provided'}</p>
    
    <div className="grid grid-cols-2 gap-3 mb-4">
      {[
        { label: 'Telecallers', value: admin.telecallers || 5 },
        { label: 'Total Leads', value: admin.leads || 0 },
      ].map((stat, index) => (
        <div key={index} className="bg-white/10 rounded-lg p-3 text-center">
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-white text-lg font-bold">{stat.value}</p>
        </div>
      ))}
    </div>

    {selectedAdmin === admin._id && (
      <div className="space-y-3">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md text-white focus:ring focus:ring-blue-500"
        />
        <div className="flex justify-between">
          <button
            onClick={() => handlePasswordChange(admin._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
          >
            Save
          </button>
          <button
            onClick={() => { setSelectedAdmin(null); setDropdownVisible(null); }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors w-full ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default Admin;
