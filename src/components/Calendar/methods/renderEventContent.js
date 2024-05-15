// a custom render function
function renderEventContent(eventInfo) {
  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;
  const formattedStartTime = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // when date is being dragged to select, end time will be there, not otherwise
  let formattedEndTime;
  if (endTime) {
    formattedEndTime = endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <>
      <b className="text-xs font-semibold">
        {formattedStartTime}
        {`${formattedEndTime ? " - " + formattedEndTime : ""}`}
      </b>
      <br />
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default renderEventContent;
