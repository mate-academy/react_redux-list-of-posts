import React from 'react';
import Comment from '../Comment/Comment';
import './CommentList.scss';

type Props = {
  comments: Comment[];
};

const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <section>
      <ul className="commentList">
        {comments.map(comment => (
          <li key={comment.id} className="commentList__item">
            <Comment
              name={comment.name}
              email={comment.email}
              body={comment.body}
              id={comment.id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentsList;
