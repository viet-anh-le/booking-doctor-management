import { Space, Table, Tag, List, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { useEffect, useState, useRef } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useLocation } from 'react-router-dom';
const serverURL = import.meta.env.VITE_SERVER_URL;
function DoctorBasicTables() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const hospital = query.get("hospital");
  const params = new URLSearchParams();
  if (hospital) params.append('hospital', hospital);
  const handleDelete = (doctorId) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts/doctorDelete/${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({deleted: true}),
        credentials: "include"
      });
      const result = await response.json();
      if (result.status === 200){
        setDoctorData(prev =>
          prev.map(doc => doc._id === doctorId ? { ...doc, deleted: true } : doc)
        );
      }
    }
    fetchApi();
  }
  //Handle Search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
          }, 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    Object.assign(
      {
        title: 'Doctor',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (_, record) => (
          <div className="px-5 py-4 sm:px-6 text-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  width={40}
                  height={40}
                  src={record.avatar}
                  alt={record.fullName}
                />
              </div>
              <div>
                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {record.fullName}
                </span>
              </div>
            </div>
          </div>
        )
      },
      getColumnSearchProps('fullName'),
    ),
    {
      title: 'Department',
      dataIndex: 'specialization',
      key: 'specializtion',
      render: (_, record) => (
        <List
          size="small"
          dataSource={record.specialization}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      )
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      key: 'deleted',
      dataIndex: 'deleted',
      filters: [
        {
          text: 'Active',
          value: false,
        },
        {
          text: 'Deleted',
          value: true,
        }
      ],
      onFilter: (value, record) => {
        if (value === record.deleted)
          return true;
        return false
      },
      render: (_, record) => (
        <>
          <Tag color={record.deleted ? "red" : "green"} key={record.name}>
            {record.deleted ? "Deleted" : "Active"}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        !record.deleted &&
        <Space size="middle">
          <Link to={`/admin/doctorDetail/${record._id}`}><EyeOutlined /></Link>
          <Link to={`/admin/edit-doctor/${record._id}`}><EditOutlined /></Link>
          <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];
  const [doctorData, setDoctorData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/accounts?${params.toString()}`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      const tempData = result.map((item) => (
        {
          ...item,
          key: item._id
        }
      ))
      setDoctorData(tempData);
    }
    fetchApi();
  }, [])
  return (
    <>
      <div className="space-y-6">
        <ComponentCard title="Doctor Informations" button="Add Doctor">
          <Table columns={columns} dataSource={doctorData} />
        </ComponentCard>
      </div>
    </>
  )
}

export default DoctorBasicTables;