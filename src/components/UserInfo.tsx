import React from 'react';

type Props = {
  user: User;
};

const User: React.FC<Props> = ({ user }) => {
  const { name, phone } = user;

  return (
    <div className="app__user">
      <span className="app__user-title">
        Author info:
      </span>
      <span className="app__user-name">
        {name}
      </span>
      <a
        className="app__user-phone"
        href={`tel:${phone}`}
      >
        {phone}
      </a>
    </div>
  );
};

export default User;
