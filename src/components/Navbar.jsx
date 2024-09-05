import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
