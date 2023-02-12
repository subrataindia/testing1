// Counter.jsx
import React, { useState } from "react";

const Counter = () => {
  const { counter, setCounter } = useState(0);

  return (
    <div>
      <h1>Counter App</h1>
      <button onClick={() => setCounter((prev) => prev - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
    </div>
  );
};

export default Counter;
