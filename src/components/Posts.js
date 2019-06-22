import React from 'react';
import { User } from './User';
import { CommentHandler } from './CommentHandler';

export function Posts(props) {
    const {
    usersMap,
      comments,
      userId,
      title,
      body,
      id,
  } = props;
    const commentItems = comments.filter(item => item.postId === id);
    const user = usersMap[userId];

    return (
        <tr>
            <td>
                <span>{title}</span>
                <p>{body}</p>
            </td>
            <td>
                <User user={user} />
            </td>
            <td>
                <CommentHandler comments={commentItems} />
            </td>
        </tr>
    );
}
