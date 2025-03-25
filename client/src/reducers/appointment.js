const initialState = JSON.parse(localStorage.getItem("appointment")) || {};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND DATA":
      localStorage.setItem("appointment", JSON.stringify(action.payload));
      return action.payload
    default:
      return state
  }
}