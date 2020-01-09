import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentsList from './commentsList';
import { deletePost } from '../actions';

const Post = ({
  id,
  title,
  body,
  userName,
  email,
  address,
  comments,
  deleteSinglePost,
}) => (
  <article className="post">
    <h2 className="post__title">
      <button
        type="button"
        className="post__delete"
        onClick={() => deleteSinglePost(id)}
      >
        Delete post
      </button>
      {title}
    </h2>
    <p className="post__body">{body}</p>
    <p className="post__user">
      Author:
      {userName}
    </p>
    <address className="post__address">{address}</address>
    <a className="post__email" href="/#">{email}</a>
    <div className="post__comments">
      <CommentsList comments={comments} />
    </div>
  </article>
);

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  deleteSinglePost: deletePost,
};

Post.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    postId: PropTypes.number,
  })).isRequired,
  address: PropTypes.string.isRequired,
  deleteSinglePost: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
