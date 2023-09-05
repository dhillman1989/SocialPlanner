import HeaderBlock from "../../_components/HeaderBlock";
import "./style.scss";

import ChannelList from "./ChannelList";
import EventList from "./EventList";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "@/app/_components/searchBox";

export default function Dashboard() {
  return (
    <div className="Dashboard container">
      <HeaderBlock heading="Dashboard" />
      <SearchBox />
      <div>
        <ul className="flex gap-6 m-4 align-center justify-center">
          <Link
            className="flex align-center gap-3 px-3 py-2 hover:bg-orange-200 "
            href="/dashboard/addevent"
          >
            <Image
              src="/assets/images/eventicon.svg"
              alt=""
              width="20"
              height="20"
            />
            Add New Event
          </Link>
          <Link
            className="flex align-center gap-3 px-3 py-2 hover:bg-orange-200 "
            href="/dashboard/addchannel"
          >
            <Image
              alt=""
              src="/assets/images/channelicon.svg"
              width="20"
              height="20"
            />
            Add New Channel
          </Link>
        </ul>
      </div>
      <ChannelList />
      <EventList />
    </div>
  );
}
