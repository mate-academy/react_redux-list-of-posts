import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-shadow
import Comment from './Comment';

const CommentList = ({ list }) => (
  <div className="comment__list">
    {list.map(
      item => <Comment key={item.id} {...item} />
    )}
  </div>
);

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object
  ),
}.isRequired;

export default CommentList;
