import React, { useEffect, useState } from 'react';
import { fetchServices, createService, deleteService } from '../api/serviceApi';

const Services = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchServices();
      setServices(data);
    };

    loadServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newService = await createService(formData);
    setServices([...services, newService]);
    setShowForm(false);
    setFormData({ name: '', description: '', price: '' });
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    setServices(services.filter(service => service._id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'New Service'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        </form>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Service Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                {service.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                {service.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700 text-right">
                ${service.price}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
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

export default Services;
