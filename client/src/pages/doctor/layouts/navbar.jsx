import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../actions/doctor_account';

const serverURL = import.meta.env.VITE_SERVER_URL

const items = [
  {
    key: '1',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    key: '2',
    label: 'Log out',
    icon: <LogoutOutlined />
  }
];

function NavBar() {
  const doctor = useSelector(state => state.doctorAccountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/doctor/auth/logout`,
        {
          method: "GET",
          credentials: "include"
        }
      );
      const result = await response.json();
      if (result.status === 200){
        dispatch(logOut());
        console.log("Log out thanh cong");
      }
    }
    fetchApi();
  }

  const handleMenuClick = (e) => {
    switch (e.key){
      case "1":
        console.log("hehe");
        break;
      case "2":
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
                popupRender={(menu) => {
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

