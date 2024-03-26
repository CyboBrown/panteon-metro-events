import { Button, Card, CardContent, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Upvote from "@mui/icons-material/ThumbUpOutlined";
import ResponsiveAppBar from "./ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";
import { getNotifs } from "../operations";

//subject to change (ids and event redirect/popup/data)
export interface Notif {
  title: string;
  description: string;
}

interface HomeProps {
  token: any;
}

const Home: React.FC<HomeProps> = ({ token }) => {
  const [notifNumber, setNotifNumber] = useState(0);
  const [notifList, setNotifList] = useState<Notif[]>([]);

  // setNotifList(getNotifs(token.user.id));
  console.log("This one CC: ");
  console.log(getNotifs(token.user.id));

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
    console.log("Notif List: {")
    console.log(notifList);
    console.log("}")
  }, [notifList]);

  console.log(token);

  const handleJoinEvent = async (eventId) => {
    try {
      // Send a request to the server to join the event
      const response = await fetch(`/join-event/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: token.user.id,
        }),
      });

      if (response.ok) {
        alert("You have successfully joined the event!");
      } else {
        alert("Failed to join the event. Please try again later.");
      }
    } catch (error) {
      console.error("Error joining event:", error);
      alert(
        "An error occurred while joining the event. Please try again later."
      );
    }
  };

  const handleBecomeOrganizer = async () => {
    try {
      // Send a request to the server to become an organizer
      const response = await fetch("/client.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: token.user.id,
          message: "Please consider me as an organizer.",
        }),
      });

      if (response.ok) {
        alert(
          "Your request to become an organizer has been submitted successfully."
        );
      } else {
        alert("Failed to submit the request. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting organizer request:", error);
      alert(
        "An error occurred while submitting the request. Please try again later."
      );
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
              onClick={() => handleJoinEvent(event.id)}
            >
              {" "}
              Join Event{" "}
            </Button>
          </CardContent>
        </Card>
        <p>
          {token.user.isOrganizer
            ? "You are an organizer."
            : "You are not an organizer."}
        </p>
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
