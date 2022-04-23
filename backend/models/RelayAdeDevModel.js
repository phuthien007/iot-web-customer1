const mongoose = require("mongoose");

const Schema = mongoose.Schema

const RelayAdeDevSchema = new Schema(
  {
    dev_addr: {
      type: String,
      required: true
    },
    dev_name: {
      type: String,
      required: true
    } ,
    relay_state: {
        type: Boolean,
        default: false
    },
    vrms: {
        type: Number,
        default: 0
    },
    irms: {
        type: Number,
        default: 0
    },
    power: {
        type: Number,
        default: 0
    },
    energy: {
        type: Number,
        default: 0
    },
    dev_category:{
        type: String,
        default: 'relay_ade'
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    }

  },{
    collection:"relay_ade_dev",
    autoIndex:true,
    timestamps: true
  }
);

const relayAdeDevModel = mongoose.model("relay_ade_dev", RelayAdeDevSchema);

module.exports = relayAdeDevModel;
