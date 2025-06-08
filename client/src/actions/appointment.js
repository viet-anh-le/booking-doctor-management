export const sendData = (appointment) => {
  return {
    type: "SEND APPOINTMENT DATA",
    payload: appointment
  }
}