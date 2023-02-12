import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length == 0) {
    return <h6>No Comments</h6>;
  }

  return (
    <div>
      <ul>
        {comments.map((item) => {
          return (
            <li key={item.id} aria-label="li">
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentList;
