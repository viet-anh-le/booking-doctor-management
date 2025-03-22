const initialState = JSON.parse(localStorage.getItem("doctorAccount")) || {};

export const doctorAccountReducer = (state = initialState, action) => {
  switch (action.type){
    case "SEND DATA":
      localStorage.setItem("doctorAccount", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}