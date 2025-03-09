import { IoIosArrowDown } from "react-icons/io";
import { Select } from 'antd';

function ListDoctor() {
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

  return (
    <>
      <div className="toggle-component">
        <div className="search-heading">
          <h1>
            Primary Care
            <label className="heading-subtxt"> near </label>
            Los Angeles, CA
          </h1>
          <label className="count-txt">20 Results</label>
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
            <span>Distance</span>
            <IoIosArrowDown />
          </button>
          <button className="filter-btn is-icon">
            <span>Years Exp</span>
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
            <li className="ep">
              <div className="card-wrap">
                <div className="card-body">
                  <article className="card-info-wrap">
                    <div className="card-img">
                      <img src="https://img.lb.wbmdstatic.com/lhd/provider_prod/1874343_31e598c6-86e5-45bf-ae4b-915a1d51b13b.jpg" alt="Dr. Aleksandr  Kovalskiy - Beverly Hills, CA - Family Medicine" />
                    </div>
                    <div className="verified-text">
                      <i></i>
                      <span>VERIFIED</span>
                    </div>
                    <div className="card-content">
                      <div className="prov-name-wrap">
                        <h2>
                          <a className="prov-name" href="/">Dr. Aleksandr  Kovalskiy, MD</a>
                        </h2>
                      </div>
                      <p className="prov-speciality">Family Medicine, Internal Medicine, Primary Care, Preventative Medicine</p>
                      <div className="prov-ratings-wrap">
                        <div className="prov-ratings">
                          <a href="/">
                            <div className="overall-ratings">
                              <span className="avg-ratings">4.0</span>
                              <div className="webmd-rate on-desktop">
                                <span className="star-rate star-on"></span>
                                <span className="star-rate star-on"></span>
                                <span className="star-rate star-on"></span>
                                <span className="star-rate star-on"></span>
                                <span className="star-rate star-off"></span>
                              </div>
                              <div className="webmd-rate--number">
                                ( 3 ratings )
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="prov-patient-persp has-icon">
                        <i></i>
                        <p>Explains conditions and treatments</p>
                      </div>
                      <div className="prov-exp has-icon">
                        <i></i>
                        <p className="prov-experience">19 Years Experience</p>
                      </div>
                      <div className="prov-addr-dist">
                        <address className="prov-address">
                          <span className="addr-text">415 N Crescent Dr Ste 320, Beverly Hills, CA, 90210</span>
                          <span className="prov-dist">5.27 miles</span>
                        </address>
                      </div>
                      <div className="prov-bio">
                        <span className="bio-text">
                          <section>
                            Best Dr and most thorough and caring ,I have ever had. He knows what he is doing and what is best all around options for your Healthcare needs. Easy to talk to as well
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
          </ul>
        </div>
      </div>
    </>
  )
}
export default ListDoctor;