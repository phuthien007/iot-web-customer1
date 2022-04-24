import { Button, Card, Divider, notification, Popconfirm, Table, Tag } from 'antd'
import Search from 'antd/lib/input/Search'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import ModalView from './ModalView3Channel'

const id = '_id'

function Relay3Channel({ roomId, roomData }) {
  const [data, setData] = useState([])

  const handleDeleteRelay3Channel = i => {
    Axios.delete(`http://localhost:5000/api/v1/relay3channel/${i[id]}`)
      .then(() => {
        notification.success({
          message: 'Thành công',
          description: 'Xóa thành công',
        })
        const newData = data.filter(item => item[id] !== i[id])
        setData(newData)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/v1/relay3channel?room_id=${roomId}`)
      .then(resp => {
        setData([...resp.data])
      })
      .catch(err => {
        console.log(err)
      })
  }, [roomId])

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
          <ModalView roomData={roomData} record={record} />

          <Divider type="vertical" />

          <Popconfirm
            onConfirm={() => handleDeleteRelay3Channel(record)}
            title="Bạn có muốn xóa?"
            okText="Yes"
            cancelText="No"
          >
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
