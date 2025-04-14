import React from "react";
import LayoutDefault from "../pages/client/layouts/LayoutDefault";
import Dashboard from "../pages/client/dashboard";
import LogIn from "../pages/client/login/index"
import List from "../pages/client/layouts/list";
import Appointment from "../pages/client/appointment";
import ListDoctor from "../pages/client/listDoctor";
import SignUp from "../pages/client/login/signup";
import DoctorLogIn from "../pages/doctor/login";
import DoctorDashboard from "../pages/doctor/dashboard";
import DoctorLayoutDefault from "../pages/doctor/layouts/LayoutDefault";
import DoctorAppointment from "../pages/doctor/appointment";
import DoctorSchedule from "../pages/doctor/schedule";
import DoctorScheduleCreate from "../pages/doctor/schedule/create";
import { Navigate } from "react-router-dom";
import Detail from "../pages/doctor/appointment/detail";
import AllAppointment from "../pages/client/allAppointment";
import Chat from "../pages/client/chat";

export const routes = [
  //Client
  {
    path: "/login",
    element: React.createElement(LogIn)
  },
  {
    path: "/signup",
    element: React.createElement(SignUp)
  },
  {
    path: "/",
    element: React.createElement(LayoutDefault),
    children: [
      {
        path: "",
        element: React.createElement(Navigate, { to: "/dashboard", replace: true })
      },
      {
        path: "dashboard",
        element: React.createElement(Dashboard)
      },
      {
        path: "listdoctor",
        element: React.createElement(List),
        children: [
          {
            path: ":spec",
            element: React.createElement(ListDoctor)
          }
        ]
      },
      {
        path: "appointment",
        element: React.createElement(Appointment)
      },
      {
        path: "all-appointment",
        element: React.createElement(AllAppointment)
      },
      // {
      //   path: "chat",
      //   element: React.createElement(Chat)
      // }
    ]
  },
  //Doctor
  {
    path: "/doctor",
    element: React.createElement(DoctorLogIn)
  },
  {
    path: "/doctor",
    element: React.createElement(DoctorLayoutDefault),
    children: [
      {
        path: "dashboard",
        element: React.createElement(DoctorDashboard)
      },
      {
        path: "appointment",
        element: React.createElement(DoctorAppointment)
      },
      {
        path: "appointment/detail/:id",
        element: React.createElement(Detail)
      },
      {
        path: "schedule",
        element: React.createElement(DoctorSchedule)
      },
      {
        path: "schedule/create",
        element: React.createElement(DoctorScheduleCreate),
      }
    ]
  }
]