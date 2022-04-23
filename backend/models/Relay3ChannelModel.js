const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Relay3ChannelSchema = new Schema(
  {
    dev_addr: {
      type: String,
      required: true
    },
    dev_name_1: {
      type: String,
      required: true
    } ,
    state_dev_name_1: {
      type: Boolean,
      required: true
    } ,
    dev_name_2: {
      type: String,
      required: true
    } ,
    state_dev_name_2: {
      type: Boolean,
      required: true
    } ,
    dev_name_3: {
      type: String,
      required: true
    } ,
    state_dev_name_3: {
      type: Boolean,
      required: true
    } ,
    dev_category:{
        type: String,
        default: 'relay_3kenh'
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'rooms'
    }

  },{
    collection:"relay_3_channel",
    autoIndex:true,
    timestamps: true
  }
);

const relay3ChannelModel = mongoose.model("relay_3_channel", Relay3ChannelSchema);

module.exports = relay3ChannelModel;
