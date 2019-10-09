import React from 'react';
import PropTypes from 'prop-types';
import CommentContainer from '../Comment/CommentContainer';

const CommentList = ({ comments }) => comments.map(comment => (
  <CommentContainer comment={comment} key={comment.id} />
));

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(shape).isRequired,
};

export default CommentList;
