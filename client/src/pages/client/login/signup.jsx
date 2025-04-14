import { useRef } from "react";
import "./style.css"
import { Link } from "react-router-dom";

function SignUp() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dobRef = useRef("");
  const phoneRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchApi = async () => {
      const response = await fetch("http://localhost:3002/api/accounts/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          dob: dobRef.current.value,
          phone: phoneRef.current.value
        }),
        credentials: "include"
      })
      const result = await response.json();
      console.log(result);
    }
    fetchApi();
  }

  return (
    <>
      <div className="webmd-modal__body">
        <div className="auth-container">
          <div className="auth-bg-wrapper login"></div>
          <div className="auth-form-wrapper">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  ref={nameRef}
                /></div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                /></div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={passwordRef}
                /></div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="date"
                  placeholder="Date of birth (mm/dd/yyyy)"
                  name="dob"
                  ref={dobRef}
                /></div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="tel"
                  placeholder="Phone number"
                  name="phone"
                  ref={phoneRef}
                /></div>
              <button className="webmd-button webmd-button--primary webmd-button--large is-stretch auth-form-submit-btn" type="submit">
                <span> Sign Up </span>
              </button>

              <div className="form-account">
                <p className="form-account-text">
                  Already have an account?
                  <Link to="/login"> Log in </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;