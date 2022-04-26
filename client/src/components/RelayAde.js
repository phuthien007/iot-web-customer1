import { Button, Card, Divider, notification, Popconfirm, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import ModalViewRelayAde from './ModalEditRelayAde'
import ViewRelayAde from './ViewRelayAde'

const id = '_id'
const BASE_URL = 'http://localhost:5000/api/v1'
const socket = socketIOClient('http://localhost:5000')
function RelayAde({ roomId, roomData, change }) {
  const [data, setData] = useState([])
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    socket.on('relayadedev', dt => {
      const d = dt.filter(item => item.room_id === roomId)
      setData(d)
    })
  }, [roomId])

  const handleUpdateBtn = record => {
    const stateOld = !record.relay_state
    Axios.patch(
      `${BASE_URL}/relayadedev/${record[id]}`,
      {
        relay_state: stateOld,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const columns = [
    {
      title: 'Thời gian thêm',
      dataIndex: 'createdAt',
      key: 'id',
      render: text => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'dev_name',
      key: 'id',
    },
    {
      title: 'Trạng thái',
      key: 'id',
      dataIndex: 'relay_state',
      render: (tag, record) => {
        return tag ? (
          <Button onClick={() => handleUpdateBtn(record)} type="primary">
            ON
          </Button>
        ) : (
          <Button onClick={() => handleUpdateBtn(record)} danger>
            OFF
          </Button>
        )
      },
    },
    {
      title: 'VRMS',
      dataIndex: 'vrms',
      key: 'id',
      render: text => <span>{text} V</span>,
    },
    {
      title: 'IRMS',
      dataIndex: 'irms',
      key: 'id',
      render: text => <span>{text} A</span>,
    },
    {
      title: 'Công suất',
      dataIndex: 'power',
      key: 'id',
      render: text => <span>{text} W</span>,
    },
    {
      title: 'Năng lượng',
      dataIndex: 'energy',
      key: 'id',
      render: text => <span>{text} Kwh</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <ModalViewRelayAde setData={setData} roomData={roomData} record={record} />
          <Divider type="vertical" />
          <ViewRelayAde roomName={roomName} />
          <Divider type="vertical" />

          <Popconfirm
            onConfirm={() => handleDeleteRelayAde(record)}
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
  const handleDeleteRelayAde = i => {
    Axios.delete(`http://localhost:5000/api/v1/relayadedev/${i[id]}`)
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
    setRoomName(roomData.filter(item => item[id] === roomId)[0].room_name)

    Axios.get(`http://localhost:5000/api/v1/relayadedev?room_id=${roomId}`)
      .then(resp => {
        setData([...resp.data])
      })
      .catch(err => {
        console.log(err)
      })
  }, [roomId, change])
  return (
    <>
      <Card
        color="white"
        title={<span style={{ color: '#fff', fontSize: 30 }}>Relay Ade</span>}
        style={{
          backgroundColor: 'rgba(12,134,234,.6)',
          color: 'white',
          marginLeft: '10%',
          width: '80%',
          marginTop: 20,
        }}
        extra={<Search placeholder="Tìm kiếm theo tên thiết bị" style={{ width: '100%' }} />}
      >
        <Table pagination={false} dataSource={data} columns={columns} />
      </Card>
    </>
  )
}

export default RelayAde
