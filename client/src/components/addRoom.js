import { Button, Input, Modal, notification } from 'antd'
import Axios from 'axios'
import React, { useState } from 'react'

const BASE_URL = 'http://localhost:5000/api/v1'

export default function AddRoom() {
  const [dataChange, setDataChange] = useState('')
  const handleOk = () => {
    try {
        Axios.post(`${BASE_URL}/rooms`, {
            room_name: dataChange,
          }).then(data => {
            if (data) {
              notification.success({
                message: 'Thành công',
                description: 'Thêm phòng thành công',
              })
            }
          }).catch(err =>{
              console.log(err.message)
              notification.error({
                  message: 'Lỗi',
                  description: err.message
              })
          })
    } catch (error) {
        console.log(error)

        notification.error({
            message: 'Lỗi',
            description: error
        })
    }
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
    <>
      <Button onClick={showModal} type="primary">
        Thêm phòng
      </Button>
      <Modal title="Sửa" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>Tên phòng</h3>
        <Input value={dataChange} onChange={e => setDataChange(e.target.value)} />
      </Modal>
    </>
  )
}
