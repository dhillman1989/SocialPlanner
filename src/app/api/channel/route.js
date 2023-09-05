import { NextRequest, NextResponse } from "next/server";

import Channel from "../../../schemas/channelSchema";

import connect from "../connect";

//DB CONNECTION
connect();

export async function GET(req, context) {
  const fullChannelData = await Channel.find();
  return Response.json(fullChannelData);
}

export async function POST(req) {
  const data = await req.json();
  const { type, name, description, url } = data;
  const newChannel = await new Channel({
    type,
    name,
    description,
    url,
  });
  await newChannel.save();
  return Response.json(`Added data:` + { type, url, name, description }, {
    status: 200,
  });
}

// export async function PUT(req) {
//   const data = await req.json();
//   const { id, newData } = data;

//   let index = channels.findIndex((channel) => id === channel.id);
//   channels[index] = { ...channels[index], ...newData };
//   return NextResponse.json({ success: true });
// }

export async function DELETE(req) {
  await Channel.deleteMany({});
  return NextResponse.json({ success: true });
}
