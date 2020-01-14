import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentList';

const Post = ({ title, body, name, email, city, idPost, comments }) => (
  <div className="post" key={idPost}>
    <h2 className="post__title">
      {title}
    </h2>
    <p className="post__body">
      {`"`}
      {body}
      {`"`}
    </p>
    <User
      name={name}
      email={email}
      city={city}
      idPost={idPost}
    />
    <hr className="line" />
    <CommentsList comments={comments} />
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  idPost: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Post;
