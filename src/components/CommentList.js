import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const CommentList = ({ list }) => (
  <div>
    {list.map(
      item => <CommentItem key={item.id} {...item} />
    )}
  </div>
);

CommentList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default CommentList;
