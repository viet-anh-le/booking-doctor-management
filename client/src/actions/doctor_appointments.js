export const fetchDoctorAppointments = (allAppointments) => {
  return {
    type: "SEND ALL APPOINTMENTS",
    payload: allAppointments
  }
}
