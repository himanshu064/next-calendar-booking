import React from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DayIcon from "@/icons/DayIcon";

const Header = (props, ref) => {
  const calendarApi = ref.current?.calendar;

  const goToToday = () => calendarApi?.today?.();
  const gotToPrev = () => calendarApi?.prev?.();
  const gotToNext = () => calendarApi?.next?.();

  const handleViewChange = (view) => calendarApi?.changeView?.(view);

  return (
    <div className="mb-4">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">Calendar</Typography>
          <Typography variant="caption">An even booking calendar</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1.5rem",
              color: (theme) => theme.palette.grey[600],
            }}
            variant="subtitle1"
          >
            {calendarApi?.currentData?.viewTitle || ""}
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Today">
            <IconButton
              onClick={goToToday}
              sx={{ height: "40px", width: "40px" }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/007/879/777/large_2x/today-icon-style-free-vector.jpg"
                className="h-full w-full"
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous">
            <IconButton onClick={gotToPrev}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton onClick={gotToNext}>
              <ArrowForwardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Month View">
            <IconButton
              sx={{
                height: "40px",
                width: "40px",
              }}
              onClick={() => handleViewChange("dayGridMonth")}
            >
              <CalendarMonthIcon
                fontSize="medium"
                sx={{ color: "black", margin: "6px" }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Day View">
            <IconButton
              sx={{
                height: "40px",
                width: "40px",
              }}
              onClick={() => handleViewChange("timeGridDay")}
            >
              <DayIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Week View">
            <IconButton
              sx={{
                height: "40px",
                width: "40px",
              }}
              onClick={() => handleViewChange("timeGridWeek")}
            >
              <img src="/week.png" className="h-full w-full" alt="Month View" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </div>
  );
};

export default React.forwardRef(Header);
