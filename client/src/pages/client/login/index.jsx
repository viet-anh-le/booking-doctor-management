import "./style.css"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { fetchAccountData } from "../../../actions/account";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          email: email,
          password: password,
          remember: remember
        }),
        credentials: "include"
      })
      const result = await response.json();
      if (result.message === "SUCCESS"){
        const response1 = await fetch(`http://localhost:3002/api/accounts/${email}`, {
          method: "GET",
          credentials: "include"
        })
        const result1 = await response1.json();
        dispatch(fetchAccountData(result1));
        navigate("/dashboard");
      }
    } 
    fetchApi();
  }
  return (
    <>
      <div className="webmd-modal__body">
        <div className="auth-container">
          <div className="auth-bg-wrapper login"></div>
          <div className="auth-form-wrapper">
            <p className="signin-signup-section"> Don't have an account? 
              <Link 
                className="auth-form-login-sign-btn"
                to="/signup"
              >
                <span>Sign Up</span>
              </Link>
            </p>
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
              <div className="webmd-input--medium">
                <input 
                  className="webmd-input__inner" 
                  type="email" 
                  placeholder="Email" 
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}/></div>
              <div className="webmd-input--medium">
                <input 
                  className="webmd-input__inner" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}/></div>
              <a className="forgot-password-btn" href="https://member.webmd.com/password-reset">
                <span> Forgot Password?</span>
              </a>
              <button className="webmd-button webmd-button--primary webmd-button--large is-stretch auth-form-submit-btn" type="submit">
                <span> Log In </span>
              </button>
              <label className="webmd-checkbox" role="checkbox" aria-checked="false">
                <input 
                  className="webmd-checkbox__original" 
                  type="checkbox"
                  onClick={(e) => setRemember(e.target.checked)}/>
                  <span className="webmd-checkbox__label">Remember me</span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogIn;