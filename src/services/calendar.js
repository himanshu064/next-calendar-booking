import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "@/lib/localStorage";

const getAllEvents = () => {
  return getLocalStorage("events") || [];
};

const addEvent = (event) => {
  const events = getAllEvents();
  events.push(event);
  setLocalStorage("events", events);
};

const updateEvent = (event) => {
  const events = getAllEvents();
  const index = events.findIndex((e) => e.id === event.id);
  events[index] = event;
  setLocalStorage("events", events);
};

const deleteEvent = (id) => {
  // const events = getAllEvents();
  // const updatedEvents = events.filter((e) => e.id !== id);
  // setLocalStorage("events", updatedEvents);
  removeLocalStorage("events", id);
};

export { getAllEvents, addEvent, updateEvent, deleteEvent };
