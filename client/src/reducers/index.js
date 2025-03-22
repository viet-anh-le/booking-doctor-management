import { combineReducers } from "redux"
import { appointmentReducer } from "./appointment";
import { doctorAccountReducer } from "./doctorAccountReducer";

const allReducers = combineReducers(
  {
    appointmentReducer,
    doctorAccountReducer
  }
)

export default allReducers;