import { useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <ResponsiveAppBar/>
  );
}
