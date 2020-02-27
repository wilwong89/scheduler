import { getAppointmentsForDay } from "helpers/selectors";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

function getSpotsForDay(state, day) {
  const remainingSpots = getAppointmentsForDay(state, day).filter(
    element => element.interview === null
  );
  return remainingSpots.length;
}

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return action.appData;
    case SET_INTERVIEW: {
      let day = state.day;
      let remainingSpots = getSpotsForDay(state, day);
      if (action.value.on === "newBooking") remainingSpots--;
      let days = [...state.days].map(element => {
        if (element.name === day) {
          element = { ...element, spots: remainingSpots };
        }
        return element;
      });

      return { ...state, appointments: action.value.appointments, days: days };
    }
    default:
      throw new Error(`Action ${action.type} not available.`);
  }
}
