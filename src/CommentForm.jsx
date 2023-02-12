import React, { useState } from "react";

const CommentForm = ({ setComments }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setComments((prev) => [...prev, { id: Date.now(), text: text }]);
    setText("");
    setChecked((prev) => false);
  };

  return (
    <div>
      <h2>comment form</h2>
      <input
        placeholder="write your comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="checkbox">I agree to terms and conditions</label>
      <button disabled={!checked || !text} onClick={handleClick}>
        comment
      </button>
    </div>
  );
};

export default CommentForm;
