import mongoose from "mongoose";
const { Schema } = mongoose;

const campaignSchema = new Schema({
  name: String,
  description: String,
});

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", campaignSchema);
