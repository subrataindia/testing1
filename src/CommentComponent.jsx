import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommetList from "./CommentList";

const CommentComponent = () => {
  const [comments, setComments] = useState([]);

  return (
    <div>
      <CommentForm setComments={setComments} />
      <CommetList comments={comments} />
    </div>
  );
};

export default CommentComponent;
