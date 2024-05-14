import React, { useEffect } from "react";
import dayjs from "dayjs";
import Modal from "../Modal";
import {
  Autocomplete,
  Typography,
  Box,
  Button,
  DialogActions,
  DialogContentText,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { KeyboardBackspace } from "@mui/icons-material";
import timezones from "./timezones";
import { getBrowserTimezone } from "./helper";

const CreateEvent = ({ open, setOpen, defaultValues = {} }) => {
  const formRef = React.useRef(null);
  const [eventTitle, setEventTitle] = React.useState("");
  const [timezone, setTimezone] = React.useState(getBrowserTimezone());
  const [eventType, setEventType] = React.useState("single");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

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
    console.log({
      eventTitle,
      timezone,
      eventType,
      fromDate,
      toDate,
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
                new Event("submit", { cancelable: true })
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
      <form
        // onSubmit={() => {
        //   alert("Submit");
        // }}
        onSubmit={handleSubmit}
        ref={formRef}
      >
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
                onKeyDown={(event) => {
                  if (event.key === "Tab") {
                    if (hint.current) {
                      setInputValue(hint.current);
                      event.preventDefault();
                    }
                  }
                }}
                disablePortal
                options={timezones.map((tz) => ({ label: tz, id: tz }))}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setTimezone(newValue);
                      }}
                    />
                  );
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
                  eventType === "single" || eventType === "reccuring"
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
                  value="reccuring"
                  control={<Radio />}
                  label="Reccuring"
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
      </form>
    </Modal>
  );
};

export default CreateEvent;
