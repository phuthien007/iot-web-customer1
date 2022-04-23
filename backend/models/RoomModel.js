const mongoose = require("mongoose");

const Schema = mongoose.Schema

const RoomSchema = new Schema(
  {
    room_name: {
      type: String,
      required: true
    }
  },{
    collection:"rooms",
    autoIndex:true,
    timestamps: true
  }
);

const roomModel = mongoose.model("rooms", RoomSchema);

module.exports = roomModel;
