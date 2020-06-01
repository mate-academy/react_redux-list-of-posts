import './Comments.scss';
import React from 'react';
import { CommentType } from '../types';

type PropsType = {
  comments: CommentType[]
}

export const Comments: React.FC<PropsType> = ({ comments }) => {
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
