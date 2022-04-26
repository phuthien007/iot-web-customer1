import { Button, Checkbox, Divider, Drawer, notification, Popconfirm, Select } from 'antd'
import Axios from 'axios'
import AddRoom from 'components/addRoom'
import EditRoom from 'components/editRoom'
import Relay3Channel from 'components/Relay3Channel'
import RelayAde from 'components/RelayAde'
import Sensor from 'components/Sensor'
import React, { useEffect, useState } from 'react'

const { Option } = Select

const CheckboxGroup = Checkbox.Group

const id = '_id'
const BASE_URL = 'http://localhost:5000/api/v1'
function Rooms() {
  const [checkedListRelayAde, setCheckedListRelayAde] = React.useState([])
  const [checkedListSensor, setCheckedListSensor] = React.useState([])
  const [checkedListRelay3Channel, setCheckedListRelay3Channel] = React.useState([])
  const [data, setData] = useState({
    relayade: [],
    sensor: [],
    relay3: [],
  })
  const [baseData, setBaseData] = useState({
    relayade: [],
    sensor: [],
    relay3: [],
  })
  const [indeterminate, setIndeterminate] = React.useState(true)
  const [checkAllRelayAde, setCheckAllRelayAde] = React.useState(false)
  const [checkAllSensor, setCheckAllSensor] = React.useState(false)
  const [checkAllRelay3Channel, setCheckAllRelay3Channel] = React.useState(false)
  const [changeEffect, setChangeEffect] = useState({
    relayade: -1,
    sensor: -1,
    relay3: -1,
  })
  const [roomData, setRoomData] = useState([])
  const [selectRoom, setSelectRoom] = useState()
  const [visible, setVisible] = useState(false)
  useEffect(() => {}, [])

  const handleFocusRoom = () => {
    Axios.get('http://localhost:5000/api/v1/rooms')
      .then(resp => {
        setRoomData([...resp.data])
        setSelectRoom()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const showDrawer = () => {
    // call relay ade
    Axios.get(`${BASE_URL}/relayadedev/not-room`)
      .then(dt1 => {
        // call sensor
        Axios.get(`${BASE_URL}/sensors/not-room`)
          .then(dt2 => {
            // call relay 3
            Axios.get(`${BASE_URL}/relay3channel/not-room`)
              .then(dt3 => {
                const item1 = []
                dt1.data.map(item =>
                  item1.push(`${item[id]} - ${item.dev_addr} - ${item.dev_name}`),
                )
                const item2 = []
                dt2.data.map(item => item2.push(`${item[id]} - ${item.dev_addr} `))
                const item3 = []
                dt3.data.map(item =>
                  item3.push(
                    `${item[id]} - ${item.dev_addr} - ${item.dev_name_1} - ${item.dev_name_2} - ${item.dev_name_3} `,
                  ),
                )
                setBaseData({
                  relayade: dt1.data,
                  sensor: dt2.data,
                  relay3: dt3.data,
                })
                setData({
                  relayade: item1,
                  sensor: item2,
                  relay3: item3,
                })
                setVisible(true)
                console.log(baseData)
              })
              .catch(err3 => {
                console.log(err3)
              })
          })
          .catch(err2 => {
            console.log(err2)
          })
      })
      .catch(err1 => {
        console.log(err1)
      })
  }

  const onClose = () => {
    setVisible(false)
  }

  const onChangeRelayAde = list => {
    setCheckedListRelayAde(list)
    setIndeterminate(!!list.length && list.length < data.relayade.length)
    setCheckAllRelayAde(list.length === data.relayade.length)
  }

  const onCheckAllChangeRelayAde = e => {
    setCheckedListRelayAde(e.target.checked ? data.relayade : [])
    setIndeterminate(false)
    setCheckAllRelayAde(e.target.checked)
  }
  const onChangeSensor = list => {
    setCheckedListSensor(list)
    setIndeterminate(!!list.length && list.length < data.sensor.length)
    setCheckAllSensor(list.length === data.sensor.length)
    console.log()
  }

  const onCheckAllChangeSensor = e => {
    setCheckedListSensor(e.target.checked ? data.sensor : [])
    setIndeterminate(false)
    setCheckAllSensor(e.target.checked)
  }
  const onChangeRelay3Channel = list => {
    setCheckedListRelay3Channel(list)
    setIndeterminate(!!list.length && list.length < data.relay3.length)
    setCheckAllRelay3Channel(list.length === data.relay3.length)
  }

  const onCheckAllChangeRelay3Channel = e => {
    setCheckedListRelay3Channel(e.target.checked ? data.relay3 : [])
    setIndeterminate(false)
    setCheckAllRelay3Channel(e.target.checked)
  }

  const handleSaveDev = () => {
    if (selectRoom === undefined) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn chưa chọn phòng!',
      })
    } else {
      const payload = {
        room_id: selectRoom,
      }
      console.log(data)

      for (let item = 0; item < checkedListRelayAde.length; item += 1) {
        Axios.patch(
          `${BASE_URL}/relayadedev/${checkedListRelayAde[item].split(' - ')[0]}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then(data => {
            if (data) {
              setChangeEffect({
                ...changeEffect,
                sensor: changeEffect.relayade + 1,
              })
            }
          })
          .catch(err => {
            notification.error({
              message: 'Lỗi',
              description: err.exception.description,
            })
            console.log(err)
          })
      }

      for (let item = 0; item < checkedListSensor.length; item += 1) {
        Axios.patch(`${BASE_URL}/sensors/${checkedListSensor[item].split(' - ')[0]}`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(data => {
            if (data) {
              setChangeEffect({
                ...changeEffect,
                sensor: changeEffect.sensor + 1,
              })
            }
          })
          .catch(err => {
            notification.error({
              message: 'Lỗi',
              description: err.exception.description,
            })
            console.log(err)
          })
      }

      for (let item = 0; item < checkedListRelay3Channel.length; item += 1) {
        Axios.patch(
          `${BASE_URL}/relay3channel/${checkedListRelay3Channel[item].split(' - ')[0]}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
          .then(data => {
            if (data) {
              setChangeEffect({
                ...changeEffect,
                sensor: changeEffect.relay3 + 1,
              })
            }
          })
          .catch(err => {
            notification.error({
              message: 'Lỗi',
              description: err.exception.description,
            })
            console.log(err)
          })
      }

      notification.success({
        message: 'Thành công',
        description: 'Thêm thiết bị thành công',
      })
      setVisible(false)
    }
  }

  const handleDeleteRoom = () => {
    if (selectRoom === undefined) {
      notification.error({
        message: 'Lỗi',
        description: 'Bạn chưa chọn phòng!',
      })
    } else {
      Axios.delete(`${BASE_URL}/rooms/${selectRoom}`)
        .then(data => {
          if (data) {
            notification.success({
              message: 'Success',
              description: 'Xóa thành công',
            })
            window.location.reload()
          }
        })
        .catch(err => {
          console.log(err)
          notification.error({
            message: 'error',
            description: 'xóa thất bại',
          })
        })
    }
  }

  const handleAccess = () => {
    Axios.get(`${BASE_URL}/open-device`)
      .then(data => {
        if (data) {
          notification.success({
            message: 'Thành công',
            description: 'Cho phép thành công',
          })
        }
      })
      .catch(err => {
        notification.error({
          message: 'Thất bại',
          description: err
        })
      })
  }

  return (
    <>
      <Button onClick={handleAccess} style={{ marginBottom: 10 }} type="primary">
        Access
      </Button>{' '}
      <br />
      <Select
        onFocus={handleFocusRoom}
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
        onChange={e => {
          setSelectRoom(e)
        }}
      >
        {roomData.map(item => {
          return (
            <Option key={item[id]} value={item[id]}>
              {item.room_name}
            </Option>
          )
        })}
      </Select>
      <AddRoom />
      <Button style={{ marginLeft: 10 }} type="primary" onClick={showDrawer}>
        Thêm thiết bị
      </Button>
      <Drawer
        title="Thêm thiết bị"
        width={350}
        placement="left"
        onClose={onClose}
        visible={visible}
      >
        <h3>Relay Ade Dev</h3>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChangeRelayAde}
          checked={checkAllRelayAde}
        >
          Check all
        </Checkbox>
        <CheckboxGroup
          options={data.relayade}
          value={checkedListRelayAde}
          onChange={onChangeRelayAde}
        />
        <Divider />

        <h3>Sensor</h3>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChangeSensor}
          checked={checkAllSensor}
        >
          Check all
        </Checkbox>
        <CheckboxGroup options={data.sensor} value={checkedListSensor} onChange={onChangeSensor} />
        <Divider />
        <h3>Relay 3 channel</h3>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChangeRelay3Channel}
          checked={checkAllRelay3Channel}
        >
          Check all
        </Checkbox>
        <CheckboxGroup
          options={data.relay3}
          value={checkedListRelay3Channel}
          onChange={onChangeRelay3Channel}
        />
        <Divider />
        <Button onClick={handleSaveDev}>Lưu</Button>
      </Drawer>
      <br />
      <EditRoom selectRoom={selectRoom} dataRoom={roomData} />
      <Popconfirm
        title="Bạn có muốn xóa?"
        onConfirm={handleDeleteRoom}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ marginLeft: 5 }} danger>
          Xóa phòng
        </Button>
      </Popconfirm>
      {selectRoom == null ? (
        <span>Chọn phòng bất kỳ</span>
      ) : (
        <>
          <h1>{roomData.filter(item => item[id] === selectRoom)[0].room_name}</h1>
          <div
            style={{
              backgroundImage:
                "url('https://th.bing.com/th/id/R.ba9963854ead9a681672ff9ff7e2af7f?rik=WAMrVS68snmSyA&pid=ImgRaw&r=0')",
            }}
          >
            <div className="site-card-border-less-wrapper">
              <RelayAde change={changeEffect.relayade} roomData={roomData} roomId={selectRoom} />
              <Sensor roomData={roomData} change={changeEffect.sensor} roomId={selectRoom} />
              <Relay3Channel change={changeEffect.relay3} roomData={roomData} roomId={selectRoom} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Rooms
