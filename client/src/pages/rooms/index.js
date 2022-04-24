import { Button, Select } from 'antd'
import Axios from 'axios'
import Relay3Channel from 'components/Relay3Channel'
import RelayAde from 'components/RelayAde'
import Sensor from 'components/Sensor'
import React, { useEffect, useState } from 'react'

const { Option } = Select

const id = '_id'
function Rooms() {
  const [roomData, setRoomData] = useState([])
  const [selectRoom, setSelectRoom] = useState()
  useEffect(() => {
    Axios.get('http://localhost:5000/api/v1/rooms')
      .then(resp => {
        setRoomData([...resp.data])
        setSelectRoom()
      })
      .catch(err => {
        console.log(err)
      })
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
        value={selectRoom}
        onChange={e => setSelectRoom(e)}
      >
        {roomData.map(item => {
          return (
            <Option key={item[id]} value={item[id]}>
              {item.room_name}
            </Option>
          )
        })}
      </Select>
      <Button type="primary">Thêm phòng</Button>
      <br />
      {selectRoom == null ? (
        <span>Chọn phòng bất kỳ</span>
      ) : (
        <div
          style={{
            backgroundImage:
              "url('https://th.bing.com/th/id/R.ba9963854ead9a681672ff9ff7e2af7f?rik=WAMrVS68snmSyA&pid=ImgRaw&r=0')",
          }}
        >
          <div className="site-card-border-less-wrapper">
            <RelayAde roomData={roomData} roomId={selectRoom} />
            <Sensor roomId={selectRoom} />
            <Relay3Channel roomData={roomData} roomId={selectRoom} />
          </div>
        </div>
      )}
    </>
  )
}

export default Rooms
