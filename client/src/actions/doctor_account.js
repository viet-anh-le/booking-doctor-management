export const fetchDoctorAccountData = (doctorAccountData) => {
  return {
    type: "SEND DATA",
    payload: doctorAccountData
  }
}

export const logOut = () => {
  return ({
    type: "LOG OUT"
  }
  )
}