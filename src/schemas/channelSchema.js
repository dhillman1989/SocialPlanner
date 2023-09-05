import mongoose from "mongoose";
const { Schema } = mongoose;

const channelSchema = new Schema({
  name: String,
  description: String,
  type: String,
  url: String,
});

export default mongoose.models.Channel ||
  mongoose.model("Channel", channelSchema);
