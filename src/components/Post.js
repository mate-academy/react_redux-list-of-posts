import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import { CommentList } from './CommentList';

export function Post(props) {
  const {
    postItemRemove,
    usersMap,
    comments,
    userId,
    title,
    index,
    body,
    id,
  } = props;
  const commentItems = comments.filter(comment => comment.postId === id);
  const user = usersMap[userId];

  return (
    <tr>
      <td>
        <span>{title}</span>
        <p>{body}</p>
        <input
          type="button"
          onClick={() => postItemRemove(index)}
          value="Remove Post!"
        />
      </td>
      <td>
        <User user={user} />
      </td>
      <td>
        <CommentList comments={commentItems} />
      </td>
    </tr>
  );
}

Post.propTypes = {
  postItemRemove: PropTypes.func.isRequired,
  usersMap: PropTypes.objectOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
