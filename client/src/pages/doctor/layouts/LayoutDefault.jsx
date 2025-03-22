import "./style.css"
import SideBar from "./sidebar";
import NavBar from "./navbar";
import { Outlet } from "react-router-dom";

function DoctorLayoutDefault() {
  return (
    <>
      <div className="doctor-layout flex">
        <SideBar />
        <div className="min-h-full w-full bg-gray-100">
          <NavBar/>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default DoctorLayoutDefault;