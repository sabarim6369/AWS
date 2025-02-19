import React, { useEffect, useState } from 'react';
import axios from 'axios';
import decodeToken from '../../../utils/jwtdecode';
import Sidebar from '../../../utils/sidebar';
import Header from './Header';
import ProfileCard from './ProfileCard';
import Stats from './Stats';
import Telecallers from './Telecallers';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import MobileMenuButton from './MobileMenuButton';

const AdminProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [adminname, setadminname] = useState("");
  const [adminemail, setadminemail] = useState("");
  const [totaltelcaller, settotaltelcaller] = useState();
  const [status, setstatus] = useState();
  const [leadcount, setleadcount] = useState();
  const [topTelecallers, setTopTelecallers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const adminDetails = JSON.parse(localStorage.getItem("admindetails"));
    if (adminDetails) {
      setadminname(adminDetails.username);
      setadminemail(adminDetails.email);
      settotaltelcaller(adminDetails.telecallers.length);
      setstatus(adminDetails.status);
    }

    const getleadandtelecaller = async () => {
      try {
        const token = localStorage.getItem("token");
        const tokenvalidation = decodeToken(token);
        const databasename = tokenvalidation.databaseName;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getadmindetails`, {
          headers: { "database": databasename }
        });
        if (response.data.success) {
          setleadcount(response.data.leadCount);
          setTopTelecallers(response.data.topTelecallers);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getleadandtelecaller();
  }, []);

  return (
    <div className="flex min-h-screen bg-[rgba(23,24,33,1)]">
      <div className={`lg:w-[250px] w-[250px] fixed lg:static top-0 left-0 h-full z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <MobileMenuButton isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-grow p-4 md:p-8 overflow-y-auto lg:ml-0 ml-0">
        <Header status={status} setIsEditMode={setIsEditMode} setIsChangePassword={setIsChangePassword} />
        {isEditMode ? (
          <EditProfile adminname={adminname} adminemail={adminemail} setIsEditMode={setIsEditMode} />
        ) : isChangePassword ? (
          <ChangePassword setIsChangePassword={setIsChangePassword} />
        ) : (
          <>
            <ProfileCard adminname={adminname} adminemail={adminemail} />
            <Stats totaltelcaller={totaltelcaller} leadcount={leadcount} />
            <Telecallers topTelecallers={topTelecallers} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;