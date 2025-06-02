var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
          resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import { Space, Table, Tag } from 'antd';
import { ComponentCard } from "../../../components/common/ComponentCard.jsx";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Form, Popconfirm, Typography, Input, InputNumber } from 'antd';
const serverURL = import.meta.env.VITE_SERVER_URL;

function Departments() {
  const handleDelete = (departmentId) => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/department/delete/${departmentId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({deleted: true}),
        credentials: "include"
      })
      const result = await response.json();
      if (result.status === 200){
        setDepartments(prev =>
          prev.map(item => item._id === departmentId ? { ...item, deleted: true } : item)
        );
      }
    }
    fetchApi();
  }
  const EditableCell = _a => {
    var { editing, dataIndex, title, inputType, record, index, children } = _a,
      restProps = __rest(_a, [
        'editing',
        'dataIndex',
        'title',
        'inputType',
        'record',
        'index',
        'children',
      ]);
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue({
      name: '',
      description: '',
      phone: '',
      ...record
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = key =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const row = yield form.validateFields();
        const newData = [...departments];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, Object.assign(Object.assign({}, item), row));
          setDepartments(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDepartments(newData);
          setEditingKey('');
        }
        const fetchApi = async () => {
          const response = await fetch(`${serverURL}/api/admin/department/edit/${key}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(row),
            credentials: "include"
          })
          const result = await response.json();
          console.log(result);
        }
        fetchApi();
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    });
  const columns = [
    {
      title: 'Department',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: '40%',
      tooltip: true,
      editable: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      editable: true,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        if (record.deleted) {
          return <Tag color="red">Deleted</Tag>;
        }
        return <Tag color="green">Active</Tag>;
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (

          <Space size="middle">
            <Link to={`/admin/services/${record._id}`}><EyeOutlined /></Link>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined/>
            </Typography.Link>
            <a onClick={() => handleDelete(record._id)}><DeleteOutlined /></a>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return Object.assign(Object.assign({}, col), {
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    });
  });
  const { hospitalId } = useParams();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(`${serverURL}/api/admin/department/${hospitalId}`,
        {
          method: "GET",
          credential: "include",
        }
      );
      const result = await response.json();
      const tempData = result.data.map(item => ({
        ...item,
        key: item._id,
      }));
      setDepartments(tempData);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="space-y-6">
        <Form form={form} component={false}>
          <ComponentCard title="Departments Informations" button="Add Department" id={hospitalId}>
            <Table
              columns={mergedColumns}
              dataSource={departments}
              components={{
                body: { cell: EditableCell },
              }}
              rowClassName="editable-row"
            />
          </ComponentCard>
        </Form>
      </div>
    </>
  )
}

export default Departments;