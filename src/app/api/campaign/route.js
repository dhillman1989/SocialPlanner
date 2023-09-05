import Campaign from "../../../schemas/campaignSchema";
import { NextRequest, NextResponse } from "next/server";

import connect from "../connect";

//DB CONNECTION
connect();

export async function GET(request, context) {
  const fullCampaignData = await Campaign.find({});

  return NextResponse.json(fullCampaignData);
}

export async function POST(req) {
  const data = await req.json();
  let { name, description } = data;
  const newCampaign = new Campaign({
    name,
    description,
  });

  await newCampaign.save();
  return NextResponse.json({ id: newCampaign._id });
}

export async function PUT(req) {
  const data = await req.json();
  const { id, newData } = data;

  let index = campaigns.findIndex((campaign) => id === campaign.id);
  campaigns[index] = { ...campaigns[index], ...newData };
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const data = await req.json();
  const { id } = data;

  let newCampaigns = campaigns.filter((campaign) => {
    return id != campaign.id;
  });

  campaigns = newCampaigns;
  return NextResponse.json({ success: true });
}
