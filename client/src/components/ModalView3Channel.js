import { Button, Input, Modal, notification, Select } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const id = '_id'

export default function ModalView({ record, roomData }) {
  const [selectedRoom, setSelectedRoom] = useState()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataChange, setDataChange] = useState({
    dev_name_1: '',
    dev_name_2: '',
    dev_name_3: '',
  })
  useEffect(() => {
    setDataChange({
      dev_name_1: record.dev_name_1,
      dev_name_2: record.dev_name_2,
      dev_name_3: record.dev_name_3,
    })
  }, [])

  const handleOk = () => {
    Axios.patch(
      `http://localhost:5000/api/v1/relay3channel/${record[id]}`,
      JSON.stringify({
        ...dataChange,
        room_id: selectedRoom,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(data => {
        console.log(data)

        notification.success({
          message: 'Thành công',
          description: 'Update thành công',
        })
        setIsModalVisible(false)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
        notification.error({
          message: 'Lỗi',
          description: 'Đã có lỗi xảy ra ',
        })
        setIsModalVisible(true)
      })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Button onClick={showModal} type="primary">
        Edit
      </Button>
      <Modal title="Sửa" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>Tên thiết bị 1</h3>
        <Input
          value={dataChange.dev_name_1}
          onChange={e => setDataChange({ ...dataChange, dev_name_1: e.target.value })}
        />
        <h3>Tên thiết bị 1</h3>
        <Input
          value={dataChange.dev_name_2}
          onChange={e => setDataChange({ ...dataChange, dev_name_2: e.target.value })}
        />
        <h3>Tên thiết bị 3</h3>
        <Input
          value={dataChange.dev_name_3}
          onChange={e => setDataChange({ ...dataChange, dev_name_3: e.target.value })}
        />
        <h3>Phòng</h3>
        <Select
          showSearch
          style={{ width: '50%' }}
          placeholder="Chọn phòng"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filtersort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
          defaultValue={record.room_id}
          value={selectedRoom}
          onChange={e => setSelectedRoom(e)}
        >
          {roomData.length > 0 &&
            roomData.map(item => {
              return (
                <Select.Option key={item[id]} value={item[id]}>
                  {item.room_name}
                </Select.Option>
              )
            })}
        </Select>
      </Modal>
    </>
  )
}
