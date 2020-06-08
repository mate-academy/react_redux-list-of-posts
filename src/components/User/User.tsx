import React from 'react';
import './User.scss';

type Props = {
  name: string;
  email: string;
  address: Address;
};

const User: React.FC<Props> = ({ name, email, address }) => (
  <>
    <div className="User">
      <p>
        {' '}
        <span className="User__Name">Author: </span>
        {name}
      </p>
      <a href="mailto:example@gmail.com" className="User__Email">{email}</a>
      <p className="User__Address">
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
