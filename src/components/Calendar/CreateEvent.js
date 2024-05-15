import React, { useEffect } from "react";
import Modal from "../Modal";
import {
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { KeyboardBackspace } from "@mui/icons-material";
import Circle from "@uiw/react-color-circle";
import timezones, { extractTimezoneOffsets } from "./timezones";
import { getBrowserTimezone, getBrowserTimezoneOffset } from "./helper";
import { COLORS_SWATCH } from "./utils";

const browserTimezoneOffset = {
  id: "browser",
  label: "Browser",
  offset: getBrowserTimezoneOffset(),
};

const browserTimezone = getBrowserTimezone();

const colorCodes = COLORS_SWATCH.map((color) => color.code);

const CreateEvent = ({
  open,
  setOpen,
  defaultValues = {},
  onCreateEvent = () => {},
}) => {
  const formRef = React.useRef(null);
  const [eventTitle, setEventTitle] = React.useState("");
  const [timezone, setTimezone] = React.useState(null);
  const [eventType, setEventType] = React.useState("single");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [eventColor, setEventColor] = React.useState(colorCodes[0]);

  useEffect(() => {
    if (defaultValues) {
      const { eventTitle, timezone, eventType, fromDate, toDate } =
        defaultValues;
      setEventTitle(eventTitle);
      setTimezone(timezone);
      setEventType(eventType);
      setFromDate(fromDate);
      setToDate(toDate);
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateEvent({
      eventTitle,
      timezone,
      eventType,
      fromDate,
      toDate,
      eventColor,
    });
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Create Event"
      size="sm"
      closeOnBackdrop={false}
      closeOnEscapeKeyDown={false}
      footer={
        <>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            }}
            endIcon={
              <KeyboardBackspace
                sx={{ rotate: "180deg", display: "inline-block" }}
              />
            }
          >
            Add Event
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} ref={formRef}>
        <Grid container spacing={1}>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Title</FormLabel>
              <TextField
                autoFocus
                placeholder="Add title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Timezone</FormLabel>
              <Autocomplete
                disablePortal
                options={timezones.map((tz) => ({
                  label: tz,
                  id: tz,
                  offset: extractTimezoneOffsets(tz),
                }))}
                onChange={(_, value) => setTimezone(value)}
                renderInput={(params) => {
                  return <TextField {...params} />;
                }}
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControl fullWidth>
              <FormLabel id="event-type">Event Type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="event-type"
                name="event-type-group"
                value={
                  eventType === "single" || eventType === "recurring"
                    ? eventType
                    : "single"
                }
                onChange={(e) => setEventType(e.target.value)}
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Single"
                />
                <FormControlLabel
                  value="recurring"
                  control={<Radio />}
                  label="Recurring"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>From Date</FormLabel>
              <MobileDateTimePicker
                value={fromDate}
                onChange={(date) => setFromDate(date)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>To Date</FormLabel>
              <MobileDateTimePicker
                value={toDate}
                onChange={(date) => setToDate(date)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <FormLabel>Color</FormLabel>
            <Box
              sx={{
                marginTop: 1,
                background: "#efefef",
                display: "flex",
                padding: 1,
                alignItems: "center",
                borderBottom: `2px solid ${eventColor}`,
              }}
            >
              <Circle
                colors={colorCodes}
                color={eventColor}
                onChange={(color) => {
                  setEventColor(color.hex);
                }}
                pointProps={{
                  style: {
                    height: "20px",
                    width: "20px",
                    marginRight: "8px",
                    padding: 0,
                  },
                }}
              />
            </Box>
          </FormControl>
        </Grid>

        {/* Hidden submit button to ensure Enter key works */}
        <button type="submit" style={{ display: "none" }} />
      </form>
    </Modal>
  );
};

export default CreateEvent;
