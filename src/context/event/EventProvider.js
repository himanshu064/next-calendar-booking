import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { createId } from "@/components/Calendar/helper";
import EventContext from "./EventContext";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

const defaultEvents = [
  {
    title: "Meeting",
    start: new Date(),
    end: dayjs(new Date()).add(2, "hours").toDate(),
    color: "#ff0000",
    textColor: "white",
    extendedProps: {
      id: createId(),
      editable: true,
    },
  },
];

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const storedEvents = getLocalStorage("events");
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      setLocalStorage("events", defaultEvents);
      setEvents(defaultEvents);
    }
  }, []);

  return (
    <EventContext.Provider
      value={{ events, setEvents, filteredEvents, setFilteredEvents }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
