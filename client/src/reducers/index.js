import { combineReducers } from "redux"
import { appointmentReducer } from "./appointment";
import { doctorAccountReducer } from "./doctorAccountReducer";
import { accountReducer } from "./account.reducer";
import { doctorAppointmentsReducer } from "./doctorAppointments";
import { hospitalReducer, clinicReducer } from "./hospital";

const allReducers = combineReducers(
  {
    appointmentReducer,
    doctorAccountReducer,
    accountReducer,
    doctorAppointmentsReducer,
    hospitalReducer,
    clinicReducer
  }
)

export default allReducers;