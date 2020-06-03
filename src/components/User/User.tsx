import React from 'react';
import './User.css';

type Props = {
  name: string;
  email: string;
  address: Address;
};

const User: React.FC<Props> = ({ name, email, address }) => (
  <>
    <div className="author">
      <p>
        {' '}
        <span className="author__title">Author: </span>
        {name}
      </p>
      <a href="mailto:example@gmail.com" className="author__email">{email}</a>
      <p className="author__address">
        <span>
          {address.city}
          ,
        </span>
        <span>
          {address.street}
          ,
        </span>
        <span>{address.zipcode}</span>
      </p>
    </div>
  </>
);

export default User;
