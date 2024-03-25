import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Metro Events - Home</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div>
          <Link to="/signin">Go to Sign In</Link>
        </div>
        <div>
          <Link to="/signup">Go to Sign Up</Link>
        </div>
        <div>
          <Link to="/home">Go to Home</Link>
        </div>
      </div>
    </>
  );
}
