import { Button, Card, CardContent, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Upvote from "@mui/icons-material/ThumbUpOutlined";
import ResponsiveAppBar from "./ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";
import { getNotifs, requestOrganizer, isOrganizer, requestAdministrator } from "../operations";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../client";

//subject to change (ids and event redirect/popup/data)
interface Notif {
  title: string;
  description: string;
}

interface HomeProps {
  token: any;
}

const Home: React.FC<HomeProps> = ({ token }) => {
  const [notifNumber, setNotifNumber] = useState(0);
  const [notifList, setNotifList] = useState<Notif[]>([]);

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
    //Add total unread notifs by 1
    setNotifNumber(notifNumber + 1);
    addNotif("Event1", "Desc1");
  };

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
        <h1> Event List </h1>
        <Card>
          <CardContent>
            <h2> Event 1</h2>
            <h4> Details chu chu chu</h4>
            <IconButton aria-label="thumbs up">
              <Upvote />
            </IconButton>
            <Button
              variant="contained"
              onClick={handleJoinEvent}
            >
              {" "}
              Join Event{" "}
            </Button>
          </CardContent>
        </Card>
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
