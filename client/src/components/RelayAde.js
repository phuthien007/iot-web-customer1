import { Button, Card, Divider, Popconfirm, Table, Tag } from 'antd'
import Search from 'antd/lib/input/Search'
import React from 'react'
import ModalViewRelayAde from './ModalEditRelayAde'
import ViewRelayAde from './ViewRelayAde'

const fakeData = [
  {
    dev_addr: 'A',
    dev_name: 'Tủ lạnh',
    relay_state: true,
    vrms: 220,
    irms: 0.1,
    power: 10,
    energy: 1,
  },
  {
    dev_addr: 'B',
    dev_name: 'Quạt',
    relay_state: false,
    vrms: 110,
    irms: 0.5,
    power: 5,
    energy: 2,
  },
]

const columns = [
  {
    title: 'Địa chỉ thiết bị',
    dataIndex: 'dev_addr',
    key: 'id',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'dev_name',
    key: 'id',
  },
  {
    title: 'Trạng thái',
    key: 'id',
    dataIndex: 'relay_state',
    render: tag => <Tag color="green">{tag ? 'ON' : 'OFF'}</Tag>,
  },
  {
    title: 'VRMS',
    dataIndex: 'vrms',
    key: 'id',
    render: text => <span>{text} V</span>,
  },
  {
    title: 'IRMS',
    dataIndex: 'irms',
    key: 'id',
    render: text => <span>{text} A</span>,
  },
  {
    title: 'Công suất',
    dataIndex: 'power',
    key: 'id',
    render: text => <span>{text} W</span>,
  },
  {
    title: 'Năng lượng',
    dataIndex: 'energy',
    key: 'id',
    render: text => <span>{text} Kwh</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: record => (
      <span>
        <ModalViewRelayAde record={record} />
        <Divider type="vertical" />
        <ViewRelayAde />
        <Divider type="vertical" />
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
          <Button danger>Delete</Button>
        </Popconfirm>
        <Divider type="vertical" />
      </span>
    ),
  },
]

function RelayAde() {
  // const [visible, setVisible] = useState(false)
  // const showDrawer = () => {
  //   setVisible(true)
  // }
  // const onClose = () => {
  //   setVisible(false)
  // }
  return (
    <>
      <Card
        color="white"
        title={<span style={{ color: '#fff', fontSize: 30 }}>Relay Ade</span>}
        style={{
          backgroundColor: 'rgba(12,134,234,.6)',
          color: 'white',
          marginLeft: '10%',
          width: '80%',
          marginTop: 20,
        }}
        extra={<Search placeholder="Tìm kiếm theo tên thiết bị" style={{ width: '100%' }} />}
      >
        <Table pagination={false} dataSource={fakeData} columns={columns} />
      </Card>
    </>
  )
}

export default RelayAde
