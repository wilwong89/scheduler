export function getAppointmentsForDay(state, day) {
  const result = [];
  let appointmentIds = [];

  for (let element of state.days) {
    if (element.name === day) {
      appointmentIds = element.appointments;
      break;
    }
  }

  for (let id of appointmentIds) {
    result.push(state.appointments[id]);
  }

  return result;
}

export function getInterview(state, interview) {
  let result = null;

  for (let key in state.appointments) {
    if (interview && state.appointments[key].interview) {
      result = {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
      };
    }
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  if (!state.days.length) return [];

  for (let element of state.days) {
    if (element.name === day) {
      result = element.interviewers.map(a => state.interviewers[a]);
    }
  }
  return result;
}
