export const fetchDoctorAccountData = (doctorAccountData) => {
  return {
    type: "SEND DATA",
    payload: doctorAccountData
  }
}