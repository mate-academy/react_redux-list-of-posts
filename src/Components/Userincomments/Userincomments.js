import React from 'react';
// import './Userincomments.css';
// import PropTypes from 'prop-types';

const Userincomment = ({ user }) => (
  <>
    <p className="user__email">
    Email:
      {user}
    </p>
  </>
);

export default Userincomment;
