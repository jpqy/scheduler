import { useEffect, useReducer } from 'react';
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return ({ ...state, day: action.day });
      case SET_APPLICATION_DATA:
        return ({ ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers });
      case SET_INTERVIEW: {
        const { id, interview } = action;

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        // Find which day the appointment was on
        const dayIndex = state.days.findIndex(day => day.appointments.includes(id));

        // Update the spots value and generate new days array
        const day = { ...state.days[dayIndex], spots: calculateSpots(state.days[dayIndex], appointments) };
        const days = [...state.days];
        days[dayIndex] = day;

        if (interview) {
          return axios.put(`/api/appointments/${id}`, interview)
            .then(() => {
              return ({ ...state, appointments, days });
            });
        } else {
          return axios.delete(`/api/appointments/${id}`)
            .then(() => {
              return ({ ...state, appointments, days });
            });
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // Fetch days and appointments into state
  useEffect(() => {

    // WebSocket stretch
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = function() {
      ws.send("ping");
    };

    ws.onmessage = function(event) {
      console.log("Message Received:", event.data);
    };

    // Get and load data from server into state
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  function setDay(day) {
    dispatch({ type: SET_DAY, day });
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

  function bookInterview(id, interview) {
    dispatch({ type: SET_INTERVIEW, id, interview });

  }

  function cancelInterview(id) {
    dispatch({ type: SET_INTERVIEW, id, interview: null });
  }

  return { state, setDay, bookInterview, cancelInterview };
}