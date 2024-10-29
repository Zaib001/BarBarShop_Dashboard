import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import sweetalert2
import {
  fetchAppointments,
  fetchBarberById,
  fetchServiceById,
  fetchUserById,
  deleteAppointment,
  completeAppointment,
} from "../api/appointmentApi";
import { FaCheckCircle } from "react-icons/fa"; // Import check icon

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [barbers, setBarbers] = useState({});
  const [services, setServices] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointments();
        setAppointments(data);

        const barberPromises = data.map((appointment) =>
          fetchBarberById(appointment.barber._id)
        );
        const servicePromises = data.flatMap((appointment) =>
          appointment.services.map((service) => fetchServiceById(service._id))
        );
        const userPromises = data.map((appointment) =>
          fetchUserById(appointment.user)
        );

        const [barbersData, servicesData, usersData] = await Promise.all([
          Promise.all(barberPromises),
          Promise.all(servicePromises),
          Promise.all(userPromises),
        ]);

        const barbersMap = Object.fromEntries(
          barbersData.map((barber) => [barber._id, barber])
        );
        const servicesMap = Object.fromEntries(
          servicesData.map((service) => [service._id, service])
        );
        const usersMap = Object.fromEntries(
          usersData.map((user) => [user._id, user])
        );

        setBarbers(barbersMap);
        setServices(servicesMap);
        setUsers(usersMap);
        setLoading(false);
      } catch (error) {
        setError("Failed to load appointments.");
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleComplete = async (id) => {
    const appointment = appointments.find((appt) => appt._id === id);
    if (appointment.status === "completed") {
      Swal.fire("Info", "Appointment is already completed.", "info");
      return;
    }

    try {
      await completeAppointment(id);
      Swal.fire("Success", "Appointment marked as completed.", "success");
      setAppointments(
        appointments.map((appt) =>
          appt._id === id ? { ...appt, status: "completed" } : appt
        )
      );
    } catch (error) {
      Swal.fire("Error", "Error marking appointment as completed.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteAppointment(id);
        Swal.fire("Deleted!", "Appointment has been deleted.", "success");
        setAppointments(appointments.filter((appt) => appt._id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "Error deleting appointment.", "error");
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">First Name</th>
              <th className="py-2 px-4 border-b text-left">Last Name</th>
              <th className="py-2 px-4 border-b text-left">User Email</th>
              <th className="py-2 px-4 border-b text-left">User Phone</th>
              <th className="py-2 px-4 border-b text-left">Barber</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Time</th>
              <th className="py-2 px-4 border-b text-left">Services</th>
              <th className="py-2 px-4 border-b text-right">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Payment Status</th>
              <th className="py-2 px-4 border-b text-left">Complete</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.firstName || "Unknown User"}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.lastName || "Unknown User"}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.email || "Unknown User"}
                </td>
                <td className="py-2 px-4 border-b text-left">
                  {users[appointment.user]?.phoneNumber || "Unknown User"}
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
                <td className="">
                  {appointment.status === "completed" ? (
                    <FaCheckCircle className="mt-4 text-green-500 text-2xl" />
                  ) : (
                    <button
                      onClick={() => handleComplete(appointment._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Complete
                    </button>
                  )}
                </td>
                {/* Conditionally render the delete button */}
                {appointment.status !== "completed" && (
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
