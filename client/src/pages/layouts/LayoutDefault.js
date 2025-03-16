import "./style.css"
import { Outlet, Link } from "react-router-dom"

function LayoutDefault() {
  const handleClick =  () => {
    const fetchApi = async () => {
      const response = await fetch("http://localhost:3002/auth/logout",
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      if (result.status === 200){
        console.log("Log out thanh cong");
      }
    }
    fetchApi();
  }
  return (
    <>
      <header className="sc-ciSkZP bwSYJA">
        <div className="sc-carFqZ hBWCUB">
          <div className="header-flex-item-1">
            <a href="/dashboard">
              <img src="/assets/img/SimpleLogo.bdf7548cca4415e95dbc.png" alt="Livewell"/>
            </a>
          </div>
          <div className="header-flex-item-2 text-align-right">
            <nav>
              <ul className="sc-iTVJFM oxVOu nav-list hide">
                <li className="nav-item-main">
                  <a href="https://livewell.aah.org/chart/Authentication/Login" target="_blank" rel="noreferrer">
                    <span>
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.8484 7.36709V8.36709H13.8484H19.6115V13.1302H13.8484H12.8484V14.1302V19.8933H8.08536V14.1302V13.1302H7.08536H1.32227V8.36709H7.08536H8.08536V7.36709V1.604H12.8484V7.36709Z"
                          fill="black" fillOpacity="0.01" stroke="#1175A7" strokeWidth="2">
                        </path>
                      </svg>
                    </span>MyChart</a>
                </li>
                <li id="1" className="nav-item-main sub-menu-button"><a aria-label="Wellness. Internal link with sub menu."
                  href="https://www.livewellaah.org/wellness"><span><svg width="21" height="21" viewBox="0 0 21 21"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M18.2879 2.00344C16.0302 0.105159 12.5422 0.390289 10.3823 2.58933C8.22228 0.390289 4.73428 0.101249 2.47664 2.00344C-0.460619 4.4759 -0.0309688 8.50683 2.06261 10.6434L8.91362 17.6233C9.30421 18.0217 9.82761 18.2443 10.3823 18.2443C10.9408 18.2443 11.4603 18.0256 11.8509 17.6272L18.7019 10.6473C20.7916 8.51072 21.229 4.4798 18.2879 2.00343L18.2879 2.00344ZM17.3661 9.32707L10.5151 16.307C10.4213 16.4007 10.3432 16.4007 10.2495 16.307L3.39844 9.32707C1.97277 7.87406 1.68373 5.12428 3.68357 3.44083C5.20298 2.16359 7.54654 2.35498 9.01517 3.85095L10.3823 5.24537L11.7493 3.85095C13.2258 2.34717 15.5693 2.16358 17.0809 3.43692C19.0769 5.12038 18.78 7.88578 17.3661 9.32707Z"
                      fill="#1175A7"></path>
                  </svg></span>Wellness</a></li>
                <li className="nav-item-main"><a target="_self" rel="noreferrer"
                  aria-label="Find Care. Link opens in a new tab"
                  href="https://www.livewellaah.org/find-health-care"><span><svg width="21" height="21"
                    viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M18.6647 17.2769L14.4143 13.0265C14.3337 12.9459 14.2287 12.9039 14.1167 12.9039H13.6545C14.7574 11.626 15.4261 9.96298 15.4261 8.14238C15.4261 4.11956 12.1665 0.859985 8.14372 0.859985C4.1209 0.859985 0.861328 4.11956 0.861328 8.14238C0.861328 12.1652 4.1209 15.4248 8.14372 15.4248C9.96432 15.4248 11.6274 14.756 12.9053 13.6532V14.1153C12.9053 14.2274 12.9508 14.3324 13.0278 14.4129L17.2782 18.6633C17.4428 18.8279 17.7088 18.8279 17.8734 18.6633L18.6647 17.8721C18.8292 17.7075 18.8292 17.4414 18.6647 17.2769L18.6647 17.2769ZM8.14373 13.7442C5.04871 13.7442 2.54189 11.2374 2.54189 8.14237C2.54189 5.04735 5.04871 2.54053 8.14373 2.54053C11.2387 2.54053 13.7456 5.04735 13.7456 8.14237C13.7456 11.2374 11.2387 13.7442 8.14373 13.7442Z"
                      fill="#1175A7"></path>
                  </svg></span>Find Care</a></li>
              </ul>
            </nav>
          </div>
          <div className="header-flex-item-3 text-align-right">
            <button className="sc-dPaNzc fqbJCS" onClick={handleClick}>
              <span>
                <Link to="/">Sign out</Link>
              </span>
            </button>
          </div>
      </div>
    </header >

    <Outlet/>

    <footer className="footer-container">
      <div className="logo">
        <a className="link-main" aria-label="Livewell home page" href="/"><img src="/assets/img/Logo.d9c86d1987e7d369437c.png"
            alt="Livewell"/></a>
      </div>
      <div className="copyright">
        © 2025 Copyright of Viet Anh
      </div>
    </footer>
    </>
  )
}

export default LayoutDefault;