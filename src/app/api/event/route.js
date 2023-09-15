import { NextRequest, NextResponse } from "next/server";
import Channel from "../../../schemas/channelSchema";
import Campaign from "../../../schemas/campaignSchema";
import connect from "../connect";
import Event from "../../../schemas/eventSchema";

//DB CONNECTION
connect();

export async function GET(req) {
  const fullEventData = await Event.find()
    .populate({ path: "channel", model: Channel })
    .populate({ path: "campaign", model: Campaign })
    .exec();

  return NextResponse.json(fullEventData);
}

export async function POST(req, res) {
  const data = await req.json();
  let { name, campaign_id, channel_id, description, datetime } = data;
  const newEvent = await new Event({
    name,
    campaign: campaign_id,
    channel: channel_id,
    description,
    datetime,
  });

  await newEvent.save();
  return new Response(`Successfully added Event: ${name}`, { status: 200 });
}

// export async function PUT(req) {
//   const data = await req.json();
//   const { id, newData } = data;

//   let index = events.findIndex((event) => id === event.id);
//   events[index] = { ...events[index], ...newData };
//   return NextResponse.json({ success: true });
// }

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;

  await Event.deleteMany({});

  return NextResponse.json({ success: true });
}
