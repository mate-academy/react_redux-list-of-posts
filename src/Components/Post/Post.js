import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';
import User from '../User/User';
import Commentlist from '../Commentlist/Commentlist';

function Post({ id, post, removePostItem }) {
  const {
    user, comments, title, body,
  } = post;
  return (
    <div className="post">
      <button
        className="btn-remove btn-post"
        type="button"
        onClick={() => removePostItem(id)}
      >
        {'\u2716'}
      </button>
      <h2 className="post__title">{title}</h2>
      <p className="post__body">{body}</p>
      <User user={user} />
      <Commentlist comments={comments} />
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.number,
  removePostItem: PropTypes.func,
  post: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.object,
    }),
  }),
}.isRequaired;

export default Post;
