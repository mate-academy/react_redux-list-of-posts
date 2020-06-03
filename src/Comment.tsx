import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComments } from './store/post';

type Props = {
  comment: CommentProps;
  postId: number;
};

const Comment: React.FC<Props> = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { name, body, email } = comment;

  return (
    <>
      <div className="comment">
        <p className="author">
          Сomment author:&nbsp;
          {name}
        </p>
        <p>{body}</p>
        <p className="email">
          Email:&nbsp;
          {email}
        </p>
        <button className="delete-button" type="button" onClick={() => dispatch(deleteComments(postId, comment.id))}>x</button>
      </div>
    </>
  );
};

export default Comment;
