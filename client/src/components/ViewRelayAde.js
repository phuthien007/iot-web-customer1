import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import C3Chart from 'react-c3js'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://localhost:5000')
const colors = {
  primary: '#01a8fe',
  def: '#acb7bf',
  success: '#46be8a',
  danger: '#fb434a',
}
const defailtZoom = {
  data: {
    columns: [['VRMS'], ['IRMS'], ['Công suất']],
    colors: {
      Sample: colors.success,
    },
  },
  zoom: {
    enabled: !0,
  },
}

const ViewRelayAde = ({ roomName }) => {
  const [zoom, setZoom] = useState(defailtZoom)

  useEffect(() => {
    let dataSocket = {}

    socket.on('chart_sensor', data => {
      dataSocket = { ...data }
      if (zoom.data.columns[0].length > 1800) {
        const newData = zoom
        newData.data.columns[0] = ['VRMS', dataSocket.data1]
        setZoom(newData)
      } else {
        const newData = zoom
        newData.data.columns[0].push(dataSocket.data1)

        setZoom(newData)
        // console.log(zoom)
      }
      if (zoom.data.columns[1].length > 1800) {
        const newData = zoom
        newData.data.columns[1] = ['IRMS', dataSocket.data2]
        setZoom(newData)
      } else {
        const newData = zoom
        newData.data.columns[1].push(dataSocket.data2)
        setZoom(newData)
      }

      if (zoom.data.columns[2].length > 1800) {
        const newData = zoom
        newData.data.columns[2] = ['Công suất', dataSocket.data3]
        setZoom(newData)
      } else {
        const newData = zoom
        newData.data.columns[2].push(dataSocket.data3)
        setZoom(newData)
      }
    })
  }, [])

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div>
      <Button onClick={showModal} type="primary">
        View
      </Button>
      <Modal
        title={roomName}
        width="100%"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <h5 className="mb-4">
                  <strong>Zoom</strong>
                </h5>
                <div className="mb-5">
                  <C3Chart key="data_relay" data={zoom.data} color={zoom.color} zoom={zoom.zoom} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ViewRelayAde
