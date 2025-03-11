import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"

function ListDoctor() {
  const [doctors, setDoctors] = useState([]);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const sevenDay = [
    {
      day: "Monday",
      date: "09/03/2025"
    },
    {
      day: "Tuesday",
      date: "10/03/2025"
    },
    {
      day: "Wednesday",
      date: "11/03/2025"
    },
    {
      day: "Thursday",
      date: "12/03/2025"
    }
  ]
  const params = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`http://localhost:3002/doctor/${params.spec}`,
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
                            defaultValue={`${sevenDay[0].day} - ${sevenDay[0].date}`}
                            onChange={handleChange}
                            options={sevenDay.map(obj => {
                              return {
                                value: `${obj.day} - ${obj.date}`,
                                label: `${obj.day} - ${obj.date}`
                              }
                            })}
                          />
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