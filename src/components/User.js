import React from 'react';

function User(props) {
  return (
    <React.Fragment>
      <h4>
        <i>{props.author.name}</i> <i>{props.author.email}</i>
      </h4>
      <div className="address">
        <i>{props.author.address.street}</i>
        <i>{props.author.address.suite}</i>
        <i>{props.author.address.city}</i>
      </div>
    </React.Fragment>
  );
}

export default User
