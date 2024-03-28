
import { TextField, Button, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      eventName,
      eventDescription,
      eventStartTime,
      eventEndTime,
      eventStatus,
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event Description"
              multiline
              fullWidth
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Time"
              type="datetime-local"
              fullWidth
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Time"
              type="datetime-local"
              fullWidth
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Event Status</InputLabel>
              <Select
                value={eventStatus}
                onChange={(e) => setEventStatus(e.target.value)}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EventForm;
