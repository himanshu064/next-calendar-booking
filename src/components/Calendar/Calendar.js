"use client";

import { useState, useRef, useMemo } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FullCalendar from "@fullcalendar/react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DateIcon from "@/icons/DayIcon";
import {
  BUTTON_TEXT,
  HEADER_TOOLBAR,
  INITIAL_VIEW,
  PLUGINS,
  VIEWS,
} from "./utils";
import useImageButton from "./hooks/useImageButton";
import useIconButton from "./hooks/useIconButton";
import CreateEvent from "./CreateEvent";

// a custom render function
function renderEventContent(eventInfo) {
  const eventTime = eventInfo.event.start;
  const formattedTime = eventTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <>
      <b>{formattedTime}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const events = [{ title: "Meeting", start: new Date() }];

function Calendar() {
  const fullCalendarRef = useRef(null);

  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const goToToday = () => fullCalendarRef.current?.calendar?.today?.();
  const gotToPrev = () => fullCalendarRef.current?.calendar?.prev?.();
  const gotToNext = () => fullCalendarRef.current?.calendar?.next?.();

  const handleViewChange = (view) =>
    fullCalendarRef.current?.calendar?.changeView?.(view);

  // Previous Button
  const { prevBtn } = useIconButton({
    name: "prevBtn",
    icon: (
      <ArrowBackIcon fontSize="large" sx={{ color: "black", margin: "2px" }} />
    ),
    alt: "Previous",
    title: "Previous",
    onClick: gotToPrev,
  });

  // Next Button
  const { nextBtn } = useIconButton({
    name: "nextBtn",
    icon: (
      <ArrowBackIcon
        fontSize="large"
        sx={{
          color: "black",
          margin: "2px",
          rotate: "180deg",
          display: "inline-block",
        }}
      />
    ),
    alt: "Next",
    title: "Next",
    onClick: gotToNext,
  });

  // Today Button
  const { customToday } = useImageButton({
    name: "customToday",
    src: "https://static.vecteezy.com/system/resources/previews/007/879/777/large_2x/today-icon-style-free-vector.jpg",
    alt: "Custom today",
    title: "Today",
    onClick: goToToday,
  });

  // Month Button
  const { customMonth } = useIconButton({
    name: "customMonth",
    icon: (
      <CalendarMonthIcon
        fontSize="large"
        sx={{ color: "black", margin: "6px" }}
      />
    ),
    alt: "Custom month",
    title: "Month",
    onClick: () => handleViewChange("dayGridMonth"),
  });

  // Week Button
  const { customWeek } = useImageButton({
    name: "customWeek",
    src: "/week.png",
    alt: "Custom week",
    title: "Week",
    onClick: () => handleViewChange("timeGridWeek"),
    imageStyles: { height: "28px", width: "28px", margin: "6px" },
  });

  // Day Button
  const { customDay } = useIconButton({
    name: "customDay",
    icon: <DateIcon style={{ height: "28px", width: "28px", margin: "6px" }} />,
    alt: "Custom day",
    title: "Day",
    onClick: () => handleViewChange("timeGridDay"),
  });
  // use .svg files as image source
  // const { customDate } = useImageButton({
  //   name: "customDate",
  //   src: "/date.svg",
  //   alt: "Custom week",
  //   onClick: () => alert("Custom week"),
  // });

  // const { customIconButton } = useIconButton({
  //   name: "customIconButton",
  //   icon: <AddAlarm fontSize="large" />, // Use your icon component
  //   styles: { height: "40px", width: "40px" },
  //   onClick: () => alert("Custom icon button clicked"),
  // });

  const handleDateClick = (selectInfo) => {
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo, "selectInfo");
    console.log(calendarApi, "calendarApi");
    // let title = prompt("Please enter a new title for your event");

    // calendarApi.unselect(); // clear date selection
    const dates = [];
    if (selectInfo.dateStr) {
      dates.push(dayjs(selectInfo.dateStr));
    }

    if (selectInfo.endStr) {
      dates.push(dayjs(selectInfo.endStr));
    } else {
      dates.push(dayjs(selectInfo.dateStr).add(1, "hour"));
    }

    console.log(dates, "dates dates dates");

    setSelectedDates(dates);
    setOpenCreateEvent(true);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo, "selectInfo");
    const calendarApi = selectInfo.view.calendar;
    console.log(calendarApi, "calendarApi");
    // let title = prompt("Please enter a new title for your event");

    const dates = [];
    if (selectInfo.startStr) {
      dates.push(dayjs(selectInfo.startStr));
    }

    if (selectInfo.endStr) {
      let endDateStr = dayjs(selectInfo.endStr);
      // in case of month view, subtract 1 minute from the end date, so that end date is not included
      if (selectInfo.view.type === "dayGridMonth") {
        endDateStr = endDateStr.subtract(1, "minute");
      }
      dates.push(endDateStr);
    } else {
      dates.push(dayjs(selectInfo.endStr).add(1, "hour"));
    }

    console.log(dates, "dates dates dates");

    setSelectedDates(dates);
    calendarApi.unselect(); // clear date selection
    setOpenCreateEvent(true);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  };

  const defaultAddEventValues = useMemo(() => {
    return {
      title: "",
      timezone: "",
      eventType: "single",
      fromDate: selectedDates[0],
      toDate: selectedDates[1],
    };
  }, [selectedDates]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FullCalendar
        ref={fullCalendarRef}
        plugins={PLUGINS}
        initialView={INITIAL_VIEW}
        weekends
        events={events}
        eventContent={renderEventContent}
        headerToolbar={HEADER_TOOLBAR}
        buttonText={BUTTON_TEXT}
        customButtons={{
          prevBtn,
          nextBtn,
          customToday,
          // customIconButton,
          customMonth,
          customWeek,
          customDay,
        }}
        // views={VIEWS}
        // When a date is clicked
        selectable
        select={handleDateSelect}
        dateClick={handleDateClick}
      />

      <CreateEvent
        key={openCreateEvent ? "open" : "close"}
        open={openCreateEvent}
        setOpen={setOpenCreateEvent}
        defaultValues={defaultAddEventValues}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
