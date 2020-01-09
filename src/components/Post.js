import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createActionDeletePost } from '../store/store';
import User from './User';
import CommentList from './CommentList';

const Post = ({ deletePost, post: { id, title, body, user, comments } }) => (
  <article className="post">
    <section className="title">
      <h2>{title}</h2>
      <button
        className="delete"
        onClick={() => deletePost(id)}
      >
        x
      </button>
    </section>

    <section className="post__main-part">
      <p className="post__body">
        {body}
      </p>

      <User user={user} />
    </section>

    <CommentList comments={comments} postId={id} />
  </article>
);

const mapDispatchToProps = {
  deletePost: createActionDeletePost,
};

export default connect(() => ({}), mapDispatchToProps)(Post);

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
