// The function will return an array of appointments for the given day.
export function getAppointmentsForDay(state, dayString) {

  // Find the array of appointment IDs of the query day
  let appointmentIdArray = [];
  for (const day of state.days) {
    if (day.name === dayString) {
      appointmentIdArray = day.appointments;
    }
  }

  // Add each appointment with that key
  const filteredAppointments = [];
  for (const appointmentId of appointmentIdArray) {
    filteredAppointments.push(state.appointments[appointmentId]);
  }

  return filteredAppointments;
}