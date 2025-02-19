import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeToken from './../../../../utils/jwtdecode';
const Addpopup = ({ popup, setispopupopen, type }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
    address: "",
    adminId: "679877d4c689f160a3d6ca1e" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token=localStorage.getItem("token");
      console.log(token);
      const tokenvalidation=decodeToken(token);
     const adminId=tokenvalidation.adminId;
     const databaseName=tokenvalidation.databaseName;
     console.log(adminId,databaseName)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/add`, formData,{
        headers:{
          "database":databaseName
        }
      });
  
      if (response.status === 401) {
        toast.warning("Fill all fields");
      } else if (response.status === 402) {
        toast.warning("Telecaller with this email already exists.");
      } else if (response.status === 200) {
        toast.success("Telecaller added successfully");
      }
  
      setFormData({
        username: "",
        email: "",
        password: "",
        number: "",
        address: "",
        adminId: "679877d4c689f160a3d6ca1e"
      });
  
      setTimeout(() => {
        setispopupopen(false);
      }, 2000);
    } catch (error) {
      toast.error("Error adding telecaller: " + error.message);
    }
  };
  ;

  return (
    popup && (
      <div className="fixed inset-0 flex items-center justify-center z-1001">
        <div className="absolute inset-0 bg-black opacity-50 z-1000"></div>

        <div className="absolute md:w-[30%] bg-[#efeff3] z-1001 rounded-lg overflow-hidden">
          <div className="flex justify-end p-4">
            <i
              className="fa fa-times text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={() => setispopupopen(false)}
            ></i>
          </div>
          <form className="add-users-model p-6 space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4 text-2xl font-semibold text-black">
              Add {type}
            </h1>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a Password"
              />
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Phone Number"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="p-3 w-[90%] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Address"
              />

              <button
                type="submit"
                className="w-[90%] rounded-lg border border-gray-300 p-3 border-2 border-green-300 hover:border-black hover:border-2 hover:bg-red-400"
              >
                Add
              </button>
            </div>
          </form>
        </div>
              <ToastContainer position="top-center" />
        
      </div>
    )
  );
};

export default Addpopup;
