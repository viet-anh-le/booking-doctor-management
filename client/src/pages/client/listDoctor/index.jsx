import "./style.css"
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation, useOutletContext, Link } from "react-router-dom";
import { generateSevenDay } from '../../../utils/generateSevenday';
import { useDispatch } from "react-redux";
import { sendData } from "../../../actions/appointment";
import Rating from '@mui/material/Rating';

const serverURL = import.meta.env.VITE_SERVER_URL

function ListDoctor() {
  const params = useParams();
  const { setSelectedSpec, setListLen } = useOutletContext();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
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
      const response = await fetch(`${serverURL}/api/listdoctor/${params.spec}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      setSelectedSpec(params.spec);
      setListLen(result.length);
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
                            <img src={doctor.avatar} alt={doctor.fullName} />
                          </div>
                          <div className="card-content">
                            <div className="prov-name-wrap">
                              <h2>
                                <span
                                  className="prov-name"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => navigate(`/doctorInfo/${doctor._id}`, { state: { doctor} })}
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
    </>
  )
}

export default ListDoctor;