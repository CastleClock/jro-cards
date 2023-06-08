import { NextSeo } from "next-seo";
import { createSEOPageConfig } from "../utils/seo";
import { configSet } from "../lib/pageConfig";
import Link from "next/link";
import { ChevronLeftIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events);
    };

    fetchEvents();
  }, []);

  if (!events.length) {
    return (
      <main className="max-w-md mx-auto border flex flex-col items-center justify-center h-[100vh]">
        <svg
          className="animate-spin h-24 w-24  self-center mr-2 text-[#F6800A]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          enableBackground="new 0 0 40 40"
          xml="preserve"
        >
          <path
            opacity="0.2"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z" />
        </svg>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto ">
      <NextSeo {...createSEOPageConfig(configSet.landing)} />
      <div className="sticky bg-white top-0 flex flex-row  justify-between items-center px-4 mt-4 border-b">
        <p className="font-bold">Scale YYJ</p>
        <button
          type="button"
          onClick={() => router.back()}
          className=" text-black h-min px-2 py-2 rounded-lg text-sm hover:bg-black hover:text-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4 mt-4">
        <h1 className="text-xl font-bold">Vitoria Events</h1>
        <p className="text-gray-600">Discover events happening this week.</p>
      </div>
      <div className="px-4 mt-2">
        {events.map((event, i) => (
          <div
            key={i}
            className="my-3 pb-3 hover:bg-slate-50 hover:shadow-lg rounded-xl"
          >
            <a href={event.eventUrl} target="_blank" rel="noreferrer">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="rounded-lg"
              />
              <h2 className="mt-2 text-lg font-medium pl-3">{event.title}</h2>
              <p className="text-gray-600 text-sm pl-3">{event.date}</p>
              <p className="text-gray-600 text-sm pl-3">{event.location}</p>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Events;
