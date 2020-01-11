import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import CommentList from './CommentList';
import {
  handleRemovePost
} from '../redux/actions';

const Post = ({ post, removePost }) => {
  const { id, title, body, comments, user } = post;

  return (
    <div className="post">
    <span
      className='delete-post'
      role='img'
      aria-label="cancel"
      onClick={() => removePost(id)}
    >
      ❌
    </span>
    <User userOne={user} />
    <h1 className="post-title">
      {'Post# - '}
      {id}
    </h1>
    <p>
      <span className='post-topic'> {'Topic - '}</span>
      {title}
    </p>
    <p>{body}</p>
    <CommentList comments={comments} />
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  removePost: id => dispatch(handleRemovePost(id))
});

Post.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  null, mapDispatchToProps
)(Post);
