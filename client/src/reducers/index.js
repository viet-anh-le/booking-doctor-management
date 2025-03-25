import { combineReducers } from "redux"
import { appointmentReducer } from "./appointment";
import { doctorAccountReducer } from "./doctorAccountReducer";
import { accountReducer } from "./account.reducer";

const allReducers = combineReducers(
  {
    appointmentReducer,
    doctorAccountReducer,
    accountReducer
  }
)

export default allReducers;