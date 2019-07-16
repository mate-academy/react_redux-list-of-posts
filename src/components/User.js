import React from 'react';

function User(props) {

  return (
    <div className="user-info">
      <a href={'mailto:' + props.user.email} title="click to mail"><strong>{props.user.name}</strong></a>
      <p>Website: <a href={'https://' + props.user.website} title="click to visit">{props.user.website}</a></p>
      <p>Address: {props.user.address.city}, {props.user.address.street}, {props.user.address.suite}</p>
    </div>
  );
}

export default User;
