import { createContext, useContext } from "react";

const EventContext = createContext({
  events: [],
  setEvents: () => {},
  filteredEvents: [],
  setFilteredEvents: () => {},
});

export default EventContext;

export const useEventContext = () => {
  return useContext(EventContext);
};
