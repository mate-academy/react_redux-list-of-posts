/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { delPost } from './store/posts';

const Post = ({ postId, postContent, delPost }) => (
  <>
    <button
      type="button"
      className="comment__delete"
      onClick={() => delPost(postId)}
    >
      X
    </button>
    <h1 className="post__title">{postContent.title}</h1>
    <p className="post__body">{postContent.body}</p>
  </>
);

Post.propTypes = {
  postContent: PropsTypes.objectOf.isRequired,
  postId: PropsTypes.number.isRequired,
  delPost: PropsTypes.func.isRequired,
};

export default connect(null, { delPost })(Post);
