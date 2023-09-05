"use client";

import HeaderBlock from "@/app/_components/HeaderBlock";
import "../style.scss";

import Link from "next/link";

import formatDateTime from "@/_helpers/formatDateTime";
import getChannelIcons from "@/_helpers/getChannelIcons";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Channel(props) {
  let { id } = props.searchParams;

  const [channelEvents, setChannelEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let data = [];
    setLoading(true);
    fetch("http://localhost:3000/api/event").then((res) => {
      if (!res.ok) {
        setLoading(false);
        throw new Error("No Data could be found");
      }
      res
        .json()
        .then((res) => (data = res))
        .then(() => {
          setChannelEvents(
            data.filter((event) => {
              return event.channel_id == id;
            })
          );
        });
    });
  }, [id]);

  return (
    <div className="Dashboard">
      <HeaderBlock heading="Channel Overview" />

      <div className="dashboard-events bordered">
        <ul className="dashboard_events_list">
          {channelEvents && channelEvents < 1 ? (
            <>
              <span>No events for this channel have been setup</span>
              <button class="button button--primary">Add event</button>
            </>
          ) : (
            channelEvents &&
            channelEvents.map((event) => {
              return (
                <li key={event.id} className="dashboard_event">
                  <Image
                    width="100"
                    height="100"
                    alt=""
                    src={getChannelIcons(event.channel)}
                    className="event_thumbnail"
                  />
                  <div className="event_info">
                    <span className="event_name">{event.name}</span>
                    <span className="event_campaign">
                      <Link
                        href={{
                          pathname: "/dashboard/campaign/",
                          query: { id: event.campaign_id },
                        }}
                      >
                        {event.campaign_name}
                      </Link>
                    </span>
                    <span className="event_datetime">
                      {formatDateTime(event.datetime)}
                    </span>
                    <span className="event_channel">{event.channel}</span>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
