import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  addComment,
  loadComments,
  setComments,
} from '../features/comments/comments';
import { CommentInfo } from './CommentInfo/CommentInfo';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage, comments } = useAppSelector(
    state => state.comments,
  );
  const [isFormOpened, setIsFormOpened] = useState(false);
  const onDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      comment => comment.id !== commentId,
    );

    dispatch(setComments(updatedComments));
  };

  useEffect(() => {
    dispatch(loadComments(post.id));

    return () => {
      dispatch(setComments([]));
      setIsFormOpened(false);
    };
  }, [dispatch, post.id]);

  const handleAddNewComment = (commentData: CommentData) => {
    return dispatch(
      addComment({
        ...commentData,
        postId: post.id,
      }),
    );
  };

  const isNoCommentMessageShown = !comments.length && !errorMessage;
  const isNewCommentButtonShown = !isFormOpened && !errorMessage;
  const areCommentsShown = !!comments.length;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!!errorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              )}

              {areCommentsShown && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <CommentInfo
                      key={comment.id}
                      comment={comment}
                      onDeleteComment={onDeleteComment}
                    />
                  ))}
                </>
              )}

              {isNoCommentMessageShown && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {isNewCommentButtonShown && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsFormOpened(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpened && (
          <NewCommentForm handleAddNewComment={handleAddNewComment} />
        )}
      </div>
    </div>
  );
};
