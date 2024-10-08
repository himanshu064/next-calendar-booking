import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";

export const PLUGINS = [
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  rrulePlugin,
];

export const BUTTON_TEXT = {
  today: "Today",
  month: "Month",
  week: "Week",
  day: "Day",
  listMonth: "List Month",
  listYear: "List Year",
  listWeek: "List Week",
  listDay: "List Day",
  nextYear: "Next Year",
  prevYear: "Prev Year",
};

// export const HEADER_TOOLBAR = {
//   // left: "prev,next today",
//   left: "prevBtn,nextBtn customToday",
//   center: "title",
//   // right: "timeGridDay,timeGridWeek,dayGridMonth",
//   right: "customMonth,customWeek,customDay",
// };

export const HEADER_TOOLBAR = null;

export const INITIAL_VIEW = "timeGridWeek";

export const VIEWS = {
  dayGrid: {
    // Options apply only to dayGrid view
    titleFormat: { year: "numeric", month: "long", day: "numeric" },
  },
  timeGrid: {
    // Options apply only to timeGrid view
    titleFormat: { year: "numeric", month: "long", day: "numeric" },
  },
  list: {
    // Options apply only to list view
    titleFormat: { year: "numeric", month: "long", day: "numeric" },
  },
  day: {
    // Options apply only to day view
    titleFormat: { year: "numeric", month: "short", day: "numeric" },
  },
  week: {
    // Options apply only to week view
    titleFormat: { year: "numeric", month: "short", day: "numeric" },
  },
  month: {
    // Options apply only to month view
    titleFormat: { year: "numeric", month: "short" },
  },
  year: {
    // Options apply only to year view
    titleFormat: { year: "numeric" },
  },
};

export const defaultIntervalInMinutes = 60;

export const COLORS_SWATCH = [
  { name: "Peacock", code: "#039BE5" },
  { name: "Tomato", code: "#D50000" },
  { name: "Flamingo", code: "#E67C73" },
  { name: "Tangerine", code: "#F4511E" },
  { name: "Banana", code: "#F6BF26" },
  { name: "Sage", code: "#33B679" },
  { name: "Basil", code: "#0B8043" },
  { name: "Blueberry", code: "#3F51B5" },
  { name: "Lavender", code: "#7986CB" },
  { name: "Grape", code: "#8E24AA" },
  { name: "Graphite", code: "#616161" },
];
