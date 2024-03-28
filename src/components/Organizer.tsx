import { Button, Grid, Typography } from "@mui/material";


export default function Organizer() {
    
    const eventList = [];
    return (
    <>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
            <Typography variant="h3">Event List</Typography>
            <Button variant="outlined" sx={{mt: 10}}> Create Event</Button>
            
      </Grid>
    </>
  );
}
