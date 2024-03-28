import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Index from "./components/Index";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";
import { supabase } from "./client";
import Organizer from "./components/Organizer";
import EventForm from "./components/CreateEvent";

export default function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token") || "");
      setToken(data);
    }
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/signin" element={<SignIn setToken={setToken} />} />
          <Route path="/signup" element={<SignUp />} />
          {token ? <Route path="/home" element={<Home token={token} />} /> : ""}
          <Route path="/organizer" element={<Organizer/>}/>
          <Route path="/event" element={<EventForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
