import { EventProvider } from "@/context";
import FullCalendar from "./Calendar";

const Calendar = () => {
  return (
    <EventProvider>
      <FullCalendar />
    </EventProvider>
  );
};

export { Calendar };
