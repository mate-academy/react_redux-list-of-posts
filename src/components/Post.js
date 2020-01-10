import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';
import { highlightText } from '../helpers/highlightText';

const Post = ({ highlightedValue, id, title, body, user, comments }) => (
  <article className="post">
    <div className="post__container">
      <article className="post__information">
        <p className="post__number">{`Post ${id}:`}</p>

        <h2 className="post__title">
          {highlightText(title, highlightedValue)}
        </h2>

        <p className="post__content">
          {highlightText(body, highlightedValue)}
        </p>
      </article>

      <User {...user} />
    </div>

    <CommentList list={comments} />
  </article>
);

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  highlightedValue: PropTypes.string.isRequired,
};

export default Post;
