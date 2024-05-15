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
  COLORS_SWATCH,
  HEADER_TOOLBAR,
  INITIAL_VIEW,
  PLUGINS,
  VIEWS,
  defaultIntervalInMinutes,
} from "./utils";
import useImageButton from "./hooks/useImageButton";
import useIconButton from "./hooks/useIconButton";
import CreateEvent from "./CreateEvent";
import { createId } from "./helper";
import renderEventContent from "./methods/renderEventContent";
import { useEventContext } from "@/context";
import EditEvent from "./EditEvent";
import { setLocalStorage } from "@/lib/localStorage";

function Calendar() {
  const { events } = useEventContext();
  const fullCalendarRef = useRef(null);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);

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
      dates.push(
        dayjs(selectInfo.dateStr).add(defaultIntervalInMinutes, "minutes")
      );
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
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo, "selectInfo selectInfo");
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
      dates.push(
        dayjs(selectInfo.endStr).add(defaultIntervalInMinutes, "minutes")
      );
    }

    console.log(dates, "dates dates dates");

    setSelectedDates(dates);
    // calendarApi.unselect(); // clear date selection
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

  const handleCreateEvent = ({
    eventTitle,
    timezone,
    eventType,
    fromDate,
    toDate,
    eventColor,
  }) => {
    const id = createId();
    fullCalendarRef.current?.calendar?.addEvent({
      id,
      title: eventTitle,
      start: fromDate.toDate(),
      end: toDate.toDate(),
      allDay: eventType === "recurring",
      color: eventColor,
      extendedProps: {
        // timezone,
        id,
        editable: false,
      },
    });
    setOpenCreateEvent(false);
  };

  const handleEditEvent = ({
    eventTitle,
    timezone,
    eventType,
    fromDate,
    toDate,
    eventColor,
  }) => {
    const id = createId();
    fullCalendarRef.current?.calendar?.addEvent({
      id,
      title: eventTitle,
      start: fromDate.toDate(),
      end: toDate.toDate(),
      allDay: eventType === "recurring",
      color: eventColor,
      extendedProps: {
        // timezone,
        id,
        editable: false,
      },
    });
    setOpenCreateEvent(false);
  };

  const defaultAddEventValues = useMemo(() => {
    return {
      eventType: "single",
      fromDate: selectedDates[0],
      toDate: selectedDates[1],
    };
  }, [selectedDates]);

  function handleEvents(events) {
    if (events.length > 0) {
      setLocalStorage("events", events);
    }
    setCurrentEvents(events);
  }

  console.log(currentEvents, "currentEvents");

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
        // to disable the dragging after event is created
        eventStartEditable={false}
        // when selection is been made time appears
        selectMirror
        select={handleDateSelect}
        dateClick={handleDateClick}
        eventColor={COLORS_SWATCH[0].code}
        editable
        eventClick={(info) => console.log(info, "info asadsad")}
        // called after events are initialized/added/changed/removed
        eventsSet={handleEvents}
      />

      <CreateEvent
        key={openCreateEvent ? "open-create" : "close-create"}
        open={openCreateEvent}
        setOpen={setOpenCreateEvent}
        defaultValues={defaultAddEventValues}
        onCreateEvent={handleCreateEvent}
      />

      <EditEvent
        key={openEditEvent ? "open-edit" : "close-edit"}
        open={openEditEvent}
        setOpen={setOpenEditEvent}
        defaultValues={defaultAddEventValues}
        onEditEvent={handleEditEvent}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
