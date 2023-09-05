import HeaderBlock from "../../../_components/HeaderBlock";
import "../style.scss";

import Link from "next/link";

let events = [];
import formatDateTime from "../../../../_helpers/formatDateTime";
import getChannelIcons from "@/_helpers/getChannelIcons";

import Image from "next/image";

export default function Campaign(props) {
  let { id } = props.searchParams;

  let filteredEvents = events.filter((event) => {
    return event.campaign_id == id;
  });

  return (
    <div className="Dashboard">
      <HeaderBlock heading="Campaign Overview" />

      <div className="dashboard-events bordered">
        <ul className="dashboard_events_list">
          {filteredEvents.map((event) => {
            return (
              <li key={event.id} className="dashboard_event">
                <Image
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
          })}
        </ul>
      </div>
    </div>
  );
}
