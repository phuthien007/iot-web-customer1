const mongoose = require("mongoose");

const Schema = mongoose.Schema

const SensorSchema = new Schema(
  {
    temp: {
      type: Number,
      required: true,
      default: 0
    },
    humidity: {
      type: Number,
      default: 0,
      required: true
    } ,
    air_quality: {
        type: Number,
        default: 0,
        required: true
      } ,
    dev_category:{
        type: String,
        default: 'sensors'
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    }

  },{
    collection:"sensors",
    autoIndex:true,
    timestamps: true
  }
);

const sensorModel = mongoose.model("sensors", SensorSchema);

module.exports = sensorModel;
