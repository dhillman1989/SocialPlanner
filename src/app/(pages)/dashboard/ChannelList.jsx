"use client";

import getChannelIcons from "@/_helpers/getChannelIcons.js";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import Link from "next/link";
import Image from "next/image";
import { getChannels } from "@/functions/channel_actions";

export default function Dashboard() {
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let data = [];
    setLoading(true);
    (async () => {
      const res = await getChannels();
      data = res.data;
      setChannelData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="border rounded social_accounts m-3 p-3">
      <ul className="social_accounts_list flex gap-4 ">
        {loading ? (
          <span>Loading Channels</span>
        ) : (
          channelData &&
          channelData.map((acc) => {
            let icon = getChannelIcons(acc.type);
            return (
              <li key={acc._id} className="social_account ">
                <Link
                  className="flex flex-col text-center align-center justify-center"
                  href={{
                    pathname: "/dashboard/channel/",
                    query: { id: acc._id },
                  }}
                >
                  <Image
                    alt=""
                    width="100"
                    height="100"
                    className="social_account_thumbnail"
                    src={icon}
                  />
                  <span className="center">{acc.name}</span>
                </Link>
              </li>
            );
          })
        )}

        {/* <li className="social_account">
          <i className="social_account_thumbnail add"></i>
          <span>Add channel</span>
        </li> */}
      </ul>
    </div>
  );
}
