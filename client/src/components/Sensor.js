import { Button, Card, Col, Divider, notification, Popconfirm, Row } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import ViewSensor from './ViewSensor'





const id = '_id'
function Sensor({ roomId }) {
  const [data, setData] = useState([])
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/v1/sensors?room_id=${roomId}`)
      .then(resp => {
        setData([...resp.data])
      })
      .catch(err => {
        console.log(err)
      })
  }, [roomId])

  useEffect(() =>{
    const socket = socketIOClient("http://localhost:5000")
    socket.on("sensor", dt =>{
      const d = (dt.filter(item => item.room_id === roomId))
      setData(d)
    })
  }, [roomId])

  const handleDeleteSensor = i => {
    Axios.delete(`http://localhost:5000/api/v1/sensors/${i[id]}`)
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

  return (
    <>
      <Card
        title={<span style={{ color: '#fff', fontSize: 30 }}>Sensor</span>}
        style={{
          backgroundColor: 'rgba(43,187,224,.6)',
          color: 'white',
          marginLeft: '10%',
          width: '80%',
          marginTop: 20,
        }}
      >
        {data.length ? (
          <>
            {data.map(item => (
              <>
                <Row style={{ fontSize: 24 }}>
                  <Col span={5}>
                    Nhiệt độ: <p>{item.temp} độ C</p>
                  </Col>
                  <Col span={5}>
                    Độ ẩm: <p>{item.humidity} %</p>
                  </Col>
                  <Col span={5}>
                    Chất lượng không khí: <p>{item.air_quality} ppm</p>
                  </Col>
                  <Col span={9}>
                    <ViewSensor />
                    <Popconfirm
                      title="Bạn có muốn xóa?"
                      onConfirm={() => handleDeleteSensor(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="large" style={{ marginLeft: 5 }} danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
                <Divider />
              </>
            ))}
          </>
        ) : (
          <span> Không có sensor</span>
        )}
      </Card>
    </>
  )
}

export default Sensor
