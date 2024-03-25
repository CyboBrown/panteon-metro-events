import { Button, Card, CardContent, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Upvote from '@mui/icons-material/ThumbUpOutlined';
import ResponsiveAppBar from "./ResponsiveAppBar";
import IconButton from "@mui/material/IconButton";

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
    console.log(notifList);
  }, [notifList]);

  console.log(token);


  return (
    <>
      <ResponsiveAppBar
        notifNumber={notifNumber}
        callBackClearNotif={clearNotif}
        notifList={notifList}
      />
      <p>{"Welcome, " + token.user.user_metadata.first_name}</p>
      <button onClick={handleTestButtonOnClick}>Add Notif Button</button>
      <Grid container spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center">
          <h1> Event List </h1>
          <Card>
            <CardContent>
            <h2> Event 1</h2>
            <h4> Details chu chu chu</h4>
            <IconButton aria-label="thumbs up">
              <Upvote/>
            </IconButton>
            <Button variant="contained"> Join Event </Button>
            </CardContent>
          </Card>
          <Button variant="contained" sx={{mt: 5}}> Become an Organizer </Button>
      </Grid>
    </>
  );
}
export default Home