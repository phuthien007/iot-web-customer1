var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  client.subscribe('mybk/smarthome/upstream')
  client.publish('mybk/smarthome/upstream', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  
})


module.exports = client