import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentList from './CommentList';
import User from './User';
import { deletePost } from './store';

const Post = ({ post, deletePosts }) => (
  <div className="all">
    <ul className="post">
      <li className="post__title">
        {' '}
        {'🖋'}
        {' '}
        {' ' }
        {post.title}
      </li>
      <button
        type="button"
        className="post__delete"
        onClick={() => deletePosts(post.id)}
      >
        Remove
      </button>
      <li className="post__body">{post.body}</li>
      <User user={post.user} />
      <CommentList comments={post.comments} />
    </ul>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.array,
  }).isRequired,
  deletePosts: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deletePosts: id => dispatch(deletePost(id)),
});

export default connect(null, mapDispatchToProps)(Post);
