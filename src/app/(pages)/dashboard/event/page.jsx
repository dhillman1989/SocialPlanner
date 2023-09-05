"use client";

import HeaderBlock from "@/app/_components/HeaderBlock";
import "../style.scss";

import formatDateTime from "@/_helpers/formatDateTime";
import getChannelIcons from "@/_helpers/getChannelIcons";
import { useState, useEffect } from "react";
import { getOneEvent } from "@/functions/event_actions";
import Image from "next/image";

export default function Event(props) {
  let { id } = props.searchParams;

  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      let { data } = await getOneEvent(id);
      setEventData(data);
      setLoading(false);
    })();
  }, [id]);

  return (
    <>
      <HeaderBlock heading={eventData.name} />
      <div className="border rounded p-4 ">
        <div>
          {id == null || typeof id == "undefined" ? (
            <p>
              There was an error loading the Event data. If you reached this
              page by clicking a link, the link may have been incorrectly
              formatted.
            </p>
          ) : loading || !eventData._id ? (
            <>
              <span>Loading Event data</span>
            </>
          ) : (
            <div key={eventData.id} className="dashboard_event">
              <div className="flex gap-5 items-center">
                <Image
                  alt=""
                  width="50"
                  height="50"
                  src={getChannelIcons(eventData.channel?.type)}
                  className="event_thumbnail"
                />
                <span className="event_name">{eventData.name}</span>
              </div>
              <div className="pt-5">
                <span class="font-bold">{eventData.channel?.name}</span> -
                {!!eventData.datetime && formatDateTime(eventData.datetime)}
              </div>
              <span className="event_channel">{eventData.channel?.name}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
