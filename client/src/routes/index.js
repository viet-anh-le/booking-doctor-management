import React from "react";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import DoctorPrivateRoute from "../components/PrivateRoute/DoctorPrivateRoute";
import AdminPrivateRoute from "../components/PrivateRoute/AdminPrivateRoute";
import LayoutDefault from "../pages/client/layouts/LayoutDefault";
import Dashboard from "../pages/client/dashboard";
import LogIn from "../pages/client/login/index"
import List from "../pages/client/layouts/list";
import Appointment from "../pages/client/appointment";
import ListDoctor from "../pages/client/listDoctor";
import SignUp from "../pages/client/login/signup";
import DoctorLogIn from "../pages/doctor/login";
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
import SearchPatient from "../pages/admin/FeeManagement/SearchPatient";
import DoctorInfo from "../pages/client/listDoctor/DoctorInfo";
import Profile from "../pages/doctor/UserProfile/Profile";
import PatientProfiles from "../pages/doctor/PatientProfiles/PatientProfiles";
import PatientLog from "../pages/doctor/PatientProfiles/Log";
import ListDoctorv2 from "../pages/client/listDoctor/listv2";
import PaySuccess from "../pages/client/Other/PaySuccess";
import SignIn from "../pages/admin/Login/SignIn";
import AdminProfile from "../pages/admin/Profile/Profile";
import AppointmentLog from "../pages/admin/Appointments/Appointment";
import LogDetail from "../pages/admin/Appointments/LogDetail";
import EditHospital from "../pages/admin/Hospital/Edit";
import PatientInfors from "../pages/admin/PatientInfors/PatientInfors";

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
    path: "/pay-success",
    element: React.createElement(PaySuccess)
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
        path: "list-doctor",
        element: React.createElement(ListDoctorv2)
      },
      {
        path: "doctorInfo/:id",
        element: React.createElement(DoctorInfo)
      },
      {
        path: "appointment",
        element: React.createElement(
          PrivateRoute,
          {},
          React.createElement(Appointment)
        )
      },
      {
        path: "all-appointment",
        element: React.createElement(
          PrivateRoute,
          {},
          React.createElement(AllAppointment)
        )
      },
      {
        path: "chat",
        element: React.createElement(
          PrivateRoute,
          {},
          React.createElement(Chat)
        )
      },
      {
        path: "manage-billing",
        element: React.createElement(
          PrivateRoute,
          {},
          React.createElement(ManageBills)
        )
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
        path: "appointment",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(DoctorAppointment)
        )
      },
      {
        path: "appointment/detail/:id",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(Detail)
        )
      },
      {
        path: "schedule",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(DoctorSchedule)
        )
      },
      {
        path: "schedule/create",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(DoctorScheduleCreate)
        )
      },
      {
        path: "AIDisease",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(AIDiseaseDetection)
        )
      },
      {
        path: "profile",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(Profile)
        )
      },
      {
        path: "patient-profiles",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(PatientProfiles)
        )
      },
      {
        path: "patient-profiles/:id",
        element: React.createElement(
          DoctorPrivateRoute,
          {},
          React.createElement(PatientLog)
        )
      }
    ]
  },
  {
    path: "/doctor/chat",
    element: React.createElement(
      DoctorPrivateRoute,
      {},
      React.createElement(DoctorChat)
    )
  },
  //Admin
  {
    path: "/admin/signin",
    element: React.createElement(SignIn),
  },
  {
    path: "/admin",
    element: React.createElement(AppLayout),
    children: [
      {
        path: "profile",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AdminProfile)
        )
      },
      {
        path: "",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(Home)
        )
      },
      {
        path: "doctor-infors",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(DoctorInfors)
        )
      },
      {
        path: "add-doctor",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AddDoctor)
        )
      },
      {
        path: "doctorDetail/:doctorId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(DoctorDetail)
        )
      },
      {
        path: "edit-doctor/:doctorId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(EditDoctor)
        )
      },
      {
        path: "hospitalList",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(Hospital)
        )
      },
      {
        path: "add-hospital",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AddHospital)
        )
      },
      {
        path: "edit-hospital/:hospitalId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(EditHospital)
        )
      },
      {
        path: "add-clinic",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AddClinic)
        )
      },
      {
        path: "departments/:hospitalId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(Departments)
        )
      },
      {
        path: "add-department/:hospitalId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AddDepartment)
        )
      },
      {
        path: "services/:departmentId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(Services)
        )
      },
      {
        path: "add-service/:departmentId",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AddService)
        )
      },
      {
        path: "invoice",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(SearchPatient)
        )
      },
      {
        path: "appointment-logs",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(AppointmentLog)
        )
      },
      {
        path: "appointment-logs/:id",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(LogDetail)
        )
      },
      {
        path: "patient-infors",
        element: React.createElement(
          AdminPrivateRoute,
          {},
          React.createElement(PatientInfors)
        )
      }
    ]
  },
]