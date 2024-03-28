import { TextField, Button, Grid, Typography, Box, Modal} from '@mui/material';
import { useEffect, useState } from 'react';
import { createEvent, getOrganizer } from '../operations';


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



export default function Organizer({token}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [user, setUser] = useState(token.user.id);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const eventsData = await getOrganizer();
  //       setEvents(eventsData.map(event => ({
  //         ...event,
  //         event_start: formatDate(event.event_start) 
  //       }))); 
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  const orgID = getOrganizer(token.user.id)

  useEffect(() => {
    getOrganizer(token.user.id)
        .then(organizer => {
            setUser(organizer[0]); // Extract the first value from the response array
        })
        .catch(console.error);
}, [])
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(orgID)
    console.log(getOrganizer(token.user.id))
    createEvent(eventName, eventDescription, eventStartDate, eventEndDate, user.id)
    setEventName('')
    setEventDescription('')
    setEventStartDate('')
    setEventEndDate('')

    e.preventDefault();
    console.log({
      eventName,
      eventDescription,
      eventStartDate,
      eventEndDate,
    });
  };

    return (
    <>
     {console.log(user.id)}
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
            <TextField required
              label="Event Name"
              fullWidth
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required
              label="Event Description"
              multiline
              fullWidth
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required
              label="Starting Date and Time"
              type="datetime-local"
              fullWidth
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required
              label="Ending Date and Time"
              type="datetime-local"
              fullWidth
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
