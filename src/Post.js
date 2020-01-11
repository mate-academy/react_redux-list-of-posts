import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';
import { removePost } from './store/index';

const Post = ({ ownpost, posts, removePost }) => {

  return (
    <>
      <button
        type="button"
        className="remove_post"
        onClick={() => removePost(ownpost, posts)}
      >
        Remove
      </button>
      <section className="post">
        <h1 className="post__title">
          {ownpost.title}
        </h1>
        <p className="post__text">
          {ownpost.body}
        </p>
      </section>
      <section className="userSection">
        {ownpost.user.name}
        <br />
        {ownpost.user.email}
        <br />
        {ownpost.user.address.street}
        {ownpost.user.address.suite}
        {ownpost.user.address.city}
        {ownpost.user.address.zipcode}
        {ownpost.user.address.geo.lat}
        {ownpost.user.address.geo.lng}
      </section>
      <section className="commentSection">
        {
          ownpost.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />))
        }
      </section>
    </>
  )};

const getPosts = (state) => ({
  posts: state.posts,
});

Post.propTypes = {
  ownpost: PropTypes.objectOf(PropTypes.any).isRequired,
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  removePost: PropTypes.func.isRequired,
};

export default connect(getPosts, { removePost })(Post);
