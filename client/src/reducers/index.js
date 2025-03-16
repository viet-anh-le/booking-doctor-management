import { combineReducers } from "redux"
import { appointmentReducer } from "./appointment";

const allReducers = combineReducers(
  {
    appointmentReducer,
  }
)

export default allReducers;