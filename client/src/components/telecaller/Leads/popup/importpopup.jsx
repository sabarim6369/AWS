import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

const ImportPopup = ({ isOpen, closePopup, handleFileImport }) => {
  const fileInputRef = useRef(null);
  const [importedFiles, setImportedFiles] = useState([]);

  if (!isOpen) return null;

  const handleFileSelection = (event) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    setImportedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setImportedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (importedFiles.length === 0) return;

    const allImportedData = [];
    for (let file of importedFiles) {
      const fileData = await processSingleFile(file);
      allImportedData.push(...fileData);
    }

    handleFileImport(allImportedData); 
    setImportedFiles([]);
    // closePopup();
  };

  const processSingleFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        resolve(jsonData); 
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30%]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Import Leads</h2>
        <p className="text-gray-600 mb-4">Upload Excel files (.xlsx or .xls)</p>

        <div className="flex flex-col gap-2">
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => fileInputRef.current.click()}
          >
            Choose Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xls,.xlsx"
            multiple
            onChange={handleFileSelection}
          />

          <ul className="text-gray-800 text-sm mt-2 p-2">
            {importedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center p-1">
                {file.name}
                <button
                  className="text-red-500 ml-2"
                  onClick={() => removeFile(index)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={processFiles}
            disabled={importedFiles.length === 0}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPopup;
