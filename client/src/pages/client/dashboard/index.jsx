import "./style.css"
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
    return (
      <>
        <main>
          <div className="urgent-care">
            <img src="/assets/img/ah_navicent_pc_desktop_mobile_banner.webp" alt="urgent care" />
          </div>
          <div className="slides-container mask-image ">
            <div className="sc-hBMUJo dzIbmb max-visible-5">
              <a href="/manage-billing">
                <div className="icon-container">
                  <img className="icon"
                    src="https://gemprodgeminiapp.blob.core.windows.net/storage/1642688710-credit_card.png"
                    alt="credit card" title="Icon" aria-hidden="true" />
                  <span className="card-text-desktop">Manage billing</span>
                </div>
              </a>
            </div>
            <div className="sc-hBMUJo dzIbmb max-visible-5">
              <a
                href="/chat" rel="noreferrer"
                aria-label="Message your doctor. Link opens in a new tab">
                <div className="icon-container">
                  <img className="icon"
                    src="https://gemprodgeminiapp.blob.core.windows.net/storage/1642688710-messages.png" alt="messages"
                    title="Icon" aria-hidden="true" />
                  <span className="card-text-desktop">Message your doctor</span></div>
              </a>
            </div>
            {/* <div className="sc-hBMUJo dzIbmb max-visible-5">
              <a href="/"
                target="_blank" rel="noreferrer" aria-label="Get your test results. Link opens in a new tab">
                <div className="icon-container">
                  <img className="icon"
                    src="https://gemprodgeminiapp.blob.core.windows.net/storage/1642688710-flask.png" alt="flask"
                    title="Icon" aria-hidden="true" />
                  <span className="card-text-desktop">Get your test results</span></div>
              </a>
            </div> */}
            <div className="sc-hBMUJo dzIbmb max-visible-5">
              <a href="/all-appointment">
                <div className="icon-container">
                  <img className="icon"
                    src="https://gemprodgeminiapp.blob.core.windows.net/storage/1642688710-calendar.png" alt="calendar"
                    title="Icon" aria-hidden="true" />
                  <span className="card-text-desktop">Manage appointments</span></div>
              </a>
            </div>
            <div className="sc-hBMUJo dzIbmb max-visible-5">
              <a href="https://livewell.aah.org/Chart/Clinical/Medications"
                target="_blank" rel="noreferrer" aria-label="Review medications. Link opens in a new tab">
                <div className="icon-container">
                  <img className="icon"
                    src="https://gemprodgeminiapp.blob.core.windows.net/storage/icon_library/1698778811-medications_icon.png"
                    alt="medications quick link icon" title="Icon" aria-hidden="true" />
                  <span className="card-text-desktop">Review medications</span></div>
              </a>
            </div>
          </div>


          {/* -----------------Search----------------------------- */}

          <div className="search-wrapper">
            <div className="headings">
              <h1>Find Doctors and Dentists Near You</h1>
            </div>
            <form className="search-form">
              <div className="search-on-desktop">
                <div className="form-content search-input">
                  <span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M4.5921 1.6665V3.86763H3.08846V6.9305C3.08838 8.07422 3.71356 9.1311 4.72849 9.70299C5.74342 10.2749 6.99388 10.2749 8.00881 9.70299C9.02374 9.1311 9.64892 8.07422 9.64884 6.9305V3.86763H8.15084V1.6665H11.9099V3.86763H11.9043V6.93087C11.9043 9.62966 9.86602 11.8726 7.2129 12.2705C7.3416 14.0985 8.93047 15.5428 10.8715 15.5428C12.897 15.5428 14.5391 13.9699 14.5392 12.0296L14.539 11.2262C13.7892 10.7491 13.2945 9.93009 13.2945 8.99984C13.2945 7.52708 14.5344 6.33317 16.0638 6.33317C17.5932 6.33317 18.833 7.52708 18.833 8.99984C18.833 10.2422 17.9507 11.2862 16.7566 11.5824L16.7561 12.0296C16.7561 15.1377 14.1162 17.6665 10.8715 17.6665C7.6732 17.6665 5.06257 15.2096 4.98847 12.1628C2.60166 11.5632 0.833008 9.44484 0.833008 6.93087V1.6665H4.5921ZM16.0638 8.61889C15.8453 8.61889 15.6682 8.78944 15.6682 8.99984C15.6682 9.15392 15.7646 9.29283 15.9124 9.35179C16.0602 9.41076 16.2304 9.37816 16.3435 9.26921C16.4567 9.16026 16.4905 8.99641 16.4293 8.85405C16.368 8.7117 16.2238 8.61889 16.0638 8.61889Z" fill="#7384d8"></path></svg>
                  </span>
                  <input placeholder="Search doctors, conditions, or procedures">
                  </input>
                </div>
                <div className="form-content location-input">
                  <span>
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="https://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.99954 0C10.8665 0 14 2.97125 14 6.63583C14 9.07944 11.6668 12.8672 7.00045 18C2.33408 12.8681 0 9.07859 0 6.63583C0 2.97125 3.13442 0 6.99954 0ZM6.99954 4.31967C5.57612 4.31967 4.42129 5.448 4.42129 6.83974C4.42129 8.23147 5.57612 9.35982 7.00045 9.35982C8.42478 9.35982 9.57961 8.23147 9.57961 6.83974C9.57961 5.448 8.42478 4.31967 7.00045 4.31967H6.99954Z" fill="#7384d8"></path></svg>
                  </span>
                  <input>
                  </input>
                  <button>
                    <CiSearch className="icon-search" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>
            <p className="search-info on-homepage"> You can also search by physician, practice, or hospital name </p>
          </div>

          {/* ------Topspec Module------- */}
          <div className="topspec-module">
            <div className="main-content">
              <h3>Popular specialities</h3>
              <div className="spec-details">
                <div>
                  <img alt="PRIMARY CARE" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/PrimaryCare.svg" />
                  <Link
                    className="spec-name"
                    to="/listdoctor/primary-care"
                    state={{ specName: "Primary care" }}
                  >PRIMARY CARE</Link>
                </div>
                <div>
                  <img alt="DENTIST" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Dentist.svg" />
                  <Link 
                    className="spec-name" 
                    to={`/listdoctor/dentist`}
                    state={{ specName: "Dentist"}}>DENTIST</Link>
                </div>
                <div>
                  <img alt="OB-GYN" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Obgyn.svg" />
                  <Link 
                    className="spec-name" 
                    to={`/listdoctor/ob-gyn`}
                    state={{ specName: "OB-GYN"}}>OB-GYN</Link>
                </div>
                <div>
                  <img alt="DERMATOLOGIST" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Dermatologist.svg" />
                  <Link 
                    className="spec-name" 
                    to={`/listdoctor/dermatologist`}
                    state={{ specName: "Dermatologist"}}>DERMATOLOGIST</Link>
                </div>
                <div>
                  <img alt="PSYCHIATRIST" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Psychiatrist.svg" />
                  <Link 
                    className="spec-name" 
                    to={`/listdoctor/psychiatrist`}
                    state={{ specName: "Psychiatrist"}}>PSYCHIATRIST</Link>
                </div>
                <div>
                  <img alt="EYE DOCTOR" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/EyeDoc.svg" />
                  <Link 
                    className="spec-name" 
                    to={`/listdoctor/eye`}
                    state={{ specName: "Eye Doctor"}}>EYE DOCTOR</Link>
                </div>
              </div>
            </div>
          </div>

        </main>
      </>
    )
}

export default Dashboard