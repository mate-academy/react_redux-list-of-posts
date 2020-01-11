import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';
import {connect} from 'react-redux';
import * as post from './store/post';


const Post = ({ ownpost, post, setPost }) => {
  const removePost = () => {
    setPost(post.filter(post => post.id !== ownpost.id));
  }

  return (
    <>
      <button type="button" className="remove_post" onClick={removePost}>
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
  post: state.post,
});

const removePost = {
  setPost: post.setPost,
}

Post.propTypes = {
  ownpost: PropTypes.objectOf(PropTypes.any).isRequired,
  post: PropTypes.arrayOf(PropTypes.any).isRequired,
  setPost: PropTypes.func.isRequired,
};

export default connect(getPosts, removePost)(Post);
