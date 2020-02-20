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
