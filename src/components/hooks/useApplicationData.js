import { useReducer, useEffect } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
import Axios from "axios";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    const promiseArray = [];

    promiseArray.push(Axios.get("/api/days"));
    promiseArray.push(Axios.get("/api/appointments"));
    promiseArray.push(Axios.get("/api/interviewers"));

    Promise.all(promiseArray).then(all => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        appData: {
          ...state,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      let bookingAction = state.appointments[id].interview
        ? "editBooking"
        : "newBooking";
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      Axios.put(`/api/appointments/${id}`, { interview })
        .then(res => {
          dispatch({
            type: SET_INTERVIEW,
            value: { appointments: appointments, on: bookingAction, id: id }
          });
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      let appointments = {
        ...state.appointments
      };
      appointments[id].interview = null;

      Axios.delete(`/api/appointments/${id}`)
        .then(res => {
          dispatch({
            type: SET_INTERVIEW,
            value: { appointments: appointments, on: "cancel", id: id }
          });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
