import React from 'react';
import { User } from './User';
import { CommentList } from './CommentList';

export function Posts(props) {
    const { usersMap, comments, userId, title, body, id } = props;
    const commentItems = comments.filter(comment => comment.postId === id);
    const user = usersMap[userId];

    return (
        <tr>
            <td>
                <span>{title}</span>
                <p>{body}</p>
            </td>
            <td>
                <User user={user}/>
            </td>
            <td>
                <CommentList comments={commentItems}/>
            </td>
        </tr>
    );
}
