import { Box, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// a custom render function
function renderEventContent(eventInfo) {
  const startTime = eventInfo.event.start;
  const endTime = eventInfo.event.end;
  const props = eventInfo.event.extendedProps;
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
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        <b className="text-xs font-semibold">
          {formattedStartTime}
          {`${formattedEndTime ? " - " + formattedEndTime : ""}`}
        </b>
        <br />
        <i>{eventInfo.event.title}</i>
      </Box>
      {props?.editable && (
        <EditIcon sx={{ cursor: "pointer", fontSize: "18px" }} />
      )}
    </Stack>
  );
}

export default renderEventContent;
