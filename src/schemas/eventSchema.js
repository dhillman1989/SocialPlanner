import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  campaign: { type: Schema.Types.ObjectId, ref: "Campaign" },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  description: String,
  datetime: String,
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
