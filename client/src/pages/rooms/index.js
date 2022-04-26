import { Button, Select } from 'antd'
import Relay3Channel from 'components/Relay3Channel'
import RelayAde from 'components/RelayAde'
import Sensor from 'components/Sensor'
import React, { useEffect, useState } from 'react'

const { Option } = Select
function Rooms() {
  const [roomData, setRoomData] = useState([])
  useEffect(() => {
    setRoomData([
      {
        key: 1,
        name: 'Phòng 1',
      },
      {
        key: 2,
        name: 'Phòng 2',
      },
      {
        key: 3,
        name: 'Phòng 3',
      },
    ])
  }, [])

  return (
    <>
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
      >
        {roomData.map(item => {
          return <Option key={item.key} value={item.key}>{item.name}</Option>
        })}
      </Select>
      <Button type="primary">Thêm phòng</Button>

      <div
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/R.ba9963854ead9a681672ff9ff7e2af7f?rik=WAMrVS68snmSyA&pid=ImgRaw&r=0')",
        }}
      >
        <div className="site-card-border-less-wrapper">
          <RelayAde />
          <Sensor />
          <Relay3Channel />
        </div>
      </div>
    </>
  )
}

export default Rooms
