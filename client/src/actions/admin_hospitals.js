export const fetchHospitals = (allHospitals) => {
  return {
    type: "SEND HOSPITALS",
    payload: allHospitals
  }
}

export const fetchClinics = (allClinics) => {
  return {
    type: "SEND CLINICS",
    payload: allClinics
  }
}
