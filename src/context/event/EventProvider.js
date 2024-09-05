import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { createId } from "@/components/Calendar/helper";
import EventContext from "./EventContext";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

function calculateByStepPos(dtstart = dayjs(new Date())) {
  // const dtstart = dayjs(new Date("2024-09-27"));
  const dtStart = dayjs(new Date(dtstart));

  const dayOfWeek = dtStart.day(); // 5 = Friday
  const dayOfMonth = dtStart.date(); // 13

  const firstDayOfMonth = dtStart.startOf("month");
  const firstFridayOfMonth = firstDayOfMonth.add(
    (5 - firstDayOfMonth.day() + 7) % 7,
    "days"
  );

  let fridayCount = 0;
  let currentFriday = firstFridayOfMonth;

  while (currentFriday.isBefore(dtStart)) {
    fridayCount++;
    currentFriday = currentFriday.add(7, "days");
  }

  if (dayOfWeek === 5) {
    // If the current date is a Friday
    fridayCount++;
  }

  const bysetpos = fridayCount;

  return bysetpos - 1;
}

function calculateByWeekDay(date = new Date()) {
  const dayjsDate = dayjs(date);
  const dayOfWeek = dayjsDate.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  console.log(dayOfWeek, "dayOfWeek dayOfWeek");
  switch (dayOfWeek) {
    case 0:
      return ["su"]; // Sunday
    case 1:
      return ["mo"]; // Monday
    case 2:
      return ["tu"]; // Tuesday
    case 3:
      return ["we"]; // Wednesday
    case 4:
      return ["th"]; // Thursday
    case 5:
      return ["fr"]; // Friday
    case 6:
      return ["sa"]; // Saturday
    default:
      throw new Error("Invalid day of the week");
  }
}

const defaultEvents = [
  {
    title: "Meeting",
    // start: new Date(),
    // end: dayjs(new Date()).add(2, "hours").toDate(),
    color: "#ff0000",
    textColor: "white",
    extendedProps: {
      id: createId(),
      editable: true,
    },
    rrule: {
      freq: "monthly", // Repeat every month
      // byweekday: ["fr"], // Repeat on Thursday
      byweekday: calculateByWeekDay(new Date("2024-09-13")),
      // bymonthday: [1, 2, 3, 4, 5, 6, 7], // Limit to the first 7 days of the month
      // count: 12                // Number of occurrences (optional)
      // bysetpos: 2, // Second Thursday of the month
      bysetpos: calculateByStepPos(new Date("2024-09-13")),
      dtstart: dayjs(new Date("2024-09-13")).format("YYYY-MM-DDTHH:mm:ss.sssZ"),
    },
    duration: "02:00",
  },
];

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(defaultEvents);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // useEffect(() => {
  //   const storedEvents = getLocalStorage("events");
  //   if (storedEvents && storedEvents.length > 0) {
  //     setEvents(storedEvents);
  //   } else {
  //     setLocalStorage("events", defaultEvents);
  //     setEvents(defaultEvents);
  //   }
  // }, []);

  return (
    <EventContext.Provider
      value={{ events, setEvents, filteredEvents, setFilteredEvents }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
