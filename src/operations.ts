import { supabase } from "./client";
// import {Notif} from "./components/Home"

// Ari ibutang ang CRUD stuff

export const getNotifs = async (user_id: string) => {
  let { data, error } = await supabase
    .from("notifications")
    .select("title,description")
    .eq("user_id", user_id);
  // let notif_data: Notif;
  if (error) console.log("CRUD Error: " + error);
  return data;
};
