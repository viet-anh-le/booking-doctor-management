import "./style.css"

function LogIn() {
  return (
    <>
      <div className="webmd-modal__body">
        <div className="auth-container">
          <div className="auth-bg-wrapper login"></div>
          <div className="auth-form-wrapper">
            <p className="signin-signup-section"> Don't have an account? 
              <button className="auth-form-login-sign-btn" type="button">
                <span>Sign Up</span>
              </button>
            </p>
            <h3>Log In</h3>
            <form>
              <div className="webmd-input--medium">
                <input className="webmd-input__inner" type="email" placeholder="Email" name="email"/></div>
              <div className="webmd-input--medium">
                <input className="webmd-input__inner" type="password" placeholder="Password" name="password"/></div>
              <a className="forgot-password-btn" href="https://member.webmd.com/password-reset">
                <span> Forgot Password?</span>
              </a>
              <button className="webmd-button webmd-button--primary webmd-button--large is-stretch auth-form-submit-btn" type="submit">
                <span> Log In </span>
              </button>
              <label className="webmd-checkbox" role="checkbox" aria-checked="false">
                <input className="webmd-checkbox__original" type="checkbox"/>
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