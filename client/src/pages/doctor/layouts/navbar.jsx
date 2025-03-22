import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

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
  return (
    <>
        <nav className="bg-white w-full">
          <div className="nav-item ml-auto w-1/6">
            <div className="nav-avatar flex pt-4 pb-4 items-center">
              <span>Doctor - Evan</span>
              <Dropdown
                menu={{
                  items
                }}
                dropdownRender={(menu) => {
                  return (
                    <div className="w-48">
                      {menu}
                    </div>
                  )
                }}
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

