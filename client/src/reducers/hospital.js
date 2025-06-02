const initialState = []

export const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND HOSPITALS":
      return action.payload;
    default:
      return state
  }
}

export const clinicReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND CLINICS":
      return action.payload;
    default:
      return state
  }
}