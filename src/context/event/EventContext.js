import { createContext, useContext } from "react";

const EventContext = createContext({
  events: [],
  setEvents: () => {},
});

export default EventContext;

export const useEventContext = () => {
  return useContext(EventContext);
};
