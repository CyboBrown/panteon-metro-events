import { Button, Card, CardContent, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Upvote from "@mui/icons-material/ThumbUpOutlined";
import ResponsiveAppBar from "./ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";
import { getNotifs, requestOrganizer, isOrganizer, requestAdministrator, getEvents, formatDate, requestJoinEvent , createNotif, isApproved, isNotified} from "../operations";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../client";
import { styled } from '@mui/material/styles';

//subject to change (ids and event redirect/popup/data)
interface Notif {
  title: string;
  description: string;
}

interface HomeProps {
  token: any;
}

const CardWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px', 
});

const CardContainer = styled('div')({
  backgroundColor: '#f0f0f0', 
  width: '250px', 
  height: '150px',
  textAlign: 'center', 
});

const Home: React.FC<HomeProps> = ({ token }) => {
  const [notifNumber, setNotifNumber] = useState(0);
  const [notifList, setNotifList] = useState<Notif[]>([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;
  
  

  const handleInserts = (payload: any) => {
    console.log("Change received!", payload);
    setNotifNumber(notifNumber + 1);
    getNotifs(token.user.id).then((data) => {
      setNotifList(data);
      //ignore typescript things
    });
  };

  supabase
    .channel("notifications")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications" },
      handleInserts
    )
    .subscribe();

  useEffect(() => {
    getNotifs(token.user.id).then((data) => {
      //check if isapproved then createnotif
      setNotifList(data);
      //ignore typescript things
    });
  }, []);

  //For notif button callback see ".SimpleBadge.tsx Line 23"
  const clearNotif = () => {
    setNotifNumber(0);
  };

  //Add a notificaiton
  const addNotif = (t: string, d: string) => {
    const newNotif: Notif = {
      title: t,
      description: d,
    };
    setNotifList([...notifList, newNotif]);
    console.log("Added new event notif");
  };

  //Dev Button Handler
  const handleTestButtonOnClick = async () => {
    const notifiedEvents = await isNotified(token.user.id);
    notifiedEvents.forEach(event => {
  console.log("Event ID:", event.event_id);
  console.log("Is Accepted:", event.is_accepted);
});
  };
  //show events on home and formatting the date
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData.map(event => ({
          ...event,
          event_start: formatDate(event.event_start) 
        }))); 
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  //Debugging
  useEffect(() => {
    console.log("Notif List: {");
    console.log(notifList);
    console.log("}");
  }, [notifList]);

  //
  const handleBecomeOrganizer = async () => {
      const response = await requestAdministrator(token.user.id);
      console.log(response);
      if(await isOrganizer(token.user.id) == true) {
        const notif = await createNotif("User Status", "Request to to become an Organizer has been accepted!", token.user.id);
        alert('You are already an organizer!');
      } else if(await isOrganizer(token.user.id) == false) {
        setNotifNumber(notifNumber + 1);
        const notif = await createNotif("User Status", "Request to to become an Organizer has been rejected!", token.user.id);
      } else if(await isOrganizer(token.user.id) == null) {
        alert('Request is currently being reviewed. Please wait for approval.');
      } 
      else if (response) {
        alert('Request to become an organizer has been submitted for approval.');
      } else {
        alert ('Request already sent! Please wait for approval.');
      }
  };

  const handleJoinEvent = async (index: number) => {
    const eventIds = events.map(event => event.id);
    const userUUID = token.user.id;
    const response = await requestJoinEvent(userUUID, eventIds[index]);
    console.log(response);
    console.log(eventIds[index] + " , " +userUUID);
    if (response) {
      alert('Request to join event has been submitted for approval.');
    } else {
      alert('Request already sent! Please wait for approval.');
    }
  }

  
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <ResponsiveAppBar
        notifNumber={notifNumber}
        callBackClearNotif={clearNotif}
        notifList={notifList}
      />
      <p>{"Welcome, " + token.user.user_metadata.first_name}</p>
      <button onClick={handleTestButtonOnClick}>Add Notif Button</button>
      <Button
        variant="contained"
        onClick={handleBecomeOrganizer}
        sx={{ mt: 5 }}
      >
        {" "}
        Become an Organizer{" "}
      </Button>
      <br/>
      <br/>
      <br/>
      <Grid
        container
        spacing={5}
        direction="row" 
        justifyContent="center"
        alignItems="center"
      >
        {currentEvents.map((event, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
            <CardContainer sx={{ mb: 2 }} sx={{
              border: '1px solid black',
              borderRadius: '4px',
              padding: '16px',
              boxSizing: 'border-box',
            }}>
              <CardContent>
                <h2>{event.name}</h2>
                <p>Event Start: {event.event_start}</p>
                <p>Description: {event.description}</p>
                <Button
                  variant="contained"
                  onClick={() => handleJoinEvent(index)}
                  sx={{ mt: 5 }}
                >
        Join Event
      </Button>
              </CardContent>
            </CardContainer>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', padding: '0 20px', border: '10px',  }}>
        <Button
          variant="outlined"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentEvents.length < eventsPerPage}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default Home;