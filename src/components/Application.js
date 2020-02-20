import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
// import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import Axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const promiseArray = [];

    promiseArray.push(Axios.get("/api/days"));
    promiseArray.push(Axios.get("/api/appointments"));
    promiseArray.push(Axios.get("/api/interviewers"));

    Promise.all(promiseArray).then(all => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all;

      setState(state => ({
        ...state,
        days: daysResponse.data,
        appointments: appointmentsResponse.data,
        interviewers: interviewersResponse.data
      }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
