import { Button, Input, Modal, notification } from 'antd'
import Axios from 'axios'
import React, { useState, useEffect } from 'react'

const id = '_id'
const BASE_URL = 'http://localhost:5000/api/v1'

function EditRoom({ selectRoom, dataRoom }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState()
  const showModal = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    const newData = dataRoom.filter(item => item[id] === selectRoom)[0]
    if (newData) {
      setData(newData.room_name)
    }
  }, [selectRoom])

  const handleOk = () => {
    if (selectRoom === undefined) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn chưa chọn phòng!',
      })
    } else {
      Axios.patch(
        `${BASE_URL}/rooms/${selectRoom}`,
        JSON.stringify({
          room_name: data,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(data => {
          if (data) {
            notification.success({
              message: 'Success',
              description: 'Update thành công',
            })
          }
        })
        .catch(err => {
          console.log(err)
          notification.error({
            message: 'error',
            description: 'Update thất bại',
          })
        })
    }
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button onClick={showModal} style={{ marginTop: 10 }} type="primary">
        Sửa phòng
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Tên phòng</p>
        <Input value={data} onChange={e => setData(e.target.value)} />
      </Modal>
    </>
  )
}

export default EditRoom
