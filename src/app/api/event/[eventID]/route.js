import connect from "@/app/api/connect";
import Channel from "@/schemas/channelSchema";
import Campaign from "@/schemas/campaignSchema";
import Event from "@/schemas/eventSchema";

import { NextResponse } from "next/server";

//DB CONNECTION
connect();
export async function GET(req, { params }) {
  const { eventID } = params;

  const event = await Event.findOne({ _id: eventID })
    .populate({ path: "channel", model: Channel })
    .populate({ path: "campaign", model: Campaign })
    .exec();
  return NextResponse.json(event);
}

export async function DELETE(req, { params }) {
  const { eventID } = params;
  console.log(eventID);
  await Event.deleteOne({ _id: eventID });

  return NextResponse.json({ success: true });
}
