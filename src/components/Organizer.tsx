import { TextField, Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Modal} from '@mui/material';
import { useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Organizer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
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
    <>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
            <Typography variant="h3">Event List</Typography>
        <Button variant="outlined" sx={{mt: 10}}onClick={handleOpen}>Create Event</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
        <Box sx={style}>
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
              label="Starts on"
              type="date"
              fullWidth
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Starts in"
              type="time"
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
              label="Ending on"
              type="date"
              fullWidth
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ends in "
              type="time"
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
        </Box>
      </Modal>
      </Grid>
    </>
  );
}
