import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Fetch days and appointments into state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function setDay(day) {
    setState(prev => ({ ...prev, day }));
  };

  function calculateSpots(dayObj, appointments) {
    let spots = dayObj.appointments.length;
    for (const appointmentId of dayObj.appointments) {
      if (appointments[appointmentId].interview) {
        spots--;
      }
    }
    return spots;
  }

  // Returns a new days array with updated spot values when given an
  // appointmentId that was modified
  function getNewDaysArray(appointmentId, appointments) {
    const newDays = [...state.days];

    // Find which day the appointment was on
    const dayIndex = state.days.findIndex(day => day.appointments.includes(appointmentId));

    // Update the spots value and generate new days array
    const day = { ...state.days[dayIndex], spots: calculateSpots(state.days[dayIndex], appointments) };

    newDays[dayIndex] = day;

    return newDays;
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getNewDaysArray(id, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = getNewDaysArray(id, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}