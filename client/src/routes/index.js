import LayoutDefault from "../pages/layouts/LayoutDefault";
import Dashboard from "../pages/dashboard";
import LogIn from "../pages/login"
import ListDoctor from "../pages/layouts/list";
import Appointment from "../pages/appointment";

export const routes = [
  {
    path: "/",
    element: <LogIn/>
  },
  {
    path: "/",
    element: <LayoutDefault/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard/>
      },
      {
        path: "list",
        element: <ListDoctor/>
      },
      {
        path: "appointment",
        element: <Appointment/>
      }
    ]
  }
]