import "./style.css"
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineWechatWork, AiOutlineMedicineBox, AiOutlineWallet, AiOutlineCalendar } from "react-icons/ai";
const serverURL = import.meta.env.VITE_SERVER_URL

function LayoutDefault() {
  const [result, setResult] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/dashboard`, {
        method: "GET",
        credentials: "include"
      });
      const result1 = await response.json();
      setResult(result1);
      console.log(result1);
    }
    fetchApi();
  }, [])
  const handleLogout = () => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/auth/logout`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      localStorage.clear();
      if (result.status === 200) {
        console.log("Log out thanh cong");
      }
    }
    fetchApi();
  }
  return (
    <>
      <header className="sc-ciSkZP bwSYJA">
        <div className="header-flex-item-1">
          <a href="/dashboard">
            <img src="/assets/img/SimpleLogo.bdf7548cca4415e95dbc.png" alt="Livewell" />
          </a>
        </div>
        <div className="sc-carFqZ hBWCUB">
          <div className="header-flex-item-2 text-align-right">
            <nav>
              <ul className="sc-iTVJFM oxVOu nav-list hide">
                <li className="nav-item-main">
                  <AiOutlineWallet
                    style={{
                      width: "30",
                      height: "30",
                      fill: "#1175A7",
                      position: "absolute",
                      left: "8%",
                      bottom: "50%"
                    }} />
                  <a href="/manage-billing">
                    Manage Billing</a>
                </li>
                <li className="nav-item-main">
                  <AiOutlineWechatWork
                    style={{
                      width: "30",
                      height: "30",
                      fill: "#1175A7",
                      position: "absolute",
                      left: "8%",
                      bottom: "50%"
                    }} />
                  <a href="/chat">Message Doctor</a>
                </li>
                <li className="nav-item-main">
                  <AiOutlineCalendar
                    style={{
                      width: "30",
                      height: "30",
                      fill: "#1175A7",
                      position: "absolute",
                      left: "8%",
                      bottom: "50%"
                    }} />
                  <a href="/all-appointment">Manage Appointments</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-flex-item-3 text-align-right">
            {result.status !== 200 && <button className="fqbJCS login">
              <span>
                <Link to="/login">Log In</Link>
              </span>
            </button>}
            <button className="fqbJCS" onClick={handleLogout}>
              <span>
                <Link to="/login">Sign out</Link>
              </span>
            </button>
          </div>
        </div>
      </header >

      <Outlet />

      <footer className="footer-container">
        <div className="logo">
          <a className="link-main" aria-label="Livewell home page" href="/"><img src="/assets/img/Logo.d9c86d1987e7d369437c.png"
            alt="Livewell" /></a>
        </div>
        <div className="copyright">
          © 2025 Copyright of Viet Anh
        </div>
      </footer>
    </>
  )
}

export default LayoutDefault;