import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import C3Chart from 'react-c3js'

const ViewRelayAde = () => {
  const colors = {
    primary: '#01a8fe',
    def: '#acb7bf',
    success: '#46be8a',
    danger: '#fb434a',
  }

  const zoom = {
    data: {
      columns: [
        [
          'Sample',
          30,
          200,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          350,
          150,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          100,
          150,
          250,
          150,
          200,
          170,
          240,
          30,
          200,
          100,
          400,
          150,
          250,
          150,
          200,
          170,
          240,
          350,
          150,
          100,
          400,
          350,
          220,
          250,
          300,
          270,
          140,
          150,
          90,
          150,
          50,
          120,
          70,
          40,
        ],
      ],
      colors: {
        Sample: colors.primary,
      },
    },
    zoom: {
      enabled: !0,
    },
  }
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
      <Modal title="Xem" width='100%' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <h5 className="mb-4">
                  <strong>Zoom</strong>
                </h5>
                <div className="mb-5">
                  <C3Chart data={zoom.data} color={zoom.color} zoom={zoom.zoom} />
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
