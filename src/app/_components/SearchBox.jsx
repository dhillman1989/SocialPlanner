"use client";

import { searchEvents } from "@/functions/event_actions";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 750);
  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      (async () => {
        const res = await searchEvents(debouncedSearchQuery);
        const { data } = await res;
        if (res.error) {
          console.log(res.error);
        } else {
          setSearchResults(data);
        }
      })();
    }
  }, [debouncedSearchQuery]);

  return (
    <form className="relative w-48">
      <input
        className="py-1 px-2 rounded border w-full"
        placeholder="search"
        value={searchQuery}
        onChange={searchHandler}
      />

      {searchResults.length > 0 && searchQuery.length >= 3 ? (
        <div className="bg-white p-2 absolute w-full">
          {searchResults.map((event) => (
            <Link
              key={event._id}
              href={{ pathname: "/dashboard/event/", query: { id: event._id } }}
            >
              {event.name}
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
