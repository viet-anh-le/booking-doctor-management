import "./style.css"
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { generateSevenDay } from '../../../utils/generateSevenday';
import { useDispatch } from "react-redux";
import { sendData } from "../../../actions/appointment";
import Rating from '@mui/material/Rating';
import { IoIosArrowDown } from "react-icons/io";

const serverURL = import.meta.env.VITE_SERVER_URL;

function ListDoctorv2() {
  const navigate = useNavigate();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const hospitalId = queries.get("hospitalId");
  const query = queries.get("query");
  const params = new URLSearchParams();
  if (hospitalId) params.set("hospitalId", hospitalId);
  if (query) params.set("query", query);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const specName = location.state?.specName || "Unknown";
  const appointment = useRef({});
  const dispatch = useDispatch();
  const handleChange = (doctor, value) => {
    const [day, date] = value.split(" - ");
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/schedule/${doctor._id}?date=${date}`);
      const result = await response.json();
      const newArr = result.map((item) => {
        return {
          id: item._id,
          time: item.time,
          sumBooking: item.sumBooking,
          maxBooking: item.maxBooking
        }
      })
      setSchedule(newArr);
      setSelectedDoctorId(doctor._id);
    }
    fetchApi();
    appointment.current.day = day;
    appointment.current.date = date;
  };

  const sevenDay = generateSevenDay();
  appointment.current.spec = specName;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/listdoctor?${params.toString()}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      console.log(result);
      const tempData = result.map(item => {
        if (item.address) {
          const address = `${item.address.name}, ${item.address.district}, ${item.address.province}`;
          return {
            ...item,
            address: address
          }
        }
      })
      setDoctors(tempData);
    };
    fetchApi();
  }, [])

  const handleClick = (item, doctor) => {
    appointment.current.scheduleId = item.id;
    appointment.current.time = item.time;
    appointment.current.doctor = doctor;
    dispatch(sendData(appointment.current));
    navigate("/appointment");
  }
  return (
    <>
      <div className="toggle-component">
        <div className="search-heading">
          <label className="count-txt">{doctors.length} Results</label>
        </div>
        <div className="filters-container">
          <button className="filter-btn is-icon">
            <span>Sort By</span>
            <IoIosArrowDown />
          </button>
          <button className="filter-btn is-icon">
            <span>Rating</span>
            <IoIosArrowDown />
          </button>
          <button className="filter-btn is-icon">
            <span>Provider Gender</span>
            <IoIosArrowDown />
          </button>
        </div>

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
                              <img src={doctor.avatar} alt={doctor.fullName} />
                            </div>
                            <div className="card-content">
                              <div className="prov-name-wrap">
                                <h2>
                                  <span
                                    className="prov-name"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/doctorInfo/${doctor._id}`, { state: { doctor } })}
                                  >
                                    {doctor.fullName}
                                  </span>
                                </h2>
                              </div>
                              <p className="prov-speciality">
                                {doctor.specialization.join(", ")}
                              </p>
                              <div className="prov-ratings-wrap">
                                <div className="prov-ratings flex">
                                  {doctor.rating && <Rating name="read-only" value={doctor.rating} readOnly />}
                                  <div className={`webmd-rate--number ${doctor.rating ? "ml-2" : ""}`}>
                                    {doctor.rating ? doctor.rating : "No reviews"}
                                  </div>
                                </div>
                              </div>
                              <div className="prov-addr-dist">
                                <address className="prov-address">
                                  <span className="addr-text">{doctor.address}</span>
                                </address>
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
                            {selectedDoctorId === doctor._id && schedule &&
                              <div className="schedule-modal">
                                {schedule.map((item, index) =>
                                  <span
                                    key={index}
                                    className={`time-span ${item.sumBooking == item.maxBooking ? "full" : ""}`}
                                    onClick={() => {
                                      if (item.sumBooking !== item.maxBooking) {
                                        handleClick(item, doctor);
                                      }
                                    }}
                                  >
                                    {item.time}
                                  </span>)}
                              </div>}
                            {selectedDoctorId === doctor._id && !(schedule.length) &&
                              <h2 className="ml-1">
                                No schedule this day
                              </h2>}
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
      </div>
    </>
  )
}
export default ListDoctorv2;