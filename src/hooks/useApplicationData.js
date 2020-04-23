import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

/**
 * A custom hook that manages overall application state including the currently
 * selected day, and data about appointments, interviewers, and interviews
 * across all days, synced to the scheduler-api server via axios requests and
 * WebSocket. Uses a reducer to manipulate the state.
 * 
 * @typedef  {Object}   Data
 * @property {Object}   state           The state object
 * @property {Function} setDay          Function to set the current day
 * @property {Function} bookInterview   Makes API request to (re-)assign an interview object to an Appointment
 * @property {Function} cancelInterview Makes API request to set Appointment's interview object to null
 * @returns  {Data}                     { state, setDay, bookInterview, cancelInterview }
 */
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    if (process.env.REACT_APP_WEBSOCKET_URL) {
      const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

      // Server sends {type="SET_INTERVIEW", id, interview} after successful
      // put/delete request, which we listen for in order to update state
      ws.onmessage = function(event) {
        const dataJson = JSON.parse(event.data);
        if (dataJson.type === SET_INTERVIEW) {
          const { type, id, interview } = dataJson;
          dispatch({ type, id, interview });
        }
      };
    }
    // Fetch days and appointments from server into state
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

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}