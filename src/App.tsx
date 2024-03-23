import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/singers/:id" element={<CompleteTheLyrics />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
