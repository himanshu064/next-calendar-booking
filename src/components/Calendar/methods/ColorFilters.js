import React, { useState, useEffect, useRef } from "react";
import Circle from "@uiw/react-color-circle";

import { useEventContext } from "@/context";

const ColorFilters = () => {
  const [colors, setColors] = useState([]);
  const { events, setFilteredEvents } = useEventContext();
  const [filterColor, setFilterColor] = useState("");
  console.log(events, "events");

  const eventsBackup = useRef(events);
  const eventsBackupSet = useRef(false);

  console.log(eventsBackupSet.current, "eventsBackupSet.current");

  useEffect(() => {
    if (events.length > 0 && eventsBackupSet.current === false) {
      eventsBackup.current = events;
      eventsBackupSet.current = true;
    }
    if (events.length > 0) {
      setColors([...new Set(events.map((event) => event.backgroundColor))]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  useEffect(() => {
    if (filterColor === "") return;

    console.log(filterColor, "filterColor filterColor");

    const newEvents = events.filter(
      (event) =>
        event.backgroundColor.toLowerCase() === filterColor.toLowerCase()
    );

    console.log(newEvents, "newEvents newEvents");
    setFilteredEvents(newEvents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterColor]);

  return (
    <Circle
      colors={colors}
      color={filterColor}
      onChange={(color) => {
        setFilterColor(color.hex);
      }}
      pointProps={{
        style: {
          height: "20px",
          width: "20px",
          marginRight: "8px",
          padding: 0,
        },
      }}
    />
  );
};

export default ColorFilters;
