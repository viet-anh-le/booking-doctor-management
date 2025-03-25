const initialState = JSON.parse(localStorage.getItem("userAccount")) || {};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND ACCOUNT":
      localStorage.setItem("userAccount", JSON.stringify(action.payload));
      return action.payload
    default:
      return state
  }
}