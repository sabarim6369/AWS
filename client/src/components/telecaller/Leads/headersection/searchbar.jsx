import React from 'react'

const Searchbar = ({options}) => {
  return (
    <div className="flex mb-6">
    <div className="p-2 relative w-full max-w-[300px] md:max-w-[500px] md:ml-0">
      <i className="fa fa-search text-2xl text-white absolute left-4 top-1/2 transform -translate-y-1/2"></i>
      <input
        className="p-2 pl-12 rounded-xl bg-gray-700 text-white w-full"
        placeholder="Search here..."
      />
    </div>
    <div className="status flex items-center">
      <div className="p-2 ml-3 bg-blue-500 rounded-2xl">
        <select
          name=""
          id=""
          className="bg-transparent text-black outline-none"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
  )
}

export default Searchbar