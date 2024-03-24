import { useState, useEffect } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

//subject to change (ids and event redirect/popup/data)
interface Notif {
  title: string;
  description: string;
}

export default function Home() {

  const [notifNumber, setNotifNumber] = useState(0);
  const [notifList, setNotifList] = useState<Notif[]>([]);

  //For notif button callback see ".SimpleBadge.tsx Line 23"
  const clearNotif = () => {
    setNotifNumber(0);
  }

  //Add a notificaiton
  const addNotif = (t: string, d: string) => {
    const newNotif: Notif = {
      title: t,
      description: d
    };
    setNotifList([...notifList, newNotif])
    console.log("Added new event notif")
  }

  //Dev Button Handler
  const handleTestButtonOnClick = () => {
    //Add total unread notifs by 1
    setNotifNumber(notifNumber + 1);
    addNotif("Event1", "Desc1");
  }

  //Debugging
  useEffect(() => {
    console.log(notifList);
  }, [notifList])

  return (
    <>
      <ResponsiveAppBar notifNumber={notifNumber} callBackClearNotif={clearNotif} notifList={notifList}/>
      <button onClick={handleTestButtonOnClick}>Add Notif Button</button>
    </>
  );
}
