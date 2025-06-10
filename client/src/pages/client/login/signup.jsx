import { useRef, useState } from "react";
import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "antd";

const serverURL = import.meta.env.VITE_SERVER_URL

function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dobRef = useRef("");
  const phoneRef = useRef("");
  const bhytRef = useRef("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [dobError, setDobError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [insuranceError, setInsuranceError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const isAtLeast18YearsOld = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    return age > 18 || (age === 18 && hasHadBirthdayThisYear);
  };

  const isValidInsurance = (value) => {
    const insuranceRegex = /^[A-Za-z]{2}\d{13}$/;
    return insuranceRegex.test(value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(emailRef.current.value)) {
      setErrorEmail("Please type valid email");
    }
    else {
      setErrorEmail("");
    }
    if (!isValidPhone(phoneRef.current.value)) {
      setErrorPhone("Please type valid phone");
    }
    else {
      setErrorPhone("");
    }
    if (!isAtLeast18YearsOld(dobRef.current.value)) {
      setDobError("You are under 18");
    } else {
      setDobError("");
    }
    if (!isValidInsurance(bhytRef.current.value)) {
      setInsuranceError("Please type valid insurance");
    }
    else {
      setInsuranceError("");
    }
    if (!nameRef.current.value) {
      setNameError("Please type name");
    } else {
      setNameError("");
    }

    if (!passwordRef.current.value) {
      setPasswordError("Please type password");
    } else {
      setPasswordError("");
    }
    if (isValidPhone(phoneRef.current.value) && isValidEmail(emailRef.current.value) && isAtLeast18YearsOld(dobRef.current.value) && isValidInsurance(bhytRef.current.value) && nameRef.current.value && passwordRef.current.value) {
      const fetchApi = async () => {
        const response = await fetch(`${serverURL}/api/accounts/create`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            fullName: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            dob: dobRef.current.value,
            phone: phoneRef.current.value,
            bhyt: bhytRef.current.value
          }),
          credentials: "include"
        })
        const result = await response.json();
        console.log(result);
        if (result.status === 200) {
          navigate("/login");
        }
        else {
          const alert = document.querySelector(".alert");
          alert.classList.remove("hidden");
        }
      }
      fetchApi();
    }
  }

  return (
    <>
      <div className="webmd-modal__body">
        <div className="auth-container">
          <div className="auth-bg-wrapper login"></div>
          <div className="auth-form-wrapper">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="alert hidden z-9999">
                <Alert message="Invalid registration information" type="error" />
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  ref={nameRef}
                />
                {nameError && <p style={{ color: "red" }}>{nameError}</p>}
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                />
                {errorEmail && <p style={{ color: "red" }}>{errorEmail}</p>}
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="password"
                  placeholder="Password"
                  name="password"
                  ref={passwordRef}
                />
                {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  placeholder="Insurance"
                  name="bhyt"
                  ref={bhytRef}
                />
                {insuranceError && <p style={{ color: "red" }}>{insuranceError}</p>}
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="date"
                  placeholder="Date of birth (mm/dd/yyyy)"
                  name="dob"
                  ref={dobRef}
                />
                {dobError && <p style={{ color: "red" }}>{dobError}</p>}
              </div>
              <div className="webmd-input--medium">
                <input
                  className="webmd-input__inner"
                  type="tel"
                  placeholder="Phone number"
                  name="phone"
                  ref={phoneRef}
                />
                {errorPhone && <p style={{ color: "red" }}>{errorPhone}</p>}
              </div>
              <button
                className="webmd-button webmd-button--primary webmd-button--large is-stretch auth-form-submit-btn"
                type="submit"
              >
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