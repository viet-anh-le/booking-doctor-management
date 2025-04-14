import { combineReducers } from "redux"
import { appointmentReducer } from "./appointment";
import { doctorAccountReducer } from "./doctorAccountReducer";
import { accountReducer } from "./account.reducer";
import { doctorAppointmentsReducer } from "./doctorAppointments";

const allReducers = combineReducers(
  {
    appointmentReducer,
    doctorAccountReducer,
    accountReducer,
    doctorAppointmentsReducer
  }
)

export default allReducers;