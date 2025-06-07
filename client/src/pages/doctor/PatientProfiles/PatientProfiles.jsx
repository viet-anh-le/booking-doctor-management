import { Row, Col, Card, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const serverURL = import.meta.env.VITE_SERVER_URL;

function PatientProfiles() {
  const doctorAccount = useSelector(state => state.doctorAccountReducer);
  const [patientProfiles, setPatientProfiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/patient-profiles/${doctorAccount._id}`, {
        method: "GET",
        credentials: "include"
      })
      const result = await response.json();
      if (result) {
        setPatientProfiles(result);
      }
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="m-[3%]">
        <Row gutter={[16, 16]}>
          {patientProfiles.map((profile, index) => (
            <Col key={index} span={6}>
              <Card
                onClick={() => navigate(`${profile.client_id}`)}
                hoverable
                style={{ width: '100%' }}
                cover={
                  <div style={{ height: 200, overflow: 'hidden' }}>
                    {profile.avatar ? (
                      <img
                        alt="avatar"
                        src={profile.avatar}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                      </div>
                    )}
                  </div>
                }
              >
                <Card.Meta
                  title={profile.client_name}
                  description={profile.email ? profile.email : "No description"}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default PatientProfiles;