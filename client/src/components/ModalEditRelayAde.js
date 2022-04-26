import { Button, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'

export default function ModalViewRelayAde({ record }) {
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
    <>
      <Button onClick={showModal} type="primary">
        Edit
      </Button>
      <Modal title="Sửa" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h3>Tên thiết bị</h3>
        <Input defaultValue={record.dev_name} />
        <h3>Phòng</h3>
        <Select style={{ width: 200 }}>
          <Select.Option key={1}>Phòng 1</Select.Option>
          <Select.Option key={2}>Phòng 2</Select.Option>
        </Select>
      </Modal>
    </>
  )
}
