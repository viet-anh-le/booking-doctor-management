import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: 'Profile',
  },
  {
    key: '2',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    key: '3',
    label: 'Log out',
    icon: <LogoutOutlined />
  }
];

function NavBar() {
  const doctor = useSelector(state => state.doctorAccountReducer);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const fetchApi = async () => {
      const response = await fetch("http://localhost:3002/doctor/auth/logout",
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

  const handleMenuClick = (e) => {
    switch (e.key){
      case "1":
        console.log("hihi");
        break;
      case "2":
        console.log("hehe");
        break;
      case "3":
        handleLogOut();
        navigate("/doctor");
        break;
      default:
        console.log("hihihihihi");
        break;
    }
  }
  return (
    <>
        <nav className="bg-white w-full">
          <div className="nav-item ml-auto w-1/6">
            <div className="nav-avatar flex pt-4 pb-4 items-center">
              <span className='inline-block flex-[1]'>{doctor.fullName}</span>
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick
                }}
                dropdownRender={(menu) => {
                  return (
                    <div className="w-48">
                      {menu}
                    </div>
                  )
                }}
                className='flex-[1]'
              >
                <a onClick={(e) => e.preventDefault()}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRtcAdqTgmM7vV8XEkpGumjp0Mcg4TsjTBPQ&s"
                    alt="doctor-image"
                    className="w-16 h-16 ml-4 rounded-full object-cover" />
                </a>
              </Dropdown>
            </div>
          </div>
        </nav>
    </>
  )
}

export default NavBar;

