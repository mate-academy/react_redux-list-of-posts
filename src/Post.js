import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from './redux/postsReducer';
import User from './User';
import CommentList from './CommentList';

const Post = ({ deletePost, post }) => (
  <section className="post">
    <article className="post__content">
      <button
        className="post__delete-button"
        type="button"
        onClick={() => deletePost(post.id)}
      >
        x
      </button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <User user={post.user} />
    </article>
    <CommentList comments={post.comments} postId={post.id} />
    <hr />
  </section>
);

const mapDispatchToProps = {
  deletePost,
};

export default connect(() => ({}), mapDispatchToProps)(Post);

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        street: PropTypes.string,
        suite: PropTypes.string,
      }).isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
