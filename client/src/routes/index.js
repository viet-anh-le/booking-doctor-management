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
import AIDiseaseDetection from "../pages/doctor/AIDisease";
import DoctorChat from "../pages/doctor/chat";
import ManageBills from "../pages/client/bills";
//Admin
import AppLayout from "../pages/admin/layout/AppLayout";
import Home from "../pages/admin/Dashboard/Home";
import AddDoctor from "../pages/admin/DoctorInfors/AddDoctor";
import DoctorInfors from "../pages/admin/DoctorInfors/DoctorBasicTables"
import Hospital from "../pages/admin/Hospital/Hospital";
import AddHospital from "../pages/admin/Hospital/AddHospital";
import AddClinic from "../pages/admin/Hospital/AddClinic";
import Departments from "../pages/admin/Departments/Departments";
import AddDepartment from "../pages/admin/Departments/AddDepartment";
import Services from "../pages/admin/Services/Services";
import AddService from "../pages/admin/Services/AddService";
import DoctorDetail from "../pages/admin/DoctorInfors/Detail";
import EditDoctor from "../pages/admin/DoctorInfors/Edit";

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
      {
        path: "chat",
        element: React.createElement(Chat)
      },
      {
        path: "manage-billing",
        element: React.createElement(ManageBills)
      }
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
      },
      {
        path: "AIDisease",
        element: React.createElement(AIDiseaseDetection),
      }
    ]
  },
  {
    path: "/doctor/chat",
    element: React.createElement(DoctorChat)
  },
  //Admin
  {
    path: "/admin",
    element: React.createElement(AppLayout),
    children: [
      {
        path: "",
        element: React.createElement(Home)
      },
      {
        path: "doctor-infors",
        element: React.createElement(DoctorInfors)
      },
      {
        path: "add-doctor",
        element: React.createElement(AddDoctor)
      },
      {
        path: "doctorDetail/:doctorId",
        element: React.createElement(DoctorDetail)
      },
      {
        path: "edit-doctor/:doctorId",
        element: React.createElement(EditDoctor)
      },
      {
        path: "hospitalList",
        element: React.createElement(Hospital)
      },
      {
        path: "add-hospital",
        element: React.createElement(AddHospital)
      },
      {
        path: "add-clinic",
        element: React.createElement(AddClinic)
      },
      {
        path: "departments/:hospitalId",
        element: React.createElement(Departments),
      },
      {
        path: "add-department/:hospitalId",
        element: React.createElement(AddDepartment),
      },
      {
        path: "services/:departmentId",
        element: React.createElement(Services),
      },
      {
        path: "add-service/:departmentId",
        element: React.createElement(AddService),
      }
    ]
  },
]