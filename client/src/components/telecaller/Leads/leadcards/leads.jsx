import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Leadscard = ({ telecallerdata, viewmore, opennotes, databasename }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const openWhatsAppPopup = (number) => {
    setSelectedNumber(number);
    setShowPopup(true);
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const sendWhatsAppMessage = async () => {
    if (!selectedNumber || (!message && selectedFiles.length === 0)) return;

    setLoading(true);  // Start loading

    const formData = new FormData();
    formData.append("number", selectedNumber);
    formData.append("message", message);

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/twillio/sendanyinfo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            database: databasename,
          },
        }
      );

      if (response.data.success) {
        toast.success("Message sent successfully");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      alert("Error sending message: " + error.message);
    }

    setLoading(false);
    setShowPopup(false);
    setMessage("");
    setSelectedFiles([]);
  };

  const cancelmodel = () => {
    setSelectedFiles([]);
    setShowPopup(false);
  };

  return (
    <>
      {telecallerdata.map((telecaller, index) => (
        <div
          key={telecaller._id || index}
          className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{telecaller.name}</h2>
            <div className="px-2 py-1 bg-green-500 text-sm text-white rounded-lg">
              {telecaller.status === "assigned" ? "Pending" : telecaller.status}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-300">
              <i className="fa fa-map-marker-alt text-blue-400 text-lg mr-2"></i>
              <p className="truncate max-w-[250px]">
                {telecaller.address ? telecaller.address : "No address available"}
              </p>
            </div>
            <div className="flex items-center text-gray-300">
              <i className="fa fa-phone-alt text-blue-400 text-lg mr-2"></i>
              <p>+{telecaller.mobilenumber}</p>
            </div>
            <div className="flex items-center text-gray-300">
              <i className="fa fa-envelope text-blue-400 text-lg mr-2"></i>
              <p>{telecaller.assignedTo?.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="w-24 mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => viewmore(telecaller)}
            >
              View More
            </button>
            <button
              className="w-24 mt-auto py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => opennotes(telecaller)}
            >
              Notes
            </button>

            <button onClick={() => openWhatsAppPopup(telecaller.mobilenumber)}>
              <FaWhatsapp size={28} className="text-green-500 hover:text-green-600" />
            </button>
          </div>
        </div>
      ))}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] max-w-full transform transition-all duration-300">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Send WhatsApp Message</h2>

            <textarea
              className="w-full p-3 border-2 rounded-lg mb-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="4"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-4 border-2 border-gray-300 rounded-lg p-3 w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {selectedFiles.length > 0 && (
              <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">Attachments:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm text-gray-700 mt-2">
                    <span className="truncate w-3/4">{file.name}</span>
                    <button
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      onClick={() => removeFile(index)}
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                onClick={cancelmodel}
              >
                Cancel
              </button>

              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                onClick={sendWhatsAppMessage}
                disabled={loading} 
              >
                {loading ? "Sending..." : "Send"} 
              </button>
            </div>
          </div>
        </div>
      )}
            <ToastContainer position="top-center" />
      
    </>
  );
};

export default Leadscard;
