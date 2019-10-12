import React from 'react';
import PropTypes from 'prop-types';
import './Commentlist.css';
import ConnectedComment from '../CommentItem/ConnectedComment';

const Commentlist = ({ comments }) => (
  <ul className="comments-list">
    {comments
      .map(comment => (
        <ConnectedComment
          id={comment.id}
          comment={comment}
          key={comment.id}
        />
      ))
    }
  </ul>
);

Commentlist.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    email: PropTypes.string,
  })),
}.isRequaired;

export default Commentlist;
