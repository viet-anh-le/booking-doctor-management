import LayoutDefault from "../pages/layouts/LayoutDefault";
import Dashboard from "../pages/dashboard";
import LogIn from "../pages/login"
import List from "../pages/layouts/list";
import Appointment from "../pages/appointment";
import ListDoctor from "../pages/listDoctor";

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
        path: "doctor",
        element: <List/>,
        children: [
          {
            path: ":spec",
            element: <ListDoctor/>
          }
        ]
      },
      {
        path: "appointment",
        element: <Appointment/>
      }
    ]
  }
]