import { useState } from "react";

export default function SignUp() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Metro Events - Sign Up</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}
