export const sendData = (appointment) => {
  return {
    type: "SEND DATA",
    payload: appointment
  }
}