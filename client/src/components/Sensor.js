import { Button, Card, Col, Divider, Popconfirm, Row } from 'antd'
import React from 'react'
import ViewSensor from './ViewSensor'

const fakeData = {
  tmp: 25.4,
  humidity: 30,
  air_quality: 41.2,
}

function Sensor() {
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
        <Row style={{ fontSize: 24 }}>
          <Col span={5}>
            Nhiệt độ: <p>{fakeData.tmp} độ C</p>
          </Col>
          <Col span={5}>
            Độ ẩm: <p>{fakeData.humidity} %</p>
          </Col>
          <Col span={5}>
            Chất lượng không khí: <p>{fakeData.air_quality} ppm</p>
          </Col>
          <Col span={9}>
            <ViewSensor />
            <Popconfirm title="Are you sure?" okText="Yes" cancelText="No">
              <Button size="large" style={{ marginLeft: 5 }} danger>
                Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Divider />
      </Card>
    </>
  )
}

export default Sensor
