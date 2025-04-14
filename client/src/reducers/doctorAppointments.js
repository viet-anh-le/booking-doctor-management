const initialState = JSON.parse(localStorage.getItem("doctorAppointments")) || [];

export const doctorAppointmentsReducer = (state = initialState, action) => {
  switch (action.type){
    case "SEND ALL APPOINTMENTS":
      localStorage.setItem("doctorAppointments", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}