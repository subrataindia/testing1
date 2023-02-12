import React, { useState } from "react";

function InputForm() {
  const [state, setState] = useState({
    onHoverActivated: false,
    onClickActivated: false,
  });
  const { onHoverActivated, onClickActivated } = state;

  const handleOnHover = () => {
    setState((current) => ({ ...current, onHoverActivated: true }));
  };

  const handleOnClick = () => {
    setState((current) => ({ ...current, onClickActivated: true }));
  };

  return (
    <div className="App">
      <section>
        <div>
          <button
            type="button"
            data-testid="button-target"
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
          >
            This will have hover and click events assigned!
          </button>
          <span data-testid="on-hover-span">{onHoverActivated.toString()}</span>
          <span data-testid="on-click-span">{onClickActivated.toString()}</span>
        </div>
      </section>
    </div>
  );
}

export default InputForm;
