import React from 'react';

type Props = {
  comment: Comment;
};

const Comment: React.FC<Props> = ({ comment }) => {
  const {
    name,
    email,
    body,
  } = comment;

  return (
    <li className="app__comment">
      <p className="app__comment-text">
        {body}
      </p>
      <span className="app__comment-name">
        {name}

      </span>
      <a
        className="app__comment-email"
        href={`mailto:${email}`}
      >
        {email}
      </a>

    </li>
  );
};

export default Comment;
