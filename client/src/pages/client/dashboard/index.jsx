import "./style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row, Card, Avatar } from 'antd';
import { AiOutlineMedicineBox } from "react-icons/ai";
const serverURL = import.meta.env.VITE_SERVER_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [query, setQuery] = useState("");
  const params = new URLSearchParams();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/hospital`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      setHospitals(result.data);
    };
    fetchApi();
  }, []);
  const handleSearch = () => {
    navigate(`/list-doctor?query=${query}`);
  }
  return (
    hospitals &&
    <>
      <main>
        <div className="urgent-care">
          <img src="/assets/img/ah_navicent_pc_desktop_mobile_banner.webp" alt="urgent care" />
        </div>

        <div className="text-2xl font-medium text-center mb-10 partner">
          Trusted, cooperated and accompanied by
        </div>
        {hospitals.length > 3 ? (
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            arrows={true}
            style={
              {
                width: "60%",
                margin: "auto"
              }
            }
          >
            {hospitals.map((hospital, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  onClick={() => {
                    params.set('hospitalId', hospital._id)
                    navigate(`/list-doctor?${params.toString()}`)
                  }}
                  hoverable
                  style={{ width: '100%', maxWidth: 240, margin: 'auto' }}
                  cover={
                    <div style={{
                      height: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}>
                      {hospital.logo ? (
                        <img
                          alt="logo"
                          src={hospital.logo}
                          style={{ width: '100%', objectFit: 'contain', padding: 20 }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <Avatar size={64} icon={<AiOutlineMedicineBox />} />
                        </div>
                      )}
                    </div>
                  }
                >
                  <Card.Meta
                    title={hospital.name}
                    description={`${hospital.district}, ${hospital.province}`}
                  />
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <Row justify="center" gutter={[16, 16]}>
            {hospitals.map((hospital, index) => {
              const spanValue = 24 / hospitals.length;
              return (
                <Col key={index} span={spanValue} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card
                    onClick={() => {
                      params.set('hospitalId', hospital._id)
                      navigate(`/list-doctor?${params.toString()}`)
                    }}
                    hoverable
                    style={{ width: '100%', maxWidth: 240 }}
                    cover={
                      <div style={{
                        height: 100,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        {hospital.logo ? (
                          <img
                            alt="logo"
                            src={hospital.logo}
                            style={{ width: '100%', objectFit: 'contain', padding: 20 }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Avatar size={64} icon={<AiOutlineMedicineBox />} />
                          </div>
                        )}
                      </div>
                    }
                  >
                    <Card.Meta
                      title={hospital.name}
                      description={`${hospital.district}, ${hospital.province}`}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}


        {/* -----------------Search----------------------------- */}

        <div className="search-wrapper mt-10">
          <div className="headings">
            <h1>Find Doctors and Dentists Near You</h1>
          </div>
          <form
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="search-on-desktop m-5 ">
              <div className="form-content search-input bg-white">
                <span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M4.5921 1.6665V3.86763H3.08846V6.9305C3.08838 8.07422 3.71356 9.1311 4.72849 9.70299C5.74342 10.2749 6.99388 10.2749 8.00881 9.70299C9.02374 9.1311 9.64892 8.07422 9.64884 6.9305V3.86763H8.15084V1.6665H11.9099V3.86763H11.9043V6.93087C11.9043 9.62966 9.86602 11.8726 7.2129 12.2705C7.3416 14.0985 8.93047 15.5428 10.8715 15.5428C12.897 15.5428 14.5391 13.9699 14.5392 12.0296L14.539 11.2262C13.7892 10.7491 13.2945 9.93009 13.2945 8.99984C13.2945 7.52708 14.5344 6.33317 16.0638 6.33317C17.5932 6.33317 18.833 7.52708 18.833 8.99984C18.833 10.2422 17.9507 11.2862 16.7566 11.5824L16.7561 12.0296C16.7561 15.1377 14.1162 17.6665 10.8715 17.6665C7.6732 17.6665 5.06257 15.2096 4.98847 12.1628C2.60166 11.5632 0.833008 9.44484 0.833008 6.93087V1.6665H4.5921ZM16.0638 8.61889C15.8453 8.61889 15.6682 8.78944 15.6682 8.99984C15.6682 9.15392 15.7646 9.29283 15.9124 9.35179C16.0602 9.41076 16.2304 9.37816 16.3435 9.26921C16.4567 9.16026 16.4905 8.99641 16.4293 8.85405C16.368 8.7117 16.2238 8.61889 16.0638 8.61889Z" fill="#7384d8"></path></svg>
                </span>
                <input
                  placeholder="Search doctors, hospitals, or specializations"
                  className="text-gray-500"
                  onChange={(e) => setQuery(e.target.value)}
                >
                </input>
              </div>
            </div>
          </form>
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
                  state={{ specName: "Dentist" }}>DENTIST</Link>
              </div>
              <div>
                <img alt="OB-GYN" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Obgyn.svg" />
                <Link
                  className="spec-name"
                  to={`/listdoctor/ob-gyn`}
                  state={{ specName: "OB-GYN" }}>OB-GYN</Link>
              </div>
              <div>
                <img alt="DERMATOLOGIST" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Dermatologist.svg" />
                <Link
                  className="spec-name"
                  to={`/listdoctor/dermatologist`}
                  state={{ specName: "Dermatologist" }}>DERMATOLOGIST</Link>
              </div>
              <div>
                <img alt="PSYCHIATRIST" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/Psychiatrist.svg" />
                <Link
                  className="spec-name"
                  to={`/listdoctor/psychiatrist`}
                  state={{ specName: "Psychiatrist" }}>PSYCHIATRIST</Link>
              </div>
              <div>
                <img alt="EYE DOCTOR" src="https://img.webmd.com/vim/live/webmd/consumer_assets/site_images/physician_directory/images/homepage/EyeDoc.svg" />
                <Link
                  className="spec-name"
                  to={`/listdoctor/eye`}
                  state={{ specName: "Eye Doctor" }}>EYE DOCTOR</Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default Dashboard