import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, Save, ClipboardList, Slash, CheckCircle } from "lucide-react";

const Notes = ({ setopennotespopup, leadfornotes, databasename, telecallerid }) => {
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(leadfornotes?.status || "unassigned");
  const [callbackTime, setCallbackTime] = useState("");
  const [callAnswered, setCallAnswered] = useState(null);

  useEffect(() => {
    setStatus(leadfornotes?.status || "unassigned");
    // setCallbackTime(leadfornotes?.callbackTime || "");
    if (leadfornotes?.notes?.length > 0) {
      setNewNote(leadfornotes.notes[leadfornotes.notes.length - 1]?.note || "");
    }
  }, [leadfornotes]);

  const handleNoteChange = (event) => setNewNote(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleCallbackTimeChange = (event) => setCallbackTime(event.target.value);

  const saveNotes = async (noteText, answered) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/telecaller/addnotes`,
        {
          telecallerId: telecallerid,
          leadId: leadfornotes?._id,
          note: noteText,
          status: answered ? status : leadfornotes.status,
          callbackTime: callbackTime ? new Date(callbackTime).toISOString() : null,
          answered
        },
        { headers: { database: databasename } }
      );

      if (response.status === 200) toast.success("Notes added successfully");
      setopennotespopup(false);
    } catch (error) {
      console.error("Error while saving notes:", error);
      toast.error("Failed to save note.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{leadfornotes?.name}</h2>
          <button onClick={() => setopennotespopup(false)} className="text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Previous Notes */}
        {leadfornotes?.notes?.length > 0 ? (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg max-h-40 overflow-y-auto">
            <h3 className="text-sm font-medium flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" /> Previous Notes:
            </h3>
            <ul className="space-y-2 mt-2">
              {leadfornotes.notes.map((noteObj, index) => (
                <li key={index} className="p-2 border rounded-md">
                  <p className="text-sm">{noteObj.note}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By: {noteObj.telecallerId?.username || "Unknown"} |{" "}
                    {new Date(noteObj.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-3">No previous notes available.</p>
        )}

        {/* Answered / Not Answered Buttons */}
        {callAnswered === null && (
          <div className="flex justify-center mt-4 space-x-3">
            <button
              onClick={() => {
                setCallAnswered(true);
                setNewNote("");
              }}
              className="px-4 py-2 rounded-md text-sm flex items-center bg-green-500 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-1" /> Answered
            </button>
            <button
              onClick={() => {
                setCallAnswered(false);
                saveNotes("Not Answered", false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center text-sm"
            >
              <Slash className="w-4 h-4 mr-1" /> Not Answered
            </button>
          </div>
        )}

        {/* Show Note Input Only If Answered */}
        {callAnswered && (
          <>
            <div className="mt-4">
              <textarea
                className="w-full p-3 border rounded-md text-sm"
                rows="3"
                placeholder="Add your note here..."
                value={newNote}
                onChange={handleNoteChange}
              />
            </div>

            {/* Status Selection */}
            <div className="mt-4">
              <label className="block text-sm text-gray-700">Change Status:</label>
              <select
                className="w-full p-2 mt-1 border rounded-md text-sm"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="assigned">Assigned</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="hot">Hot</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-700">Set Callback Time:</label>
              <input
                type="datetime-local"
                className="w-full p-2 mt-1 border rounded-md text-sm"
                value={callbackTime}
                onChange={handleCallbackTimeChange}
              />
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setopennotespopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => saveNotes(newNote, true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center text-sm"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notes;
