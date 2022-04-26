import { Button, Card, Divider, Popconfirm, Table, Tag } from 'antd'
import Search from 'antd/lib/input/Search'
import React, { useEffect, useState } from 'react'
import ModalView from './ModalView3Channel'

const fakeData = [
  {
    id: 1,
    dev_addr: 'A',
    dev_name_1: 'Tủ lạnh',
    relay_state_1: true,
    dev_name_2: 'Tủ lạnh',
    relay_state_2: false,
    dev_name_3: 'Tủ lạnh',
    relay_state_3: true,
  },
  {
    id: 2,
    dev_addr: 'B',
    dev_name_1: 'Quạt',
    relay_state_1: true,
    dev_name_2: 'Quạt',
    relay_state_2: false,
    dev_name_3: 'Quạt',
    relay_state_3: true,
  },
]

function Relay3Channel() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(fakeData)
  }, [])

  const columns = [
    {
      title: 'Địa chỉ thiết bị',
      dataIndex: 'dev_addr',
      key: 'id',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Tên thiết bị 1',
      dataIndex: 'dev_name_1',
      key: 'id',
    },
    {
      title: 'Trạng thái',
      key: 'id',
      dataIndex: 'relay_state_1',
      render: tag => <Tag color="green">{tag ? 'ON' : 'OFF'}</Tag>,
    },
    {
      title: 'Tên thiết bị 2',
      dataIndex: 'dev_name_2',
      key: 'id',
    },
    {
      title: 'Trạng thái',
      key: 'id',
      dataIndex: 'relay_state_2',
      render: tag => <Tag color="green">{tag ? 'ON' : 'OFF'}</Tag>,
    },
    {
      title: 'Tên thiết bị 3',
      dataIndex: 'dev_name_3',
      key: 'id',
    },
    {
      title: 'Trạng thái',
      key: 'id',
      dataIndex: 'relay_state_3',
      render: tag => <Tag color="green">{tag ? 'ON' : 'OFF'}</Tag>,
    },
    {
      title: 'Action',
      key: record => `key_action_${record.id}`,
      render: record => (
        <span>
          <ModalView record={record} />

          <Divider type="vertical" />

          <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
            <Button danger>Delete</Button>
          </Popconfirm>
          <Divider type="vertical" />
        </span>
      ),
    },
  ]

  return (
    <>
      <Card
        title={<span style={{ color: '#fff', fontSize: 30 }}>Relay 3 Channel</span>}
        style={{
          backgroundColor: 'rgba(122,150,244,.4)',
          color: 'white',
          marginLeft: '10%',
          width: '80%',
          marginTop: 20,
        }}
        extra={<Search placeholder="Tìm kiếm theo tên thiết bị" style={{ width: '100%' }} />}
      >
        <Table dataSource={data} columns={columns} pagination={false} />
      </Card>
    </>
  )
}

export default Relay3Channel
