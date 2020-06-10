import React from 'react';

type Props = {
  comment: Comment;
};

export const Comment: React.FC<Props> = ({ comment }) => {
  const { name, body, email } = comment;

  return (
    <>
      <p className="user_name">
        {name}
      </p>
      <p className="user_email">
        {email}
      </p>
      <p className="user_text">
        {body}
      </p>
    </>
  );
};
