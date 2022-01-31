import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { RootState } from '../../types/RootState';
import { removeCommentAction } from '../../store/commentsReducer';
import { deleteComment, fetchComments } from '../../api/api';
import './Comments.scss';

export const Comments:React.FC = () => {
  const dispatch = useDispatch();
  const selectedPost = useSelector((state:RootState) => state.postsReducer.selectedPost);
  const comments = useSelector((state:RootState) => state.commentsReducer.comments);

  const removeComments = (commentId: string) => {
    deleteComment(commentId);

    dispatch(
      removeCommentAction(commentId),
    );
  };

  useEffect(() => {
    dispatch(fetchComments(selectedPost));
  }, [selectedPost]);

  return (
    <TransitionGroup className="comments">
      {comments.map(comment => (
        <CSSTransition
          key={comment.id}
          timeout={500}
          classNames="comments__item"
        >
          <article className="media">
            <figure className="media-left">
              <p className="image is-48x48" />
            </figure>
            <div className="media-content">
              <div className="comments__content content">
                <p>
                  <strong>{comment.name}</strong>
                  <br />
                  {comment.body}
                  <br />
                </p>
                <button
                  type="button"
                  className="deleteCommentBtn"
                  onClick={() => removeComments(comment.id)}
                >
                  x
                </button>
              </div>
            </div>
          </article>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
