import { Button, Card, CardContent, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Upvote from "@mui/icons-material/ThumbUpOutlined";
import ResponsiveAppBar from "./ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";
import { getNotifs, requestOrganizer, isOrganizer, requestAdministrator, getEvents, formatDate } from "../operations";
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
  const handleTestButtonOnClick = () => {
    // //Add total unread notifs by 1
    // setNotifNumber(notifNumber + 1);
    // addNotif("Event1", "Desc1");
    getEvents().then((events) => {
      console.log(events); // Log the events array
    }).catch((error) => {
      console.error('Error fetching events:', error); // Log any errors that occur
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

  console.log(token);
  //
  const handleJoinEvent = async (event_id: number) => { 
    const response = await requestOrganizer(token.user.id);
    console.log(response);
    console.log(token.user.id);
    if (response) {
      alert('Request to join event has been submitted for approval.');
    } else {
      alert('Request already sent! Please wait for approval.');
    }
  }
  

  //
  const handleBecomeOrganizer = async () => {
      const response = await requestAdministrator(token.user.id);
      console.log(response);
      if(await isOrganizer(token.user.id) == true) {
        setNotifNumber(notifNumber + 1);
        addNotif("User Status", "Request to to become an Organizer has been approved!");
      } else if(await isOrganizer(token.user.id) == false) {
        setNotifNumber(notifNumber + 1);
        addNotif("User Status", "Request to to become an Organizer has been rejected!");
      } else if(await isOrganizer(token.user.id) == null) {
        setNotifNumber(notifNumber + 1);
        addNotif("User Status", "Request to to become an Organizer is pending!");
      } 
      else if (response) {
        alert('Request to become an organizer has been submitted for approval.');
      } else {
        alert('Request already sent! Please wait for approval.');
      }
  };

  
  return (
    <>
      <ResponsiveAppBar
        notifNumber={notifNumber}
        callBackClearNotif={clearNotif}
        notifList={notifList}
      />
      <p>{"Welcome, " + token.user.user_metadata.first_name}</p>
      <button onClick={handleTestButtonOnClick}>Add Notif Button</button>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
         <CardWrapper>
        {events.map((event, index) => (
          <CardContainer key={index}>
            <CardContent>
              <h2>{event.name}</h2>
              <p>Event Start: {event.event_start}</p>
              <p>Description: {event.description}</p>
            </CardContent>
          </CardContainer>
        ))}
      </CardWrapper>
        <Button
          variant="contained"
          onClick={handleBecomeOrganizer}
          sx={{ mt: 5 }}
        >
          {" "}
          Become an Organizer{" "}
        </Button>
      </Grid>
    </>
  );
};
export default Home;
