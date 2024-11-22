import React, { useEffect, useState } from "react";
import { fetchBarbers, createBarber, deleteBarber } from "../api/barberApi";

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBarber, setNewBarber] = useState({
    name: "",
    email: "",
    description: "",
    specialty: "",
    image: "",
    status: "Available",
    availability: [], // Added availability field
  });
  const [newAvailability, setNewAvailability] = useState({
    day: "",
    times: "",
  });

  useEffect(() => {
    const loadBarbers = async () => {
      const data = await fetchBarbers();
      setBarbers(data);
    };

    loadBarbers();
  }, []);

  const handleInputChange = (e) => {
    setNewBarber({ ...newBarber, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (e) => {
    setNewAvailability({ ...newAvailability, [e.target.name]: e.target.value });
  };

  const addAvailability = () => {
    if (newAvailability.day && newAvailability.times) {
      setNewBarber((prevBarber) => ({
        ...prevBarber,
        availability: [
          ...prevBarber.availability,
          { ...newAvailability, times: newAvailability.times.split(",") },
        ],
      }));
      setNewAvailability({ day: "", times: "" }); // Reset the input fields
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedBarber = await createBarber(newBarber);
      setBarbers([...barbers, addedBarber]);
      setShowForm(false);
      setNewBarber({
        name: "",
        email: "",
        description: "",
        specialty: "",
        image: "",
        status: "Available",
        availability: [],
      }); // Reset the form
    } catch (error) {
      console.error("Error adding barber:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBarber(id);
      setBarbers(barbers.filter((barber) => barber._id !== id));
    } catch (error) {
      console.error("Error deleting barber:", error);
    }
  };

  const handleUpdateBarber = async (id, updates) => {
    try {
      await fetch(`https://ma-1.onrender.com/api/barbers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      setBarbers((prevBarbers) =>
        prevBarbers.map((barber) =>
          barber._id === id ? { ...barber, ...updates } : barber
        )
      );
    } catch (error) {
      console.error('Error updating barber:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Barbers ({barbers.length})</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {showForm ? "Cancel" : "Add New Barber"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 border rounded bg-gray-100"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newBarber.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newBarber.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={newBarber.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={newBarber.specialty}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Status</label>
            <select
              name="status"
              value={newBarber.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newBarber.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Add Availability</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="day"
                placeholder="Day (e.g., Monday)"
                value={newAvailability.day}
                onChange={handleAvailabilityChange}
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="text"
                name="times"
                placeholder="Times (comma-separated, e.g., 9:00 AM, 10:00 AM)"
                value={newAvailability.times}
                onChange={handleAvailabilityChange}
                className="w-2/3 p-2 border rounded"
              />
              <button
                type="button"
                onClick={addAvailability}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Current Availability</label>
            <ul className="list-disc pl-5">
              {newBarber.availability.map((slot, index) => (
                <li key={index}>
                  {slot.day}: {slot.times.join(", ")}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Barber
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Specialty</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber) => (
              <tr key={barber._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {barber.image ? (
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b text-left">{barber.name}</td>
                <td className="py-2 px-4 border-b text-left">{barber.email}</td>
                <td className="py-2 px-4 border-b text-left">
                  {barber.description}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {barber.specialty}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <select
                    value={barber.status}
                    onChange={(e) =>
                      handleStatusChange(barber._id, e.target.value)
                    }
                    className="p-2 border rounded"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={() => handleDelete(barber._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Barbers;
