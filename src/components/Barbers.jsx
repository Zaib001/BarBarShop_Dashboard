import React, { useEffect, useState } from 'react';
import { fetchBarbers, createBarber, deleteBarber } from '../api/barberApi';

const Barbers = () => {
  const [barbers, setBarbers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBarber, setNewBarber] = useState({
    name: '',
    email:'',
    description: '',
    specialty: '',
    image: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedBarber = await createBarber(newBarber);
      setBarbers([...barbers, addedBarber]);
      setShowForm(false);  
      setNewBarber({ name: '',email:'', description: '', specialty: '', image: '' });  // Reset the form
    } catch (error) {
      console.error('Error adding barber:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBarber(id);
      setBarbers(barbers.filter((barber) => barber._id !== id));
    } catch (error) {
      console.error('Error deleting barber:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Barbers ({barbers.length})</h2>
      
      <button 
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {showForm ? 'Cancel' : 'Add New Barber'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-gray-100">
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
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Barber</button>
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
                <td className="py-2 px-4 border-b text-left">{barber.description}</td>
                <td className="py-2 px-4 border-b text-left">{barber.specialty}</td>
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
