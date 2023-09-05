import connect from "@/app/api/connect";
import Channel from "@/schemas/channelSchema";

import { NextResponse } from "next/server";

//DB CONNECTION
connect();

export async function DELETE(req, { params }) {
  const { channelID } = params;
  console.log(channelID);
  await Channel.deleteOne({ _id: channelID });

  return NextResponse.json({ success: true });
}
