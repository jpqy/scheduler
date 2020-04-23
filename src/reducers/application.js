export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

function calculateSpots(dayObj, appointments) {
  let spots = dayObj.appointments.length;
  for (const appointmentId of dayObj.appointments) {
    if (appointments[appointmentId].interview !== null) {
      spots--;
    }
  }
  return spots;
}

/**
 * A reducer function to handle updating the application state.
 *
 * @param   {Object} state               The current state object
 * @param   {Object} action              Changes to be made to current state
 * @param   {Object} action.type         Type of change to make
 * @param   {Object} action.day          New day to set in state
 * @param   {Object} action.appointments New appointments object
 * @param   {Object} action.interviewers New interviewers object
 * @returns {Object} A new state object
 */
export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return ({ ...state, day: action.day });

    case SET_APPLICATION_DATA:
      return ({
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      });

    case SET_INTERVIEW: {
      const { id, interview } = action;
      const appointment = {
        ...state.appointments[id],
        interview: interview && { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      // Find which day the appointment was on
      const dayIndex = state.days.findIndex(day =>
        day.appointments.includes(id));

      // Update the spots value and generate new days array
      const day = {
        ...state.days[dayIndex],
        spots: calculateSpots(state.days[dayIndex], appointments)
      };
      const days = [...state.days];
      days[dayIndex] = day;

      return ({ ...state, appointments, days });
    }
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}