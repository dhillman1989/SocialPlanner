"use client";

import Link from "next/link";
import formatDateTime from "../../../_helpers/formatDateTime";
import getChannelIcon from "@/_helpers/getChannelIcons";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getEvents } from "@/functions/event_actions";

export default function EventList() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let data = [];
    setLoading(true);
    (async () => {
      const res = await getEvents();
      if (res.error) {
        return;
      }
      data = res.data;
      setEventData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className=" dashboard-events border rounded p-3 m-3">
      <ul className="dashboard_events_list flex flex-col gap-4">
        {loading ? (
          <span>Loading Events...</span>
        ) : !eventData || eventData.length < 1 ? (
          <span>No Data to display!</span>
        ) : (
          eventData &&
          eventData.map((event) => {
            return (
              <li
                key={event._id}
                id={event._id}
                className="dashboard_event flex gap-3"
              >
                <Link
                  href={{
                    pathname: "/dashboard/event/",
                    query: { id: event._id },
                  }}
                >
                  <Image
                    alt=""
                    width="100"
                    height="100"
                    src={getChannelIcon(event.channel.type)}
                    className="event_thumbnail"
                  />
                </Link>
                <div className="event_info flex flex-col items-start">
                  <span className="event_name font-extrabold">
                    {event.name}
                  </span>
                  <span className="event_campaign">
                    <Link
                      className="rounded bg-orange-300 text-xs block py-1 px-2"
                      href={{
                        pathname: "/dashboard/campaign/",
                        query: { id: event.campaign?._id },
                      }}
                    >
                      {event.campaign.name}
                    </Link>
                  </span>
                  <span className="event_datetime italic font-light text-sm">
                    {formatDateTime(event.datetime)}
                  </span>
                  <span className="event_channel">{event.channel.name}</span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
