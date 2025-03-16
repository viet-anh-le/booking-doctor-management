export const appointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEND DATA":
      return action.payload
    default:
      return state
  }
}