import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "ID",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tên tài khoản",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Trạng thái",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size='middle'>
        <a>Xác Nhận</a>
        <a>Hủy </a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Đơn 1",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Loc23",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
];

const Bill = () => <Table columns={columns} dataSource={data} />;
export default Bill;
