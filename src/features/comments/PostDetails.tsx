/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';

import {
  useAddCommentMutation, useDeleteCommentMutation, useGetPostCommentsQuery,
} from './commentsApi';
import { useAppSelector } from '../../app/hooks';
import { CommentData } from '../../types/Comment';
import { selectPost } from '../posts/postsSlice';
import { NewCommentForm } from '../../components/NewCommentForm';

export const PostDetails: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const currentPost = useAppSelector(selectPost);
  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    isError: isErrorComments,
    refetch: refetchComments,
  } = useGetPostCommentsQuery(currentPost?.id || 0);

  const [
    addComment,
    {
      isLoading: isLoadingAddComment,
      isError: isErrorAddComment,
    },
  ] = useAddCommentMutation();

  const [
    deleteComment,
    {
      isError: isErrorDeleteComment,
    },
  ] = useDeleteCommentMutation();

  const handleCommentAdd = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = {
        name,
        email,
        body,
        postId: currentPost?.id || 1,
      };

      await addComment(newComment).unwrap();
      refetchComments();
    } catch (error) { }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId).unwrap();

      refetchComments();
    } catch (error) { }
  };

  useEffect(() => {
    setIsFormVisible(false);
  }, [currentPost?.id]);

  const isLoaderShown = (
    (isLoadingComments || isFetchingComments)
    && !isErrorComments
    && !isErrorAddComment
    && !isErrorDeleteComment
  );

  const isNoComments = (
    !isLoadingComments
    && !isFetchingComments
    && !isErrorComments
    && !!comments
    && !comments.length
  );

  const isCommentsListShown = (
    !isLoadingComments
    && !isErrorComments
    && comments
    && !!comments.length
  );

  const isErrorMessageShown = (
    !isLoadingComments
    && !isFetchingComments
    && !isLoadingAddComment
    && (isErrorComments || isErrorAddComment || isErrorDeleteComment)
  );

  const isNewCommentButtonShown = (
    !isLoadingComments
    && !isErrorComments
    && !isFormVisible
  );

  const isFromShown = (
    !isLoadingComments
    && !isErrorComments
    && isFormVisible
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${currentPost?.id}: ${currentPost?.title}`}
        </h2>

        <p data-cy="PostBody">
          {currentPost?.body}
        </p>
      </div>

      {isNoComments && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {isCommentsListShown && (
        <>
          <p className="title is-4">Comments:</p>

          {comments && comments.map(comment => (
            <article
              className="message is-small"
              key={comment.id}
              data-cy="Comment"
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>

                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </>
      )}

      {isErrorMessageShown && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong!
        </div>
      )}

      <div className="block">
        {isLoaderShown && (
          <Loader />
        )}

        {isNewCommentButtonShown && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}

        {isFromShown && (
          <NewCommentForm
            onSubmit={handleCommentAdd}
          />
        )}
      </div>
    </div>
  );
};
