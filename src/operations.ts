import { supabase } from "./client";

// Ari ibutang ang CRUD stuff

export const createEvent = async (
  name: string,
  description: string,
  event_start: string,
  created_by: number
) => {
  // You can add more event information here (and in supabase)
  const { data, error } = await supabase
    .from("events")
    .insert([
      {
        name: name,
        description: description,
        event_start: event_start,
        created_by: created_by,
      },
    ])
    .select();
  if (error) console.log("CRUD Error: " + error);
  return data;
};

export const createNotif = async (
  title: string,
  description: string,
  target_user: string
) => {
  // You can add more event information here (and in supabase)
  const { data, error } = await supabase
    .from("notifications")
    .upsert([
      {
        title: title,
        description: description,
        user_id: target_user,
      },
    ])
    .select();
  if (error) console.log("CRUD Error: " + error);
  return data;
};

export const getNotifs = async (user_id: string) => {
  let { data, error } = await supabase
    .from("notifications")
    .select("title,description")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  if (error) console.log("CRUD Error: " + error);
  return data;
};

export const requestJoinEvent = async (user_id: string, event_id: number) => {
  const { data, error } = await supabase
    .from("attendees")
    .upsert([{ user_id: user_id, event_id: event_id }])
    .select();
  if (error) console.log("CRUD Error: " + error);
  return data;
};

export const requestAdministrator = async (user_id: string) => {
  const { data, error } = await supabase
    .from("administrators")
    .upsert([{ user_id: user_id }])
    .select();
  if (error) console.log("CRUD Error: " + error);
  return data;
};

export const requestOrganizer = async (user_id: string) => {
  const { data, error } = await supabase
    .from("organizers")
    .upsert([{ user_id: user_id }])
    .select();
  if (error) console.log("CRUD Error: " + error);
  return data;
};
