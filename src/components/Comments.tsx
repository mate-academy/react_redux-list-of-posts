import './Comments.scss';
import React from 'react';
import { CommentType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type PropsType = {
  postId: number;
}

export const Comments: React.FC<PropsType> = ({ postId }) => {
  const comments = useSelector(
    (state:RootState) => state
    .comments
    .filter((comment: CommentType) => comment.postId === postId)
  )

  return (
    <ul className="Comments">
      {comments.map((comment: CommentType) => {
        return (
          <li
            key={comment.name + comment.body}
            className="Comments__item">
            <p><strong>Name: </strong>{comment.name}</p>
            <p><strong>Comment: </strong>{comment.body}</p>
            <p><strong>Email: </strong>{comment.email}</p>
          </li>
        )
      })}
    </ul>
  )
}
