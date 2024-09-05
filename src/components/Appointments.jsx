import React, { useEffect, useState } from "react";
import {
  fetchAppointments,
  fetchBarberById,
  fetchServiceById,
  fetchUserById,
} from "../api/appointmentApi";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [barbers, setBarbers] = useState({});
  const [services, setServices] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);

      // Fetch related barber, service, and user details
      const barberPromises = data.map((appointment) =>
        fetchBarberById(appointment.barber._id)
      );
      const servicePromises = data.flatMap((appointment) =>
        appointment.services.map((service) => fetchServiceById(service._id))
      );
      const userPromises = data.map(
        (appointment) => fetchUserById(appointment.user) // Adjusted to fetch by user._id
      );

      const barbersData = await Promise.all(barberPromises);
      const servicesData = await Promise.all(servicePromises);
      const usersData = await Promise.all(userPromises);

      const barbersMap = barbersData.reduce((acc, barber) => {
        acc[barber._id] = barber;
        return acc;
      }, {});

      const servicesMap = servicesData.reduce((acc, service) => {
        acc[service._id] = service;
        return acc;
      }, {});
      const usersMap = usersData.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setBarbers(barbersMap);
      setServices(servicesMap);

      setUsers(usersMap);
    };

    loadAppointments();
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">User Email</th>
            <th className="py-2 px-4 border-b text-left">User phone</th>
            <th className="py-2 px-4 border-b text-left">Barber</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Time</th>
            <th className="py-2 px-4 border-b text-left">Services</th>
            <th className="py-2 px-4 border-b text-right">Total Amount</th>
            <th className="py-2 px-4 border-b text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment._id}>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.name || "Unknown User"}{" "}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.email || "Unknown User"}{" "}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.phone || "Unknown User"}{" "}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {barbers[appointment.barber._id]?.name || "Unknown Barber"}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {appointment.time}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {appointment.services
                    .map((service) => services[service._id]?.name)
                    .join(", ")}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  ${appointment.totalAmount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {appointment.paymentStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
