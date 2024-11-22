import React, { useEffect, useState } from "react";
import axios from "axios";

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discount: 0,
    expirationDate: "",
  });

  // Fetch all vouchers
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("https://ma-1.onrender.com/api/vouchers");
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  // Handle input changes for the voucher form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({ ...newVoucher, [name]: value });
  };

  // Create a new voucher
  const createVoucher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://ma-1.onrender.com/api/vouchers", newVoucher);
      setVouchers([...vouchers, response.data]);
      setShowForm(false); // Hide the form after submission
      setNewVoucher({ code: "", discount: 0, expirationDate: "" }); // Reset the form
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  // Delete a voucher
  const deleteVoucher = async (id) => {
    try {
      await axios.delete(`https://ma-1.onrender.com/api/vouchers/${id}`);
      setVouchers(vouchers.filter((voucher) => voucher._id !== id));
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  const isExpired = (expirationDate) => {
    const now = new Date();
    return new Date(expirationDate) < now;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Voucher Management</h2>

      {/* Toggle Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {showForm ? "Cancel" : "Add New Voucher"}
      </button>

      {/* Voucher Form */}
      {showForm && (
        <form onSubmit={createVoucher} className="mb-4 p-4 border rounded bg-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Voucher Code</label>
            <input
              type="text"
              name="code"
              value={newVoucher.code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={newVoucher.discount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Expiration Date</label>
            <input
              type="date"
              name="expirationDate"
              value={newVoucher.expirationDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Add Voucher
          </button>
        </form>
      )}

      {/* Vouchers Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Code</th>
            <th className="py-2 px-4 border-b text-left">Discount</th>
            <th className="py-2 px-4 border-b text-left">Expiration Date</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher._id}>
              <td className="py-2 px-4 border-b">{voucher.code}</td>
              <td className="py-2 px-4 border-b">{voucher.discount}%</td>
              <td className="py-2 px-4 border-b">
                {new Date(voucher.expirationDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {isExpired(voucher.expirationDate) ? (
                  <span className="text-red-500">Expired</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => deleteVoucher(voucher._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoucherManagement;
