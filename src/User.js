import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePost } from './redux/postsReducer';

const User = ({ name, email, city, idPost, deletePost }) => (
  <>
    <div className="userInfo">
      {' Name: '}
      <span className="userInfo__name">
        {name}
      </span>
      <span className="userInfo__email">
        {' Email: '}
        <a href=" ">
          {email}
        </a>
      </span>
      <span className="userInfo__adress">
        {' Sity: '}
        <a href=" ">
          {city}
        </a>
      </span>
    </div>
    <button
      type="button"
      className="button-delete"
      onClick={() => deletePost(idPost)}
    >
      Delete post
    </button>
  </>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
  idPost: PropTypes.number.isRequired,
};

const makeStateToProps = state => ({
  state: state.posts,
});

export default connect(
  makeStateToProps,
  { deletePost }
)(User);
