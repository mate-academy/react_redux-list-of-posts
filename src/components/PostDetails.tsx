import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { getComments, removeComment } from '../api/comments';
import { CommentCard } from './CommentCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as commentsActions } from '../features/commentsSlice';
import { wait } from '../utils/fetchClient';
import { AppDispatch } from '../app/store';

const setSelectUser = (
  loadComments: (id: number) => void,
  postId: number,
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(commentsActions.setErrors(false));
    await wait(0);
    loadComments(postId);
  };
};

export const PostDetails = () => {
  const dispatch = useAppDispatch();
  const { comments, isError } = useAppSelector(state => state.comments);
  const post = useAppSelector(state => state.post.selectedPost);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);

  const loadComments = (postId: number) => {
    getComments(postId)
      .then(data => {
        dispatch(commentsActions.setComments(data));
      })
      .catch(() => {
        dispatch(commentsActions.setErrors(true));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    if (post?.id) {
      dispatch(setSelectUser(loadComments, post?.id));
    }
  }, [post?.id]);

  const deleteComment = (commentId: number) => {
    setIsLoading(true);

    removeComment(commentId)
      .then(() => {
        if (comments) {
          const newComments: Comment[] = comments
            .filter(c => c.id !== commentId);

          dispatch(commentsActions.setComments(newComments));
        }
      })
      .catch(() => {
        dispatch(commentsActions.setErrors(true));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments?.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentCard
                  comment={comment}
                  deleteComment={deleteComment}
                  key={comment.id}
                />
              ))}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsNewCommentForm(true)}
          >
            Write a comment
          </button>
        </div>

        {isNewCommentForm && (
          <NewCommentForm loadComments={loadComments} />
        )}
      </div>
    </div>
  );
};
