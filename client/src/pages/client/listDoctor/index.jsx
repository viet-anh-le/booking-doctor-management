import "./style.css"
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { generateSevenDay } from '../../../utils/generateSevenday';
import { useDispatch } from "react-redux";
import { sendData } from "../../../actions/appointment";

function ListDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const specName = location.state?.specName || "Unknown";
  const appointment = useRef({}); 
  const dispatch = useDispatch();
  const handleChange = (doctor, value) => {
    const [day, date] = value.split(" - ");
    const fetchApi = async () => {
      const response = await fetch(`http://localhost:3002/api/doctor/schedule/${doctor._id}?date=${date}`);
      const result = await response.json();
      console.log(result);
      const newArr = result.filter((item) => {
        return item.sumBooking < item.maxBooking;
      }).map((item) => {
        return {
          id: item._id,
          time: item.time
        }
      })
      setSchedule(newArr);
    }
    fetchApi();
    appointment.current.day = day;
    appointment.current.date = date;
  };

  const sevenDay = generateSevenDay();
  const params = useParams();
  appointment.current.spec = specName;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`http://localhost:3002/api/listdoctor/${params.spec}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      setDoctors(result);
    };
    fetchApi();
  }, [params.spec])

  const handleClick = (item, doctor) => {
    appointment.current.scheduleId = item.id;
    appointment.current.time = item.time;
    appointment.current.doctor = doctor;
    dispatch(sendData(appointment.current));
    navigate("/appointment");
  }

  return (
    <>
      <div className="list-view">
        <ul className="resultslist-content">
          <li className="list-label-top">
            <span>Featured Results</span>
          </li>
          <div>
            {doctors.length === 0 ? <div>No Doctor</div> :
              doctors.map((doctor, index) => {
                return (
                  <li key={index} className="ep">
                    <div className="card-wrap">
                      <div className="card-body">
                        <article className="card-info-wrap">
                          <div className="card-img">
                            <img src={doctor.avatar} alt={doctor.fullName}/>
                          </div>
                          <div className="verified-text">
                            <i></i>
                            <span>{doctor.status === "verified" ? "VERIFIED" : "NOT VERIFIED"}</span>
                          </div>
                          <div className="card-content">
                            <div className="prov-name-wrap">
                              <h2>
                                <a className="prov-name" href="/">{doctor.fullName}</a>
                              </h2>
                            </div>
                            <p className="prov-speciality">
                              {doctor.specialization.reduce((acc, spec) => {
                                return acc = acc + spec + ", ";
                              }, "")}
                            </p>
                            <div className="prov-ratings-wrap">
                              <div className="prov-ratings">
                                <a href="/">
                                  <div className="overall-ratings">
                                    <span className="avg-ratings">{doctor.rating}</span>
                                    <div className="webmd-rate on-desktop">
                                      {[...Array(Math.round(doctor.rating))].map((_, index) => <span key={index} className="star-rate star-on"></span>)}
                                      {[...Array(5 - Math.round(doctor.rating))].map((_, index) => <span key={index} className="star-rate star-off"></span>)}
                                    </div>
                                    <div className="webmd-rate--number">
                                      ( 3 ratings )
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="prov-exp has-icon">
                              <i></i>
                              <p className="prov-experience">{doctor.exp} Years Experience</p>
                            </div>
                            <div className="prov-addr-dist">
                              <address className="prov-address">
                                <span className="addr-text">{doctor.address}</span>
                                <span className="prov-dist">5.27 miles</span>
                              </address>
                            </div>
                            <div className="prov-bio">
                              <span className="bio-text">
                                <section>
                                  {doctor.review}
                                </section>
                              </span>
                            </div>
                          </div>
                        </article>
                        <div className="schedule-examination">
                          <div className="prov-name-wrap">
                            <h2>
                              <span className="prov-name">Schedule Examination</span>
                            </h2>
                          </div>
                          <Select
                            className="schedule-select"
                            placeholder="Select examination day"
                            onChange={(value) => handleChange(doctor, value)}
                            options={sevenDay.map(obj => {
                              return {
                                value: `${obj.day} - ${obj.date}`,
                                label: `${obj.day} - ${obj.date}`
                              }
                            })}
                          />
                          {schedule && 
                          <div className="schedule-modal">
                            {schedule.map((item, index) => <span key={index} className="time-span" onClick={() => handleClick(item, doctor)}>{item.time}</span>)}
                          </div>}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </div>
        </ul>
      </div>
    </>
  )
}

export default ListDoctor;